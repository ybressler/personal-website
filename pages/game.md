---
layout: default
title: Game
permalink: /game
menus:
  header:
    identifier: Game
    weight: 20
---

<section class="headshot-game" aria-labelledby="game-heading">
  <header class="headshot-game__intro">
    <h1 id="game-heading">Behold, a face.</h1>
    <p>Strange things may occur.</p>
  </header>

  <div class="headshot-game__board">
    <div class="headshot-game__stats" aria-live="polite">
      <div class="stat">
        <span class="stat__label">Now</span>
        <span class="stat__value" id="game-clicks">0</span>
      </div>
      <div class="stat">
        <span class="stat__label">Lifetime</span>
        <span class="stat__value" id="game-lifetime">0</span>
      </div>
    </div>

    <button class="headshot-game__target" id="game-target" type="button" aria-label="Click or swipe my headshot">
      <span class="headshot-game__card" id="game-card">
        <span class="swipe-label swipe-label--nope" aria-hidden="true">Nope</span>
        <span class="swipe-label swipe-label--like" aria-hidden="true">Like</span>
        <picture>
          <source srcset="{{ '/images/yaakov-bressler-headshot.webp' | relative_url }}" type="image/webp">
          <img src="{{ '/images/yaakov-bressler-headshot.jpeg' | relative_url }}" alt="Yaakov Bressler headshot" width="320" height="320" decoding="async">
        </picture>
      </span>
      <span class="headshot-game__hint">Click or swipe</span>
    </button>

    <div class="headshot-game__feedback" id="game-feedback" aria-hidden="true"></div>
  </div>

  <ul class="headshot-game__achievements" id="game-achievements">
    <li data-threshold="1"><span class="ach__icon">👋</span><span class="ach__text"><strong>Hello there</strong><em>First click</em></span></li>
    <li data-threshold="10"><span class="ach__icon">🔥</span><span class="ach__text"><strong>Warmed up</strong><em>10 clicks</em></span></li>
    <li data-threshold="25"><span class="ach__icon">🎉</span><span class="ach__text"><strong>Confetti drop</strong><em>25 clicks</em></span></li>
    <li data-threshold="50"><span class="ach__icon">🚀</span><span class="ach__text"><strong>Lift-off</strong><em>50 clicks</em></span></li>
    <li data-threshold="100"><span class="ach__icon">💯</span><span class="ach__text"><strong>Centurion</strong><em>100 clicks</em></span></li>
    <li class="ach--secret" data-secret="rage"><span class="ach__icon">⚡</span><span class="ach__text"><strong>Rage Unlocked</strong><em>Secret</em></span></li>
    <li class="ach--secret" data-secret="abyss"><span class="ach__icon">💀</span><span class="ach__text"><strong>Rock Bottom</strong><em>Secret</em></span></li>
  </ul>

  <div class="headshot-game__controls">
    <button type="button" id="game-reset" class="headshot-game__reset">Reset run</button>
  </div>
</section>

<link rel="stylesheet" href="{{ '/assets/css/game.css' | relative_url }}">
<script defer src="{{ '/assets/js/game.js' | relative_url }}"></script>
