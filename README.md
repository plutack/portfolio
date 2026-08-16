# Portfolio

Personal portfolio for Talut Salako, built with Next.js and statically exported for deployment.

## Development

```bash
npm install
npm run dev
```

Create a production export with:

```bash
npm run build
```

The generated static site is written to `out/`.

Set `NEXT_PUBLIC_GA_ID` when you want Google Analytics enabled. Analytics is omitted when the variable is unset.

## Content

- Add projects as Markdown files in `_content/projects/`.
- Add experience entries as Markdown files in `_content/exp/`.
- Update `_content/skills.json`, `_content/socials.json`, and `_content/email.json` for profile data.

Project and experience frontmatter is validated during the build. Project image paths must reference existing files under `public/`.

## Docker

The Docker image builds the static export and serves `out/` with nginx on port `8080`:

```bash
docker build -t portfolio .
docker run --rm -p 8080:8080 portfolio
```
