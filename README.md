# Jeykll Starter Kit With Docker

This project provides a basic setup to begin a Jekyll website with Docker-based tooling.

## Workflow

### Setup

Install dependencies for host tooling.

```bash
gem install jekyll bundler
npm i
```

### Development

Start the host Jekyll and Gulp tooling and serve the site in Docker, then browse website at http://localhost:8080.

```bash
npm start
```

### Deployment

```bash
# Build the image
docker build -t <tag> .

# Push to image repository
```

## Building Your Site

- Update `src/_config.yml` with your site's settings (requires `npm start` after changes)
- Create a layout for each type of page in `src/_layouts`
- Create reusable snippets in `src/_includes`
- Generate favicon files using https://realfavicongenerator.net and replace existing files in `src` root
