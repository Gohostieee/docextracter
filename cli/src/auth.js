import fs from 'fs';
import path from 'path';
import os from 'os';
import http from 'http';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import open from 'open';
import { loadConfig } from './config.js';

const CONFIG_DIR = path.join(os.homedir(), '.docextract');
const AUTH_FILE = path.join(CONFIG_DIR, 'auth.json');

/**
 * Ensure config directory exists
 */
function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

/**
 * Save auth token to config file
 * @param {string} token - The session token from Clerk
 */
export function saveAuthToken(token) {
  ensureConfigDir();
  fs.writeFileSync(
    AUTH_FILE,
    JSON.stringify({ token, timestamp: Date.now() }, null, 2)
  );
}

/**
 * Get stored auth token
 * @returns {string|null} The stored token or null
 */
export function getAuthToken() {
  try {
    if (!fs.existsSync(AUTH_FILE)) {
      return null;
    }
    const data = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    return data.token || null;
  } catch (error) {
    return null;
  }
}

/**
 * Clear stored auth token
 */
export function clearAuthToken() {
  if (fs.existsSync(AUTH_FILE)) {
    fs.unlinkSync(AUTH_FILE);
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return getAuthToken() !== null;
}

/**
 * Start a local HTTP server to receive the auth callback
 * @param {number} port - The port to listen on
 * @returns {Promise<string>} The received token
 */
function startCallbackServer(port = 8765) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${port}`);

      if (url.pathname === '/callback') {
        const token = url.searchParams.get('token');
        const userId = url.searchParams.get('userId');

        if (token) {
          // Send success response to browser
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Authentication Successful</title>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background: #0e0d0b;
                    color: #f4ede1;
                  }
                  .container {
                    text-align: center;
                    padding: 2rem;
                  }
                  .checkmark {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                  }
                  h1 {
                    color: #b08968;
                    margin-bottom: 0.5rem;
                  }
                  p {
                    color: #a39282;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="checkmark">✅</div>
                  <h1>Authentication Successful!</h1>
                  <p>You can close this window and return to your terminal.</p>
                  <p style="font-size: 0.875rem; margin-top: 1rem;">User ID: ${userId || 'N/A'}</p>
                </div>
              </body>
            </html>
          `);

          server.close();
          resolve(token);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Missing token parameter');
          server.close();
          reject(new Error('Missing token parameter'));
        }
      }
    });

    server.listen(port, () => {
      console.log(chalk.gray(`Callback server listening on port ${port}...`));
    });

    server.on('error', (err) => {
      reject(err);
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      server.close();
      reject(new Error('Authentication timeout'));
    }, 300000);
  });
}

/**
 * Login command - opens browser for OAuth-style authentication
 * @param {string} serverUrl - The server URL
 */
export async function login(serverUrl = 'https://docextract.webv1.com') {
  console.log(chalk.blue.bold('\n🔐 DocExtract CLI Authentication\n'));

  const config = loadConfig();
  const callbackPort = config.callbackPort || 8765;
  const authUrl = `${serverUrl}/cli-auth?port=${callbackPort}`;

  console.log(chalk.gray('Opening browser for authentication...'));
  console.log(chalk.gray(`If the browser doesn't open, visit: ${chalk.cyan(authUrl)}\n`));

  try {
    // Open browser
    await open(authUrl);

    const spinner = ora('Waiting for authentication...').start();

    // Start callback server and wait for token
    const token = await startCallbackServer(callbackPort);

    spinner.succeed(chalk.green('Successfully authenticated!'));

    // Save the token
    saveAuthToken(token);

    console.log(chalk.gray('\nYou can now use the CLI to extract documentation.\n'));

    // Exit cleanly instead of hanging
    process.exit(0);
  } catch (error) {
    console.log(chalk.red(`\n❌ Authentication failed: ${error.message}\n`));

    // Fallback to manual token entry
    console.log(chalk.yellow('Falling back to manual token entry...\n'));
    await loginManual();

    // Exit cleanly after manual login too
    process.exit(0);
  }
}

/**
 * Manual login fallback - prompts user for session token
 */
async function loginManual() {
  console.log(chalk.gray('To authenticate manually:\n'));
  console.log(chalk.gray('1. Go to your DocExtract app settings page'));
  console.log(chalk.gray('2. Copy your CLI session token'));
  console.log(chalk.gray('3. Paste it below\n'));

  const { token } = await inquirer.prompt([
    {
      type: 'password',
      name: 'token',
      message: 'Paste your session token:',
      validate: (input) => {
        if (!input || input.trim().length === 0) {
          return 'Token cannot be empty';
        }
        return true;
      }
    }
  ]);

  const spinner = ora('Validating token...').start();

  // Save the token
  saveAuthToken(token.trim());

  spinner.succeed(chalk.green('Successfully authenticated!'));
  console.log(chalk.gray('\nYou can now use the CLI to extract documentation.\n'));
}

/**
 * Logout command - clears stored token
 */
export async function logout() {
  if (!isAuthenticated()) {
    console.log(chalk.yellow('\n⚠️  You are not logged in\n'));
    return;
  }

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to logout?',
      default: false
    }
  ]);

  if (confirm) {
    clearAuthToken();
    console.log(chalk.green('\n✅ Successfully logged out\n'));
  } else {
    console.log(chalk.yellow('\n❌ Logout cancelled\n'));
  }
}

/**
 * Status command - shows authentication status
 */
export async function status() {
  console.log(chalk.blue.bold('\n🔐 Authentication Status\n'));

  if (isAuthenticated()) {
    console.log(chalk.green('✅ Logged in'));
    console.log(chalk.gray(`Config file: ${AUTH_FILE}\n`));
  } else {
    console.log(chalk.yellow('⚠️  Not logged in'));
    console.log(chalk.gray('\nRun "docextract login" to authenticate\n'));
  }
}
