# Android Code Runner - Development Instructions

## Project Overview

Advanced offline-capable code runner for Android with support for JavaScript, TypeScript, Python, C, and C++ execution. Built with React, TypeScript, Tauri, and Tailwind CSS.

## Current Status

- ✅ Project structure created
- ✅ React components scaffolded
- ✅ TypeScript configuration set up
- ✅ Tauri backend initialized
- ⏳ Dependencies installation pending
- ⏳ Build and testing pending

## Environment Setup

### Required Tools

1. **Node.js** 16+ and npm
   - Download from https://nodejs.org/
   - Verify: `node --version && npm --version`

2. **Rust** (for Tauri backend)
   - Install from https://rustup.rs/
   - Verify: `rustc --version && cargo --version`

3. **Android Setup** (for APK building)
   - Android SDK (API 21+)
   - Android NDK (r21 or newer recommended)
   - JDK 11+
   - Set `ANDROID_HOME` environment variable

4. **Git** (for version control)
   - Download from https://git-scm.com/

## Installation Steps

### 1. Install Frontend Dependencies

```bash
npm install
```

This installs:

- React 18 & React DOM
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Monaco Editor
- Zustand (state management)
- Lucide React (icons)
- And other utilities

### 2. Install Tauri Command Line

```bash
npm install -g @tauri-apps/cli@latest
# or locally
npm install --save-dev @tauri-apps/cli
```

### 3. Setup Rust for Android

```bash
# Add Android targets to Rust
rustup target add aarch64-linux-android armv7-linux-android x86_64-linux-android

# Install Android tools (if not already installed)
# These should be installed through Android Studio or SDK Manager
```

## Development Workflow

### Start Development Server

```bash
npm run dev
```

- Starts Vite dev server at http://localhost:5173
- Hot module replacement enabled
- Use for rapid development

### Type Checking

```bash
npm run type-check
```

- Verify TypeScript compilation
- Should run before commits

### Linting

```bash
npm run lint
```

- Check code quality
- Fix issues according to ESLint rules

### Code Formatting

```bash
npm run format
```

- Format code with Prettier
- Run before commits for consistency

### Build for Web

```bash
npm run build
npm run preview
```

- Creates optimized production build
- Preview at http://localhost:4173

## Android Development

### Set Up Android Development

1. Download Android SDK via Android Studio
2. Download Android NDK (r25b or compatible)
3. Set environment variables:
   ```
   ANDROID_HOME=/path/to/android/sdk
   JAVA_HOME=/path/to/jdk
   ```

### Development Mode on Android

```bash
npm run tauri:android-dev
```

- Builds debug APK
- Deploys to connected device
- Hot reload on code changes

### Build Release APK

```bash
npm run tauri:android
```

- Creates optimized release APK
- Output: `src-tauri/target/release/*.apk`
- Ready for distribution

## Project Structure

### Frontend (`src/`)

- `components/` - React components (CodeEditor, Toolbar, etc.)
- `hooks/` - Custom React hooks (useCodeStore)
- `utils/` - Utilities (executor, language runners)
- `types/` - TypeScript interfaces
- `App.tsx` - Main application component
- `index.css` - Global styles

### Backend (`src-tauri/`)

- `src/lib.rs` - Rust backend
- `Cargo.toml` - Rust dependencies
- `tauri.conf.json` - Tauri configuration
- `android/` - Android-specific files (generated)

### Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS theme
- `postcss.config.js` - PostCSS configuration
- `package.json` - Node dependencies and scripts

## Code Style Guidelines

### TypeScript

- Use strict mode enabled
- Always define function parameter types
- Use interfaces for component props
- Import types with `type` keyword

### React

- Use functional components
- Use hooks for state management
- Prefer composition over inheritance
- Use Tailwind CSS for styling

### File Naming

- Components: PascalCase (CodeEditor.tsx)
- Utils/Hooks: camelCase (useCodeStore.ts)
- Types: camelCase (language.ts)

## Common Tasks

### Adding a New Component

1. Create file in `src/components/ComponentName.tsx`
2. Define TypeScript interface for props
3. Export as default
4. Import in App.tsx or parent component

### Adding a New Language Runner

1. Create file in `src/utils/runners/language.ts`
2. Implement `execute[Language]()` function
3. Add to executor.ts switch statement
4. Update LANGUAGE_CONFIG in languageConfig.ts

### Debugging

#### Browser DevTools

- Open in development: Ctrl+Shift+I (Windows/Linux) or Cmd+Opt+I (Mac)
- Check Console tab for errors
- Use Elements tab to inspect DOM

#### VS Code Debugging

- Use Chrome Debugger extension
- Set breakpoints in Editor
- Debug Tab to run with breakpoints

#### Tauri Debugging

- Use `tauri:android-dev` for verbose output
- Check logcat: `adb logcat`
- Android Studio Debugger for native issues

## Building for Production

### Web Deployment

```bash
npm run build
# Deploy the 'dist' folder to any static host
```

### Android APK Release

```bash
npm run tauri:android
# Sign APK for Play Store submission
# Follow Google Play guidelines
```

## Troubleshooting

### Dependencies Install Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### TypeScript Errors

```bash
npm run type-check
# Fix errors before building
```

### Build Fails on Android

1. Verify Android SDK is installed
2. Check `ANDROID_HOME` environment variable
3. Update NDK to compatible version
4. Run: `rustup update && rustup target add aarch64-linux-android`

### Monaco Editor Not Loading

- Ensure CDN or local copy is available
- Check browser console for script errors
- Fallback: Using textarea (currently implemented)

## Performance Optimization

- Code splitting enabled in Vite
- Lazy loading of language runtimes
- Tree-shaking for unused code
- Minification in production builds
- Responsive images and assets

## Testing

### Unit Tests (to be added)

```bash
# When test framework is added
npm run test
npm run test:coverage
```

### E2E Tests (to be added)

```bash
# When E2E framework is added
npm run test:e2e
```

## Git Workflow

```bash
# Before committing
npm run format  # Format code
npm run lint    # Check linting
npm run type-check # Verify types

git add .
git commit -m "feat: description of changes"
git push origin feature-branch
```

## Resources

- [Tauri Docs](https://tauri.app/docs/)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Rust Book](https://doc.rust-lang.org/book/)

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run build`
3. ✅ Test with `npm run dev`
4. ⏳ Add Python support (Pyodide)
5. ⏳ Add C/C++ support (Emscripten or backend)
6. ⏳ Add file management
7. ⏳ Add project persistence
8. ⏳ Add dark/light theme toggle

## Support & Issues

For issues or feature requests:

1. Check GitHub issues for similar problems
2. Check troubleshooting section above
3. Create detailed issue with:
   - Description of problem
   - Steps to reproduce
   - Error messages/logs
   - System info (OS, Node version, etc.)
