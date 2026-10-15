---
name: teslinha-suporte
description: Use when working in the Teslinha Suporte repository on branding, company materials, marketing images, documentation, or Instagram publishing assets.
---

# Teslinha Suporte

Apply these project conventions to work in this repository.

## Project context

- Read `README.md` and the relevant file in `docs/` before making brand or company-content decisions.
- Keep logos in `assets/logo/`, marketing artwork in `assets/marketing/`, and institutional documents in `docs/`.
- Treat `assets/referencias/` as the visual reference library for future marketing pieces.
- Preserve the existing Teslinha visual language: dark navy backgrounds, electric blue, light blue, white, and the lightbulb/notebook/swoosh logo.
- Keep credentials in the local `.env`; never copy secrets into documentation, image prompts, commits, or public URLs.

## Reference visual direction

Before generating a new marketing image, inspect the relevant files in `assets/referencias/` and use them as layout and design references, not as content to copy.

- Prefer a square 1:1 composition with a clean white or very light background and restrained light-blue shapes.
- Lead with one concrete customer problem in a large, bold headline using accessible Portuguese; avoid technical jargon such as API, backend, or cloud.
- Use a short explanatory sentence below the headline, then one clear visual subject that illustrates the problem or solution.
- Use strong blue and dark navy typography, generous whitespace, and a large realistic device, component, or service scene in the lower or right area.
- Use a sweeping electric-blue arc inspired by the logo as a framing element, without making the layout busy.
- Place the Teslinha logo near the bottom, with enough clear space for legibility.
- Keep each piece focused on one problem and one message. Avoid dense dashboards, many icons, excessive glow, or multiple competing calls to action.
- When using ImageGen, pass selected reference files with the explicit role `reference image` and the logo with the role `brand reference`; preserve the logo identity and create original imagery.

## Feed captions

Every image published to the Instagram feed must include a caption unless the user explicitly requests a captionless post.

- Write in clear Brazilian Portuguese with a persuasive but trustworthy tone.
- Start with the customer's problem or desired outcome, then explain the benefit and finish with a practical call to action.
- Include relevant search terms naturally, such as the service name, audience, and problem being solved; never use keyword stuffing or unrelated trends.
- Prefer specific phrases that match the artwork and company scope, such as `software de gestão`, `sistema de gestão`, `pequenos negócios`, `empreendedores`, `clientes`, `vendas` and `tarefas`.
- Use only claims supported by `docs/empresa.md`; do not promise fixed prices, deadlines, certifications, guarantees, or features that were not confirmed.
- Add a small set of relevant hashtags only when they improve discovery. Keep the caption easy to scan with short paragraphs and a clear CTA.

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

## Instagram formats

- Feed posts should use the format requested by the user; square `1:1` is the default when no feed format is specified.
- Stories must always be generated as vertical `9:16`, preferably `1080x1920` pixels. Never send a square feed artwork to Stories without creating a dedicated vertical version.
- Keep the headline, supporting text, logo, and CTA inside the central safe area. Leave generous space near the top and bottom for Instagram's profile header, progress bar, reply field, and action controls.
- Check the final 9:16 image at phone scale before publishing to confirm that no text or logo is cropped or hidden by the interface.
