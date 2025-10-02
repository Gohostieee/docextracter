import axios from 'axios';
import { getAuthToken } from './auth.js';
import { loadConfig } from './config.js';

/**
 * Extract documentation from a URL
 * @param {string} serverUrl - The server URL
 * @param {string} url - The documentation URL to extract
 * @param {string} guide - The extraction guide
 * @returns {Promise<Buffer>} ZIP file buffer
 */
export async function extractDocs(serverUrl, url, guide) {
  try {
    const authToken = getAuthToken();
    const config = loadConfig();
    const apiEndpoint = config.apiEndpoint || '/api';
    const timeout = config.timeout || 600000;

    const response = await axios.post(
      `${serverUrl}${apiEndpoint}/extract`,
      {
        url,
        guide
      },
      {
        responseType: 'arraybuffer',
        timeout,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/zip',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server returned status ${response.status}`);
    }

    return Buffer.from(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error(`Could not connect to server at ${serverUrl}. Make sure the server is running.`);
    } else if (error.response) {
      const errorMessage = error.response.data?.error || error.response.statusText;
      throw new Error(`Server error: ${errorMessage}`);
    } else if (error.request) {
      throw new Error('No response from server. The request may have timed out.');
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}
