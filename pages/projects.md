---
layout: default
title: Projects
permalink: /projects
menus:
  header:
    identifier: Projects
    weight: 10
---

## Interesting Projects
<i>Some of the interesting projects I've worked on.</i>

<div class="responsive-cards">
  {%- for item in site.data.projects -%}

  <div class="card">
    <div class="face face1">
      <div class="content">
        <h2>{{ item.name }}</h2>
        <p>{{ item.about }}</p>
        <a href="{{ item.url }}" target="_blank">
          Learn More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
    <div class="face face2">
      <h2>{{ item.name }}</h2>
      <img src="{{ item.logo }}" alt="{{ item.name }} Logo">
    </div>
  </div>

  {% endfor %}
</div>
