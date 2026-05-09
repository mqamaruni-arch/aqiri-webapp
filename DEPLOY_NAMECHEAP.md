# Namecheap Deployment

This site can use GitHub as the source copy and deploy automatically to Namecheap.

## Workflow

1. Codex edits files in this project.
2. Changes are committed and pushed to GitHub.
3. GitHub Actions uploads the site files to Namecheap by FTP.
4. The live website updates from the files in Namecheap hosting.

## GitHub Secrets

Add these secrets in your GitHub repository:

- `NAMECHEAP_FTP_SERVER`
- `NAMECHEAP_FTP_USERNAME`
- `NAMECHEAP_FTP_PASSWORD`
- `NAMECHEAP_FTP_DIR`

For most Namecheap shared hosting accounts, `NAMECHEAP_FTP_DIR` is similar to:

```text
/public_html/
```

If the website is inside an addon domain folder, use that folder instead, for example:

```text
/public_html/example.com/
```

## Connect This Folder to GitHub

Run these commands after creating an empty GitHub repository:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial site deploy"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

After the push, open the GitHub repository, add the secrets above, and run the `Deploy to Namecheap` workflow from the Actions tab.
