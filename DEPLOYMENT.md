# AQIRI Deployment

This site is set up to deploy automatically from GitHub Pages.

## Publish flow

1. Update files locally in this project.
2. Push changes to the `main` branch of the GitHub repository.
3. GitHub Actions runs `.github/workflows/deploy-pages.yml`.
4. GitHub Pages publishes the site using the custom domain in `CNAME`.

## Required GitHub repo settings

In the GitHub repository:

1. Go to `Settings -> Pages`.
2. Under `Build and deployment`, set `Source` to `GitHub Actions`.

## Required Namecheap DNS settings

In Namecheap for `aqiri.org`, point the domain to GitHub Pages:

- `A` record for `@` -> `185.199.108.153`
- `A` record for `@` -> `185.199.109.153`
- `A` record for `@` -> `185.199.110.153`
- `A` record for `@` -> `185.199.111.153`
- `CNAME` record for `www` -> `<your-github-username>.github.io`

Replace `<your-github-username>` with the GitHub account or organization serving the Pages site.

## Notes

- `CNAME` is already included in this project for `aqiri.org`.
- The site is static, so no build command is required.
- Once the repo is connected and DNS is updated, future pushes to `main` will redeploy the live site automatically.
