---
name: add-column
description: Use when adding a new article under app/columns in this JuQa repository, including creating the column page, registering it on the columns index, validating Wikimedia hero images, and running the required lint and type checks for column content.
---

# Add Column

Create a new column page under `app/columns/` and register it in `app/columns/page.tsx`.

## When to use

Use this skill when the user asks to add a new column/article, create a reading page, or expand the editorial content under `/columns`.

## Workflow

1. Decide the theme and slug.
   - If the user provides a topic, use it.
   - Slugs should be lowercase kebab-case.
   - Check `app/columns/` for collisions first.
2. Choose a hero image from Wikimedia Commons.
   - Test candidate URLs with:
     ```bash
     curl -o /dev/null -s -w "%{http_code} %{url_effective}\n" -L "<URL>"
     ```
   - Use only images that resolve successfully.
   - If you need the final image URL for OGP or direct rendering, use the effective `upload.wikimedia.org` URL returned by curl.
3. Create `app/columns/<slug>/page.tsx`.
4. Add the new entry to the `columns` array in `app/columns/page.tsx`.
5. Run:
   ```bash
   pnpm textlint:columns
   pnpm lint
   pnpm typecheck
   ```

## Page expectations

- Export `metadata` with title, description, canonical URL, Open Graph, and Twitter fields.
- Keep the site style consistent with the existing dark theme and green accent.
- Link mentioned plants with `Link` to `/plants/<id>` when concrete plant examples appear.
- Follow the current article patterns in existing files under `app/columns/`.

## Writing guidance

- Use Japanese `です・ます` style.
- Aim for an approachable educational tone.
- Intro sections should hook from a familiar observation, then explain the underlying distinction.
- Prefer 4 to 6 content sections unless the topic clearly needs a different structure.
- After editing any column, `pnpm textlint:columns` is required.

## Notes

- The repository uses inline styles heavily; preserve the established design language instead of introducing a new styling system.
- Prefer the current repo structure over older Claude-era assumptions if the implementation has moved.
