
# Technical Documentation

## Overview
A static, single-page portfolio site built with vanilla HTML5, CSS3, and JavaScript (ES6+).
No frameworks, build tools, or backend are used: the site runs directly in the browser from
`index.html`. The only network request is a call to the public GitHub API for the repositories
section.

Assignment 2 builds on the Assignment 1 portfolio and adds project filtering and live search,
expandable project descriptions, a GitHub repositories section with loading / error / empty states,
better contact-form feedback, and animations.

## How to Run This Project Locally
No installation, build step, or dependencies are required.

1. Clone or download the repository.
2. Open the project folder on your computer.
3. Double-click `index.html`. It opens directly in your default browser.
   - **Alternative:** open the folder in VS Code and use the "Live Server" extension for automatic
     reload on save while editing.
4. To test responsiveness, open your browser's DevTools (F12 or Right-click → Inspect), toggle the
   Device Toolbar, and preview at different screen widths (mobile, tablet, desktop).
5. To test the theme toggle, click the moon / sun icon in the navbar. The preference is saved in
   `localStorage`, so it persists after refreshing the page.
6. The GitHub section needs an internet connection. To see its error state, open DevTools →
   Network, set throttling to **Offline**, and reload the page.

No environment variables, API keys, or servers are needed.

## Architecture
```
index.html     → structure/content (semantic sections: header, main, footer)
css/styles.css → all styling, using CSS custom properties for theming
js/script.js   → all interactivity, organized into small named functions
```

## Features Added in Assignment 2

### 1. Project filter and live search (dynamic content)
- **HTML:** the filter buttons (`.filter-btn`) each carry a `data-filter` value (`all`, `social`,
  `education`). Each project card carries a `data-tags` attribute such as
  `data-tags="education business mobile"`. The page also has a search box (`#projectSearch`), a
  results line (`#resultsCount`), and an empty-state message (`#emptyState`) that starts hidden.
- **JavaScript:** `setupProjectFilter()` keeps the selected filter in a variable called
  `activeFilter`. Its inner function `apply()` loops over every card and shows it only if it matches
  **both** conditions: its tags include the active filter (or the filter is "all"), **and** the
  search text appears in the card's title, tags, or description. It then updates the "Showing X of Y
  projects" line and shows or hides the empty-state message.
- **Live search:** the search box listens to the `input` event, so the results update on every key
  press without pressing Enter. Clicking a filter button updates the `active` class and calls
  `apply()` again.
- **Hiding cards:** cards are hidden with the HTML `hidden` attribute. A CSS rule
  `[hidden] { display: none !important; }` makes sure the attribute always wins over other display
  rules.

### 2. Read more / Show less (dynamic content)
`setupReadMore()` adds the class `is-collapsed` to each project description. In CSS, that class clips
the text to 4 lines using `-webkit-line-clamp`. The function creates a "Read more" button in
JavaScript and places it after each description. Clicking it toggles `is-collapsed` and switches the
button text between "Read more" and "Show less". Because the button is created by JavaScript, the full
text is still visible if JavaScript fails to load.

### 3. GitHub repositories (data handling from a public API)
`loadRepos()` is an `async` function that calls
`https://api.github.com/users/<GITHUB_USERNAME>/repos?sort=updated&per_page=6` with `fetch`. The
username is a constant at the top of `script.js`, so it can be changed in one place. Each repository
is shown as a card with its name (a link to GitHub) and its description. If a repository has no
description, the text "No description provided." is shown instead.

Repository text is inserted with `textContent` rather than `innerHTML`, so text that comes from the API
cannot inject HTML into the page. The section has four states, all shown in the `#repoStatus` area:

| State | When | What the visitor sees |
|---|---|---|
| Loading | the request is in progress | "Loading repositories…" |
| Success | repositories were received | a card for each repository |
| Empty | the API returns an empty list | "No public repositories yet. Check back soon!" |
| Error | the request fails or GitHub answers with an error | a friendly message and a **Try again** button |

The **Try again** button calls `loadRepos()` again, so a visitor can recover without reloading the page.

### 4. Contact form validation (data handling and feedback)
`setupContactForm()` runs when the form is submitted. It reads the name, email, and message, and builds
an object with one possible error message per field:

- name: at least 2 characters
- email: must match a simple format check in `isValidEmail()`
- message: at least 10 characters

Each message is written into the `<span class="field-error">` under the matching field. If any field
has an error, the form shows a summary message in red (class `is-error`) and stops. If all fields are
valid, it shows a personalized green confirmation (class `is-success`) that includes the visitor's name,
and clears the form. There is intentionally no backend, so the message explains that the form is a demo.

### 5. Animations and transitions
- **Scroll fade-in:** `setupScrollReveal()` uses an `IntersectionObserver`. It adds the class `reveal`
  (invisible and shifted down 20px) to the section titles, project cards, and contact form, and adds
  `is-visible` when each one scrolls into view. Each element animates once and is then no longer observed.
