# Deemix - Claude Context

## Project Overview

Fork of bambanah/deemix with mobile responsive UI improvements and custom CI/CD pipeline.

## Mobile UI Work

### What's Been Done

- **Hamburger menu**: Sidebar opens as overlay on mobile (<768px)
- **Download FAB**: Floating action button opens bottom sheet for downloads
- **Footer buttons**: Full-width stacked buttons on artist/tracklist pages
- **Tab scrolling**: Horizontal scroll for tabs on narrow screens
- **Safe area handling**: Attempted `env(safe-area-inset-bottom)` - doesn't work for browser UI bars

### Key Files Modified

- `packages/webui/src/client/App.vue` - Hamburger button, mobile layout
- `packages/webui/src/client/components/TheSidebar.vue` - Mobile overlay mode
- `packages/webui/src/client/components/downloads/TheDownloadBar.vue` - FAB + bottom sheet
- `packages/webui/src/client/stores/appInfo.ts` - Mobile UI state (isMobileSidebarOpen, isMobileDownloadsOpen)
- `packages/webui/src/client/styles/css/global.css` - Mobile footer styles
- `packages/webui/src/client/components/TheContent.vue` - Main scroll container
- `packages/webui/index.html` - viewport-fit=cover

### Known Issues

- **Arc browser (iOS)**: Bottom browser bar covers content. `env(safe-area-inset-bottom)` only reports physical safe areas (notches), not browser UI. Current workaround: 1.5rem bottom padding on footer - compromise between wasted space and coverage.
- **Container width**: Main content uses 95% width container. Footer uses negative margins + 100vw to break out for full-width buttons.

### CSS Breakpoint

- Mobile: `max-width: 767px`
- Desktop: `min-width: 768px` (uses `md:` Tailwind prefix)

## CI/CD Pipeline

### Workflow

1. Push to main with changeset file
2. GitHub Action runs `pnpm changeset version` (bumps versions, updates CHANGELOGs)
3. Commits version bump with `--no-verify` (skips hooks in CI)
4. Builds Docker image tagged with version from package.json
5. Pushes to Docker Hub (rjhilgefort/deemix)
6. Deploys to Portainer via portainer-stack-redeploy action

### Git Hooks

- **pre-push**: Requires changeset file before pushing to main
- **commit-msg**: Conventional commits with allowed scopes: deezer-sdk, deemix, cli, webui, gui, repo

### Remotes

- `origin`: rjhilgefort/deemix (fork)
- `upstream`: bambanah/deemix (original)

## PR Against Upstream

PR #267: https://github.com/bambanah/deemix/pull/267
Branch: `feat/mobile-responsive-ui`

## Dev Commands

```bash
pnpm install
pnpm build        # Build all packages first
pnpm dev          # Start dev server at localhost:6595
pnpm changeset    # Create changeset before pushing
```

## Environment

Dev server runs at `http://localhost:6595`
Config dirs: `dev-config/` and `dev-downloads/` (gitignored)
