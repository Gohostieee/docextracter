import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GUIDE_PATH = path.join(__dirname, '../config/guide.txt');
const DEFAULT_GUIDE_PATH = path.join(__dirname, '../config/default-guide.txt');

/**
 * View the current guide
 */
export async function viewGuide() {
  try {
    const guide = fs.readFileSync(GUIDE_PATH, 'utf-8');
    console.log(chalk.blue.bold('\n📋 Current Extraction Guide:\n'));
    console.log(chalk.gray('─'.repeat(60)));
    console.log(guide);
    console.log(chalk.gray('─'.repeat(60) + '\n'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(chalk.yellow('⚠️  No guide found. Using default guide.'));
      await resetGuide();
      await viewGuide();
    } else {
      throw error;
    }
  }
}

/**
 * Edit the guide in the default editor
 */
export async function editGuide() {
  try {
    // Ensure guide exists
    if (!fs.existsSync(GUIDE_PATH)) {
      fs.copyFileSync(DEFAULT_GUIDE_PATH, GUIDE_PATH);
    }

    console.log(chalk.blue('📝 Opening guide in editor...\n'));

    // Determine the editor
    const editor = process.env.EDITOR || process.env.VISUAL || (process.platform === 'win32' ? 'notepad' : 'nano');

    try {
      execSync(`${editor} "${GUIDE_PATH}"`, { stdio: 'inherit' });
      console.log(chalk.green('\n✅ Guide updated successfully\n'));
    } catch (error) {
      console.log(chalk.yellow('\n⚠️  Could not open editor. Use --view to see the guide path.'));
      console.log(chalk.gray(`Guide location: ${GUIDE_PATH}\n`));
    }
  } catch (error) {
    throw new Error(`Failed to edit guide: ${error.message}`);
  }
}

/**
 * Reset the guide to default
 */
export async function resetGuide() {
  try {
    fs.copyFileSync(DEFAULT_GUIDE_PATH, GUIDE_PATH);
    console.log(chalk.green('✅ Guide reset to default\n'));
  } catch (error) {
    throw new Error(`Failed to reset guide: ${error.message}`);
  }
}
