---
name: add-plant
description: Use when adding a new plant entry to this JuQa repository, including updating lib/data/plant.ts, optionally adding a family in lib/data/family.ts, validating Wikimedia image URLs, and running the required checks for plant data changes.
---

# Add Plant

Add a new plant to `lib/data/plant.ts`. If the family does not exist yet, add it to `lib/data/family.ts` first.

## When to use

Use this skill when the user asks to add a plant, register a new species, or expand the plant/family dataset.

## Workflow

1. Confirm the current max IDs from the actual source files.
   Use commands, not visual guesses.
   - `rg '^[[:space:]]+id: [0-9]+,' lib/data/plant.ts`
   - `rg '^[[:space:]]+id: [0-9]+,' lib/data/family.ts`
2. Check whether the target family already exists in `lib/data/family.ts`.
3. If the family is missing, add it with a new `id` and `classification`.
4. Add the new plant entry near the end of `lib/data/plant.ts`.
5. If `similar_plant_ids` are used, update reciprocal links where appropriate.
6. Validate every added `image_url` and `images[].url`.
   - Prefer Wikimedia Commons `Special:FilePath/...` URLs in the data source.
   - Check each URL with:
     ```bash
     curl -o /dev/null -s -w "%{http_code} %{url_effective}\n" -L "<URL>"
     ```
   - Accept only URLs that resolve cleanly to `200`.
7. If the task includes generating local images, run `scripts/download-images.ts`.
   This script downloads, compresses, and writes `local_image_url` / `images[].local_url`.
8. Run `pnpm typecheck`.
9. If text content outside plant data was touched, run any additional relevant checks from `AGENTS.md`.

## Data shape

`Plant` is defined in `types.d.ts`.

Required fields:

```ts
{
  id: number
  japanese_name: string
  scientific_name: string
  family_id: number
  genus: string
  description: string[]
  identification: string[]
  distribution: string
  image_url: string
  images: { url: string; local_url?: string; caption: string }[]
  tags: PlantTag[]
  similar_plant_ids: number[]
}
```

Optional image helpers:

- `local_image_url?: string`
- `images[].local_url?: string`

## Notes

- `PlantTag` values must match `types.d.ts` exactly.
- Region tags such as `北海道` and `九州` exist now; use only valid values from `PlantTag`.
- Prefer repo reality over older docs if counts or examples differ.
- `docs/add-plant.md` can help, but verify IDs, counts, and family totals from the source files before editing.
