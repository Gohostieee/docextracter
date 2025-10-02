# DocExtractor CLI

A command-line interface for extracting documentation from websites using AI-powered web scraping.

## Installation

### Local Installation

```bash
cd cli
npm install
```

### Global Installation

```bash
cd cli
npm install -g .
```

After global installation, you can use `docextract` command anywhere.

## Usage

### Extract Documentation

Extract documentation from a URL and save it to a local directory:

```bash
docextract extract <url> [options]
```

**Options:**
- `-o, --output <path>` - Output directory path (relative to current directory). Default: `./docs`
- `-s, --server <url>` - Server URL. Default: `http://localhost:3001`

**Examples:**

```bash
# Extract to default ./docs directory
docextract extract https://docs.example.com

# Extract to custom directory
docextract extract https://docs.example.com -o ./my-docs

# Use custom server URL
docextract extract https://docs.example.com -s http://localhost:8080
```

### Manage Extraction Guide

The extraction guide provides instructions to the AI on how to extract documentation. You can view, edit, or reset it:

#### View Current Guide

```bash
docextract guide --view
```

#### Edit Guide

Opens the guide in your default text editor:

```bash
docextract guide
```

The guide will open in:
- Your `EDITOR` or `VISUAL` environment variable editor
- `notepad` on Windows
- `nano` on Linux/Mac

#### Reset to Default Guide

```bash
docextract guide --reset
```

## Guide Customization

You can customize the extraction guide to:
- Focus on specific types of content
- Change the output format
- Add specific extraction rules
- Modify quality checks

The guide is located at `cli/config/guide.txt` and is sent to the server with each extraction request.

## Server Setup

Before using the CLI, make sure the extraction server is running:

```bash
# In the server directory
cd server
npm install
npm run dev
```

The server should be running on `http://localhost:3001` (or your configured port).

## How It Works

1. The CLI reads your extraction guide configuration
2. Sends a request to the server with the URL and guide
3. The server uses AI-powered web scraping to extract documentation
4. Returns a ZIP file with the extracted markdown files
5. CLI extracts the ZIP to your specified output directory

## Output Structure

The extracted documentation will typically include:

```
docs/
├── README.md                 # Information about the extraction
├── MASTER_SUMMARY.md        # Index of all pages
└── pages/                   # Individual documentation pages
    ├── getting-started.md
    ├── api-reference.md
    └── ...
```

## Troubleshooting

### Server Connection Error

If you see `Could not connect to server`, ensure:
1. The server is running (`npm run dev` in the `server` directory)
2. The server URL is correct (use `-s` option to specify)
3. No firewall is blocking the connection

### Editor Not Opening

If `docextract guide` doesn't open an editor:
1. Set the `EDITOR` environment variable to your preferred editor
2. Or manually edit the file at `cli/config/guide.txt`

### Extraction Timeout

Large documentation sites may take several minutes to extract. The CLI has a 10-minute timeout by default.

## Requirements

- Node.js 18 or higher
- Running extraction server
- Internet connection for documentation extraction

## License

ISC
