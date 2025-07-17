# Yaakov Bressler - Personal Website

> A Jekyll-based personal website for Yaakov Bressler, deployed with GitHub Pages

## Quick Start

**Prerequisites:** Ruby 3.0+ and Bundler

```bash
# 1. Clone the repository
git clone https://github.com/ybressler/personal-website.git
cd personal-website

# 2. Install dependencies
bundle install

# 3. Run locally
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see your site!

## 📋 Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)

## Installation

### System Requirements
- **Ruby**: 3.0 or higher
- **Bundler**: Latest version
- **Git**: For version control

### Setup Steps

1. **Install Ruby and Bundler**
   ```bash
   # macOS (using Homebrew)
   brew install ruby
   gem install bundler
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install ruby-full build-essential
   gem install bundler --user-install
   ```

2. **Clone and Setup**
   ```bash
   git clone https://github.com/ybressler/personal-website.git
   cd personal-website
   bundle install
   ```

3. **Verify Installation**
   ```bash
   bundle exec jekyll serve
   ```

## Development

### Project Structure
```
├── _config.yml         # Jekyll configuration
├── _data/             # Data files
├── _includes/         # Reusable components
├── _layouts/          # Page templates
├── assets/            # CSS, JS, images
├── pages/             # Main pages
└── index.md           # Homepage
```

### Running Locally
```bash
# Start development server
bundle exec jekyll serve

# With live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build
```

<details>
<summary>🎨 Content Creation Guide</summary>

### Creating Pages
You can create pages using [markdown or HTML](MARKDOWN_HTML_GUIDE.md).

### Available Components
Use these styled components in your content:

```html
<div class="info-msg">
  <i class="fa fa-info-circle"></i>
  This is an info message.
</div>

<div class="success-msg">
  <i class="fa fa-check"></i>
  This is a success message.
</div>

<div class="warning-msg">
  <i class="fa fa-warning"></i>
  Warning message here.
</div>

<div class="error-msg">
  <i class="fa fa-times-circle"></i>
  This is an error message.
</div>
```

### Theme Information
- **Base theme**: [jekyll-theme-minimal-resume](https://github.com/murraco/jekyll-theme-minimal-resume)
- **Menu system**: [Jekyll Menus](https://github.com/forestryio/jekyll-menus)

</details>

## Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes
4. **Test** locally: `bundle exec jekyll serve`
5. **Commit** with clear messages: `git commit -m "Add amazing feature"`
6. **Push** to your fork: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing file naming conventions
- Test all changes locally before submitting
- Keep commits focused and atomic

### Content Guidelines
- Write clear, concise content
- Use proper markdown syntax
- Optimize images for web
- Test responsiveness on different devices

## Troubleshooting

<details>
<summary>🚨 Common Issues and Solutions</summary>

### Bundle Install Failures
```bash
# If you get permission errors
gem install bundler --user-install

# If Ruby version conflicts
rbenv install 3.1.2
rbenv local 3.1.2
```

### Jekyll Build Errors
```bash
# Clear cache and rebuild
bundle exec jekyll clean
bundle exec jekyll build

# Update dependencies
bundle update
```

### Local Server Issues
```bash
# Kill existing Jekyll processes
pkill -f jekyll

# Try different port
bundle exec jekyll serve --port 4001
```

### GitHub Actions Deployment Issues
- Ensure GitHub Actions has **Read and write permissions**
- Check `Settings` > `Actions` > `General` > `Workflow permissions`
- Verify CNAME file matches your domain

</details>

### Getting Help
- **Issues**: Open an issue for bugs or feature requests
- **Questions**: Use discussions for general questions
- **Email**: Contact form available at [yaakovbressler.com](https://yaakovbressler.com)

## Advanced Configuration

<details>
<summary>🚀 Deployment and Advanced Setup</summary>

### GitHub Pages Deployment
This site uses a custom deployment workflow because it includes non-whitelisted packages and themes.

**Important Setup Requirements:**
1. **GitHub Actions Permissions**: Grant `Read and write permissions`
   - Navigate to `Settings` > `Actions` > `General` > `Workflow permissions`
   - Select "Read and write permissions"
   
   ![GitHub Actions Settings](images/github-actions-settings.png)

2. **Deployment Workflow**: Located at [`.github/workflows/build-jekyll.yml`](.github/workflows/build-jekyll.yml)
   - Uses [jekyll-deploy-action](https://github.com/jeffreytse/jekyll-deploy-action)
   - Automatically builds and deploys to `gh-pages` branch
   - Configured for custom domain: `yaakovbressler.com`

### Key Dependencies
- **Jekyll**: Static site generator
- **GitHub Pages**: Hosting with custom gems
- **Jekyll Remote Theme**: Theme support
- **Jekyll Menus**: Navigation system
- **Jekyll SEO Tag**: SEO optimization
- **Jekyll Sitemap**: XML sitemap generation

### Configuration Files
- `_config.yml`: Main Jekyll configuration
- `Gemfile`: Ruby dependencies
- `CNAME`: Custom domain configuration

</details>

---

**Built with ❤️ using Jekyll and GitHub Pages**
