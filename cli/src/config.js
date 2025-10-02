import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.docextract');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const DEFAULTS_FILE = new URL('../config/defaults.json', import.meta.url);

/**
 * Ensure config directory exists
 */
function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

/**
 * Load configuration
 * @returns {Object} Configuration object
 */
export function loadConfig() {
  try {
    ensureConfigDir();

    // Load defaults
    const defaults = JSON.parse(fs.readFileSync(DEFAULTS_FILE, 'utf-8'));

    // Load user config if exists
    if (fs.existsSync(CONFIG_FILE)) {
      const userConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      return { ...defaults, ...userConfig };
    }

    return defaults;
  } catch (error) {
    console.error('Error loading config:', error);
    return {
      serverUrl: 'http://localhost:3000',
      apiEndpoint: '/api',
      callbackPort: 8765,
      timeout: 600000,
    };
  }
}

/**
 * Save configuration
 * @param {Object} config - Configuration object
 */
export function saveConfig(config) {
  try {
    ensureConfigDir();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

/**
 * Get a specific config value
 * @param {string} key - Config key
 * @returns {any} Config value
 */
export function getConfigValue(key) {
  const config = loadConfig();
  return config[key];
}

/**
 * Set a specific config value
 * @param {string} key - Config key
 * @param {any} value - Config value
 */
export function setConfigValue(key, value) {
  const config = loadConfig();
  config[key] = value;
  saveConfig(config);
}

/**
 * Get server URL from config or options
 * @param {Object} options - Command options
 * @returns {string} Server URL
 */
export function getServerUrl(options = {}) {
  // Priority: CLI option > Environment variable > Saved config > Default
  return (
    options.server ||
    process.env.DOCEXTRACT_SERVER_URL ||
    getConfigValue('serverUrl') ||
    'http://localhost:3000'
  );
}
