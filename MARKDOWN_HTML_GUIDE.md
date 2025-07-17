# Combining Markdown and HTML in Jekyll

This document explains how to embed markdown content within HTML pages in Jekyll. The examples shown in the `about.html` and `projects.html` files demonstrate various techniques.

## Prerequisites

Your HTML file must have Jekyll front matter at the top to be processed by Jekyll:

```yaml
---
layout: default
title: Your Page Title
permalink: /your-page-url
---
```

## Techniques for Embedding Markdown

### 1. Direct Markdown Content
The simplest approach is to write markdown directly in your HTML file:

```markdown
## My Section Title
This is **bold text** and this is *italic text*.

- List item 1
- List item 2
```

### 2. Using the `capture` and `markdownify` Filters

Capture markdown content in a variable and convert it to HTML:

```liquid
{% capture my_content %}
### Dynamic Content
This markdown content can include **variables** and be processed dynamically.

Current date: {{ site.time | date: "%B %d, %Y" }}
{% endcapture %}

<div class="my-section">
{{ my_content | markdownify }}
</div>
```

### 3. Processing Liquid Variables as Markdown

You can create markdown content using Liquid variables:

```liquid
{% assign my_text = "This is **bold** and this is *italic*" %}
{{ my_text | markdownify }}
```

### 4. Including Markdown Files

Include content from other markdown files:

```liquid
{%- comment -%}
{% include_relative path/to/your/file.md %}
{%- endcomment -%}
```

**Note:** The include path should be relative to your current file location.

### 5. Processing Data with Markdown

Loop through data and apply markdown formatting:

```liquid
{% for item in site.data.projects %}
  {% assign description = "**" | append: item.name | append: ":** " | append: item.about %}
  {{ description | markdownify }}
{% endfor %}
```

### 6. Complex HTML Structure with Embedded Markdown

Combine HTML structure with markdown content:

```html
<div class="card">
  <div class="header">
    <h2>{{ item.title }}</h2>
  </div>
  <div class="content">
    {% capture card_content %}
{{ item.description }}

**Features:**
- Feature 1
- Feature 2
    {% endcapture %}
    {{ card_content | markdownify }}
  </div>
</div>
```

## Important Notes

1. **File Extension**: You can use either `.html` or `.md` extensions. Jekyll will process both if they have front matter.

2. **Markdown Parser**: Jekyll uses Kramdown by default. You can configure this in `_config.yml`:
   ```yaml
   markdown: kramdown
   kramdown:
     input: GFM
     hard_wrap: false
   ```

3. **HTML in Markdown**: You can also embed HTML within markdown files for more complex styling.

4. **Performance**: The `markdownify` filter processes content at build time, so there's no runtime performance impact.

## Examples in This Site

- **about.html**: Shows direct markdown, capture/markdownify, and variable processing
- **projects.html**: Demonstrates complex HTML structures with embedded markdown and data processing

## Styling

The markdown content will be styled according to your site's CSS. Make sure your CSS handles the generated HTML elements (h1-h6, p, ul, ol, strong, em, etc.).