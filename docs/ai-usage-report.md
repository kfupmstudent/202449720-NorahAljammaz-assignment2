# AI Usage Report — Assignment 2


## Tools Used & Use Cases
- **Claude (Anthropic), Claude Sonnet 5.5, via claude.ai** — Used as a step-by-step guide while I
  built the Assignment 2 features on top of my Assignment 1 portfolio:
  - planning which features to build so that the assignment's requirements are met (dynamic content,
    data handling, animation, and user feedback)
  - short code snippets and instructions for where to place them in `index.html`,
    `css/styles.css`, and `js/script.js`: project filter and live search, Read more / Show less,
    GitHub repositories from the public API (with loading, error, and empty states), contact-form
    validation, and scroll / hover animations
  - Git help: branches, commit messages that credit the AI, and fixing problems with my repository
    (see Challenges below)
  - drafting the technical documentation and this report
  - Claude also produced a complete reference version of the site and documentation files (listed
    below as A01–A06). ✎ I did not copy it: I typed my own code from the smaller step-by-step snippets.
  
- **ChatGPT (OpenAI)** — Used in a separate conversation to ask how to clone / copy my Assignment 1
  repository so that I could start Assignment 2.I also used it to review my finalized code 

## Carried Over from Assignment 1
The starting point for this assignment is my Assignment 1 portfolio. The AI use for that work (Claude for
the initial template and a review, Gemini for the logo and project descriptions, ChatGPT for a
requirements check) was declared in Assignment 1 and is not repeated here.

## AI Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude (Claude Sonnet 5.5) | 2026-10-19 | Planned the features from the assignment brief; gave step-by-step code snippets and file locations for the filter / search, Read more, GitHub API, form validation, and animations; helped with Git branches, commits, and repository problems; drafted the technical documentation and this report | `index.html`, `css/styles.css`, `js/script.js`, `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md` | ✎ I typed the code myself and adapted it (write what you changed, for example button labels, tags, error wording, colors, comments). I tested each feature in the browser after adding it: the filter buttons and search (including no results), Read more / Show less, the GitHub section (loaded, and offline to see the error and "Try again"), the form with empty / invalid / valid input, dark mode, and the scroll animations. I read the generated documentation and corrected it to match my code. |
| C02 | ChatGPT (✎ model shown in the chat) | ✎ date of the chat | Asked how to clone / copy my Assignment 1 repository to start Assignment 2 (repository setup, no project code) | ✎ None (confirm) | ✎ Write which of its suggestions you used and how you checked the copy worked (for example that the new repository opened and the site ran). |

**AI-generated artifacts in the evidence ZIP** (what the AI produced before my edits):
- A01 `index.html`, A02 `styles.css`, A03 `script.js` — Claude's complete reference version of the site
- A04 `README.md`, A05 `technical-documentation.md`, A06 `ai-usage-report.md` — Claude's first drafts of the documentation
- A07 `technical-documentation.md`, A08 `ai-usage-report.md` — Claude's final drafts of these two documents, written to match the code I typed. I did not use the files directly but created my own and copied some features from there to my site.

## Benefits & Challenges
**Benefits:**
- Claude turned the assignment brief into a clear plan, one feature at a time, so I could build and test
  each feature before moving on.
- Short snippets with exact locations ("find this line, add this below it") let me build the features
  myself and understand each part, instead of receiving one finished site.
- Claude helped me with documentation wording, which saved time.

**Challenges:**
- **Copying the repository:** my first push to the new repository failed with `HTTP 400` and "the remote end
  hung up unexpectedly". It was fixed by increasing Git's HTTP buffer size (`http.postBuffer`).
- **Working in the wrong folder:** I had cloned into a folder inside another folder, so VS Code showed an
  empty outer repository and no changes to commit. I fixed it by opening the inner `assignment2` folder
  and checking `git status`, `git branch`, and `git remote -v`.
- **Missing changes in a commit:** my first commit for the filter did not include `css/styles.css`, because
  I had not saved the CSS yet. ✎ I added the styles in a follow-up commit. (Edit if you handled it differently.)
- **Placing code correctly:** I had to match each snippet to my own files, fix typos, and test after every
  step. I could not just trust that the code would work as given.

## Learning Outcomes
✎ Keep only the points you can explain in your own words, and add your own.
- How the filter and search work together: a project is shown only if it matches the selected button **and**
  the search text, and cards are hidden with the `hidden` attribute.
- How `fetch` with `async` / `await` loads data from a public API, why the call is wrapped in `try` / `catch`,
  and how the loading, error, and empty states give the visitor feedback.
- Why API text is inserted with `textContent` instead of `innerHTML`.
- How an `IntersectionObserver` triggers the fade-in when an element scrolls into view, and why reduced-motion
  visitors skip it.
- How form validation builds one error message per field and shows a summary or a confirmation.
- How Git branches, commits, and remotes fit together, and how to check which repository I am working in.

## Responsible Use & Modifications
- ✎ I read, typed, tested, and adjusted all of the code myself, and I can explain how each feature works.
- No AI output was submitted unreviewed. The documentation was checked against my code and corrected where it
  did not match.
- Commits that include AI-assisted work credit the tool in the commit message, for example:
  `Assisted-by: Claude (Claude Sonnet 5.5)`.
- The full conversations (C01 with Claude, C02 with ChatGPT) and the AI's original files (before my edits) are in
  the AI Evidence ZIP submitted on Blackboard (`202449720-NorahAljammaz-assignment2-ai-evidence.zip`). They are
  not committed to this repository.

## AI Usage Declaration
I declare that this report and the attached evidence document all of my AI use in this assignment, with
complete and unedited conversations, and that I understand and can explain all the code I submitted. I
understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM
regulations.

- **Name:** Norah Aljammaz
- **ID:** 202449720
- **Date:** ✎ write the date you submit