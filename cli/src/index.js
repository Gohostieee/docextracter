import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';
import { extractDocs } from './api.js';
import { viewGuide, editGuide, resetGuide } from './guide.js';
import { login, logout, status, isAuthenticated } from './auth.js';
import { getServerUrl } from './config.js';

export const program = new Command();

program
  .name('docextract')
  .description('CLI tool for extracting documentation using AI-powered web scraping')
  .version('1.0.0');

// Extract command
program
  .command('extract <url>')
  .description('Extract documentation from a URL')
  .option('-o, --output <path>', 'Output directory path (relative to current directory)', './docs')
  .option('-s, --server <url>', 'Server URL', 'https://docextract.webv1.com/api')
  .action(async (url, options) => {
    try {
      console.log(chalk.blue.bold('\n📚 DocExtractor\n'));

      // Check authentication
      if (!isAuthenticated()) {
        console.log(chalk.red('❌ You must be logged in to use this command'));
        console.log(chalk.gray('Run "docextract login" to authenticate\n'));
        process.exit(1);
      }

      // Validate URL
      try {
        new URL(url);
      } catch (e) {
        console.log(chalk.red('❌ Invalid URL provided'));
        process.exit(1);
      }

      // Get output path
      const outputPath = path.resolve(process.cwd(), options.output);

      // Confirm with user
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Extract documentation from ${chalk.cyan(url)} to ${chalk.cyan(outputPath)}?`,
          default: true
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('❌ Extraction cancelled'));
        process.exit(0);
      }

      // Load guide
      const spinner = ora('Loading guide configuration...').start();
      const guide = fs.readFileSync(
        new URL('../config/guide.txt', import.meta.url),
        'utf-8'
      );
      spinner.succeed('Guide loaded');

      // Get server URL
      const serverUrl = getServerUrl(options);

      // Call API
      spinner.start('Extracting documentation (this may take a few minutes)...');
      const zipBuffer = await extractDocs(serverUrl, url, guide);
      spinner.succeed('Documentation extracted');

      // Extract ZIP
      spinner.start('Extracting files...');

      // Create output directory if it doesn't exist
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      const zip = new AdmZip(zipBuffer);
      zip.extractAllTo(outputPath, true);

      spinner.succeed('Files extracted successfully');

      console.log(chalk.green.bold('\n✅ Documentation extraction complete!'));
      console.log(chalk.gray(`📁 Output: ${outputPath}\n`));

    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
      process.exit(1);
    }
  });

// Guide commands
program
  .command('guide')
  .description('Manage the extraction guide')
  .option('-v, --view', 'View the current guide')
  .option('-r, --reset', 'Reset guide to default')
  .action(async (options) => {
    try {
      if (options.view) {
        await viewGuide();
      } else if (options.reset) {
        await resetGuide();
      } else {
        await editGuide();
      }
    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
      process.exit(1);
    }
  });

// Auth commands
program
  .command('login')
  .description('Authenticate with DocExtract')
  .option('-s, --server <url>', 'Server URL', 'https://docextract.webv1.com')
  .action(async (options) => {
    try {
      const serverUrl = getServerUrl(options);
      await login(serverUrl);
    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
      process.exit(1);
    }
  });

program
  .command('logout')
  .description('Logout from DocExtract')
  .action(async () => {
    try {
      await logout();
    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show authentication status')
  .action(async () => {
    try {
      await status();
    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
      process.exit(1);
    }
  });

export default program;
