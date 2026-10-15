---
name: teslinha-suporte
description: Use when working in the Teslinha Suporte repository on branding, company materials, marketing images, documentation, or Instagram publishing assets.
---

# Teslinha Suporte

Apply these project conventions to work in this repository.

## Project context

- Read `README.md` and the relevant file in `docs/` before making brand or company-content decisions.
- Keep logos in `assets/logo/`, marketing artwork in `assets/marketing/`, and institutional documents in `docs/`.
- Preserve the existing Teslinha visual language: dark navy backgrounds, electric blue, light blue, white, and the lightbulb/notebook/swoosh logo.
- Keep credentials in the local `.env`; never copy secrets into documentation, image prompts, commits, or public URLs.

## Generated images

Whenever an image is generated for this project:

1. Save the final project asset under `assets/marketing/` unless the user specifies another appropriate asset folder.
2. Use the creation timestamp in the `America/Sao_Paulo` timezone and this filename format:

   ```text
   YYYY-MM-DD_HH-mm-ss_descricao-curta_vNN.ext
   ```

   Example: `2026-10-15_18-30-00_desenvolvimento-sistemas_v01.png`.
3. Use lowercase ASCII slugs separated by hyphens; keep the extension that matches the actual file format.
4. Start at `v01` and increment the version when creating a related variation. Never overwrite an existing asset.
5. Inspect the generated image before delivery and confirm that the logo, text, composition, and intended format are correct.
6. Report the exact saved path and filename in the final response.

Existing assets do not need to be renamed retroactively unless the user asks for a migration.
