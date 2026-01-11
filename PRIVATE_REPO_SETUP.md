# Private Repository Setup for Hugo Modules

If your repository is **private**, Hugo modules will have trouble accessing it because Go modules use HTTPS by default and require authentication for private repositories.

## Recommended Solution: Make Repository Public

For Hugo modules to work easily, **make the repository public**:

1. Go to: https://github.com/fredricnet/paitheme/settings
2. Scroll down to **"Danger Zone"**
3. Click **"Change visibility"**
4. Select **"Make public"**
5. Confirm the change

This is the recommended approach because:
- Hugo modules work seamlessly with public repositories
- No authentication configuration needed
- Works across all environments
- Standard practice for theme distribution

## Alternative: Keep Repository Private

If you need to keep the repository private, you'll need to configure authentication:

### Option 1: Use GitHub Personal Access Token (HTTPS)

1. Create a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Generate new token with `repo` scope
   - Copy the token

2. Configure git credentials:
   ```bash
   git config --global credential.helper store
   ```

3. Add credentials to `~/.git-credentials`:
   ```
   https://YOUR_TOKEN@github.com
   ```

### Option 2: Configure SSH for Go Modules

1. Set GOPRIVATE:
   ```bash
   go env -w GOPRIVATE=github.com/fredricnet/*
   ```

2. Configure git to use SSH for GitHub:
   ```bash
   git config --global url."git@github.com:".insteadOf "https://github.com/"
   ```

   Note: This requires SSH keys to be set up for the fredricnet account (which you already have).

3. Test:
   ```bash
   cd your-website
   hugo mod get github.com/fredricnet/paitheme@v1.0.0
   ```

### Option 3: Use Local Module Replace (Development Only)

For local development, you can use module replacement:

```yaml
# hugo.yaml
module:
  imports:
    - path: github.com/fredricnet/paitheme
  replacements:
    - github.com/fredricnet/paitheme => ../pai-theme  # Relative path
```

This only works locally and won't work for deployment/CI.

## Recommendation

**Make the repository public** - it's the standard approach for Hugo themes and makes everything much simpler.
