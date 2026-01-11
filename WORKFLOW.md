# PAI Theme Development Workflow

This document describes the workflow for developing, testing, and publishing updates to PAI Theme.

## Development Setup

### Local Development with Demo Site

The theme includes a demo site at `examples/demo/` for testing changes:

1. Navigate to the demo site:
   ```bash
   cd examples/demo
   ```

2. Use Hugo module replace to point to local theme directory:
   ```bash
   hugo mod replace github.com/fredricnet/paitheme => ../..
   ```

3. Start the development server:
   ```bash
   hugo server
   ```

4. Open `http://localhost:1313/` in your browser

5. Make changes to theme files in the parent directory (`../..`)

6. Test changes using the demo site

### Demo Site Structure

The demo site includes self-documenting examples of all theme features:

- **Homepage** (`content/_index.md`) - Theme overview
- **Documentation** (`content/docs/`) - Docs layout examples
- **Dictionary** (`content/dictionary/`) - Glossary functionality
- **Blog** (`content/blog/`) - Blog layout examples
- **Styleguide** (`content/dev/styleguide/`) - Component showcase

## Development Workflow

### 1. Make Theme Changes

Edit theme files in the root directory:
- `layouts/` - Template files
- `static/` - CSS, JavaScript, images
- `theme.toml` - Theme metadata
- `README.md` - Documentation

### 2. Test with Demo Site

Use the demo site to test your changes:

```bash
cd examples/demo
hugo server
```

Browse all sections to verify:
- Layouts render correctly
- Styles apply properly
- JavaScript functions work
- No errors in browser console

### 3. Commit Changes

Once satisfied with changes:

```bash
# In theme root directory
git add .
git commit -m "Description of changes"
```

### 4. Push to GitHub

Push changes to the repository:

```bash
git push origin main
```

### 5. Tag New Version

Create a semantic version tag:

```bash
# Patch version (bug fixes)
git tag v1.0.1 -m "Bug fixes and improvements"
git push origin v1.0.1

# Minor version (new features)
git tag v1.1.0 -m "New features: ..."
git push origin v1.1.0

# Major version (breaking changes)
git tag v2.0.0 -m "Breaking changes: ..."
git push origin v2.0.0
```

## Versioning

PAI Theme uses [semantic versioning](https://semver.org/):

- **MAJOR** version (v2.0.0) - Breaking changes
- **MINOR** version (v1.1.0) - New features (backward compatible)
- **PATCH** version (v1.0.1) - Bug fixes (backward compatible)

### Version Tag Format

- `v1.0.0` - Initial release
- `v1.0.1` - Bug fix
- `v1.1.0` - New feature
- `v2.0.0` - Breaking changes

## Updating Websites Using the Theme

### From a Website Directory

To update a website to the latest theme version:

```bash
# Navigate to website directory
cd /path/to/website

# Update to latest version
hugo mod get -u github.com/fredricnet/paitheme
hugo mod tidy

# Test the build
hugo server
```

To update to a specific version:

```bash
hugo mod get -u github.com/fredricnet/paitheme@v1.1.0
hugo mod tidy
```

### Update Process

1. **Update module**: Run `hugo mod get -u` to fetch new version
2. **Clean dependencies**: Run `hugo mod tidy` to clean up
3. **Test locally**: Run `hugo server` to verify everything works
4. **Deploy**: Deploy as usual (build and deploy process)

**Note**: After updating, Hugo caches the new version locally. All subsequent builds use the cached version until you update again.

## Troubleshooting

### Module Not Found

If Hugo can't find the module:

1. Ensure the repository exists on GitHub
2. Check the module path is correct: `github.com/fredricnet/paitheme`
3. Verify the version tag exists (e.g., `v1.0.0`)
4. Run `hugo mod clean` to clear cache, then `hugo mod get -u`

### Changes Not Appearing

If changes don't appear after updating:

1. Clear Hugo cache: `hugo mod clean`
2. Clear vendor directory: Remove `_vendor/` if present
3. Re-download module: `hugo mod get -u`
4. Rebuild: `hugo server` or `hugo --cleanDestinationDir`

### Demo Site Not Using Local Theme

If demo site isn't using local changes:

1. Ensure module replace is set:
   ```bash
   cd examples/demo
   hugo mod replace github.com/fredricnet/paitheme => ../..
   ```
2. Verify in `hugo.yaml` that replacement is configured
3. Restart Hugo server

## Best Practices

1. **Always test with demo site** before committing changes
2. **Use semantic versioning** for all releases
3. **Write clear commit messages** describing changes
4. **Test on multiple browsers** if making CSS/JS changes
5. **Document breaking changes** in commit messages and tags
6. **Update README** if adding new features or changing behavior
7. **Keep demo site content** up to date with theme features

## Resources

- [Hugo Modules Documentation](https://gohugo.io/hugo-modules/)
- [Semantic Versioning](https://semver.org/)
- [Theme Repository](https://github.com/fredricnet/paitheme)
