# Working on this repo

This is Yaakov Bressler's personal website. Jekyll-based, deployed to **yaakovbressler.com** via **GitHub Pages** (CNAME committed). The home page is the sparkly hero; `/about`, `/projects`, and `/game` are the secondary pages.

## Run it locally

```sh
bundle exec jekyll serve --watch
```

Site comes up at http://127.0.0.1:4000. Watch mode picks up `.scss` and `.css` edits without restart.

## Where things live

- `_layouts/home.html` -- used **only** by `index.html`; injects the `body.home` class so home-only CSS can scope cleanly.
- `_layouts/default.html` -- used by every other page.
- `_includes/sparkly_header.html` -- the hero with the headshot, social icons, "Play a game" CTA, and down-arrow. Lives only on `/`.
- `_includes/regular_header.html` -- the simple top header on `/about`, `/projects`, `/game`.
- `pages/*.md` -- each page declares its own `menus.header` frontmatter; that's how the nav is populated. Add a new top-level page by writing a `pages/foo.md` with a `menus.header` block.
- `assets/css/sparkly-header.scss` -- despite the name, this file owns the global theme: `:root` tokens, body typography, prose-width rules, and the regular-header styling, plus the hero. **Edit here for global typography/theme changes.**
- `assets/css/style.css` -- minified upstream theme CSS (`jekyll-theme-minimal`). Don't edit; override in our own files.
- `assets/js/main.js` and `fun-hover.js` -- home-page JS. Both must guard against the sparkly-header element being absent (other pages share `head.html` and load these scripts globally).

## Workflow conventions

- **Always** ship through a PR -- never push to `main`. GitHub Pages serves `main`, so the PR review is the safety net.
- Branch naming: `agent/<descriptive-slug>` (e.g. `agent/design-polish`, `agent/add-game-page`, `agent/fix-swipe-double-bounce`).
- After `gh pr merge` (or after Yaakov merges via UI), the next ask is usually "checkout main and pull". Do that proactively.
- Commit messages: short imperative subject, then a body that explains *why*, not just *what*. Bullet list of substantive changes is fine; no emoji in commit messages.
- Use `gh pr create` with a HEREDOC body containing **Summary** and **Test plan** (checklist).

## Design and UX preferences

- **Whimsy over instruction.** Copy should be short and atmospheric ("Behold, a face. Strange things may occur.") rather than explanatory. Layered secrets and discovery beat tutorial-style affordances.
- **Punishments sting; rewards feel earned.** When mechanics are added (scoring, achievements, gating), default to making bad choices cost real points and good choices unlock real wins. Don't soften.
- **Emojis are welcome here** even though some agents default to no-emoji. The /game page in particular leans heavily on them (👹 😉 🦄 🤬 💀); match that flavor when extending it.
- **Lifetime is cumulative**, not "best run". Now ("current run") is per-session and resets on the Reset button. Both can go negative; "Now" turning negative is the gate for hell-mode visuals.
- **Iterative design is the norm.** Yaakov ships, tests, and corrects in tight loops. Pick reasonable defaults and ship rather than asking; he'll redirect if needed.

## Mobile is a real test target

Yaakov tests on his phone and finds bugs that desktop verification misses. Before claiming a UI change is done, mentally check (or actually check) for:

- **iOS tap highlight** on `<button>` / `<a>` over rounded shapes -- set `-webkit-tap-highlight-color: transparent` (and `-webkit-touch-callout: none` if dragging images).
- **Pointer events** for drag/swipe interactions: capture pointer, listen on `document` (not the target) for `pointermove`/`pointerup`/`pointercancel`, plus a `window` blur safety reset, so the gesture can't get stuck if the cursor leaves the element.
- **CSS transitions racing CSS animations** on the same property -- set `transition: none` while the animation class is active.
- **Centered absolutely-positioned hero stacks** (`position: absolute; transform: translate(-50%,-50%)`) re-center when their content grows. Adding children pushes siblings -- including absolutely-positioned overlays anchored to the headshot (`.click-me-prompt` is at `top: -185px`) -- off-screen at small viewport heights. Solution: position the new element absolutely on the section instead of stacking it inside `.header`.
- **Multi-stage swipe/fly keyframes** can read as a "double bounce" on mobile. Prefer a clean fly-out + fade + invisible teleport-back + fade-in over fly-out-and-spring-back-with-overshoot.
- Chrome DevTools resize on this machine won't shrink below ~512px wide. Test on a real device or use device emulation for true mobile width.

## Don'ts

- Don't push to `main` directly.
- Don't edit `assets/css/style.css` (minified upstream theme).
- Don't introduce a build step for SCSS -- Jekyll handles it.
- Don't add documentation files (other than this one and compatibility pointers) unless asked. Yaakov communicates intent through code, commits, and PRs.
- Don't skip mobile verification on UI changes.
