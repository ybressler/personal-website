# Static Website for Koala Time
Built with jekyll, deployed with github pages.

## Installation
Stub for later work

## Packages
* Jekyll menu: https://github.com/forestryio/jekyll-menus

## Theme

* Current theme: [jekyll-theme-minimal](https://github.com/pages-themes/minimal)
* Another good theme?: https://github.com/jekyll/minima
* Look into this (to better deploy the site): https://github.com/jeffreytse/jekyll-deploy-action

## Components:
To create callouts, use the following syntax:
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
  The project is currently archived, with limited ongoing development.
</div>

<div class="error-msg">
  <i class="fa fa-times-circle"></i>
  This is a error message.
</div>
```

## Running Locally
Do this command:
```bash
bundle exec jekyll serve
```

---

## Note:
When deploying, you must grant Github Actions `Read and write permissions`.
This can be found under `settings` > `actions` > `general` > `workflow permissions`.
See the screenshot for reference: ![](images/github-actions-settings.png x250)

<br>