- **Hover effect:** project cards get an accent-colored border and a stronger shadow on hover.
- **Animated messages:** the form's success and error messages slide in with the `statusIn` animation.
- **Reduced motion:** the scroll effect is skipped in JavaScript, and the CSS turns off the transitions
  and animations, when the visitor's system asks for reduced motion. Content is always visible.

### 6. Theme preference (carried over from Assignment 1)
The chosen theme (dark or light) is saved in `localStorage` under the key `theme` and is applied again
when the page loads.

## Error Handling and User Feedback
Every action tells the visitor what happened and what to do next.

| Situation | Feedback |
|---|---|
| Repositories are loading | "Loading repositories…" |
| GitHub request fails (offline, blocked, server error) | "Could not load repositories. Check your internet connection and try again." plus a **Try again** button |
| GitHub account has no public repositories | "No public repositories yet. Check back soon!" |
| No project matches the filter / search | "No projects match. Try a different keyword or clear the search." |
| Invalid or empty form field | a specific message under that field |
| Form has errors on submit | "Please fix the errors above and send again." (red) |
| Form submitted correctly | "Thanks, <name>! Your message has been noted…" (green) |

## Key Technical Decisions

### CSS custom properties for theming
Colors, spacing, and radii are defined once as CSS variables under `:root` and overridden under
`[data-theme="dark"]`. The error and success colors (`--error`, `--success`) follow the same pattern,
with lighter versions in dark mode so the messages stay readable on both backgrounds.

### Responsive layout
- The hero section, project grid, and repository grid use **CSS Grid** with
  `repeat(auto-fit, minmax(...))`, so cards reflow automatically without extra media queries.
- A media query at `800px` stacks the hero and swaps the horizontal nav for a toggled mobile menu.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` makes the browser use the
  device's real width, so the responsive CSS works on real phones and not only in DevTools.

### Progressive enhancement
Features that depend on JavaScript are added by JavaScript (the Read more buttons and the scroll fade-in).
If the script fails, visitors still see all text and content.

### JavaScript structure
`script.js` is organized into small, single-purpose functions, most of them called once on
`DOMContentLoaded`: `setupMobileNav()`, `setupThemeToggle()`, `setGreetingByTime()`,
`setupContactForm()`, `setupProjectFilter()`, `setupReadMore()`, `loadRepos()`, and `setupScrollReveal()`.

### Accessibility
- Form inputs are tied to `<label>` elements with `for` / `id`.
- The search box has an `aria-label`, the results line uses `aria-live="polite"`, and the repository
  status area uses `role="status"`, so screen readers announce changes.
- The hamburger button exposes `aria-expanded`.
- Reduced-motion preferences are respected (see above).

## Manual Test Checklist
1. **Filter:** click Social → only Breaker; Education → only Darsi; All → both. The count line updates.
2. **Search:** type `tutor` → only Darsi; type `campus` → only Breaker (case does not matter).
3. **Empty state:** type `zzzz` → the "No projects match" message appears; clear the box → projects return.
4. **Read more:** click it → full text and the button says "Show less"; click again → text collapses.
5. **GitHub, success:** reload the page → "Loading repositories…" briefly, then the repository cards.
6. **GitHub, error:** set DevTools → Network to Offline and reload → friendly error and **Try again**
   button; go back online and click it → repositories load.
7. **Form errors:** click Send with empty fields → an error under each field and a red summary; enter an
   invalid email → the email message remains.
8. **Form success:** fill in all fields correctly → green confirmation with your name; the form clears.
9. **Theme:** click the moon / sun button, refresh → the theme is remembered.
10. **Animations:** scroll down slowly → sections fade in; hover over a project card → border and shadow change.
11. **Responsive:** at about 375px width there is no horizontal scrolling and the hamburger menu works.

## Known Limitations
- The contact form does not send data anywhere; it validates input and shows a confirmation only, as the
  assignment does not require a backend.
- GitHub allows only a limited number of requests per hour from one network. If that limit is reached,
  the repositories section shows the error message, and the visitor can try again later.
- Only public repositories are shown, and only the six most recently updated.
- Every failure of the GitHub request shows the same error message; it does not distinguish between being
  offline and a server error.
- Project tags are written by hand in `index.html`. Adding a new project means adding its `data-tags`
  (and a filter button if it has a new category).
- Form error messages are not yet linked to their inputs with `aria-describedby`, and errors are checked
  only on submit. Both are possible improvements.
- The selected filter and search text are not remembered after a page reload.

## Browser Support
The features use standard browser APIs that current versions of Chrome, Edge, Firefox, and Safari
support: `fetch`, `async` / `await`, `IntersectionObserver`, CSS Grid / Flexbox, and CSS custom
properties. If `IntersectionObserver` is not available, the scroll fade-in is skipped and the content is
shown normally. ✎ Add the browsers you actually tested in (for example "Tested in Chrome and Safari"),
or delete this line.