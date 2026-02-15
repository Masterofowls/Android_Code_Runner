# Documentation Index

Welcome to the Android Code Runner documentation! Here's a complete guide to all available resources.

## 📚 Main Documentation

### [README.md](./README.md) - **START HERE**
Complete project overview including:
- Features and capabilities
- Technology stack
- Project structure
- Installation instructions
- Development workflow
- Building for Android
- Offline functionality
- Future enhancements

### [QUICKSTART.md](./QUICKSTART.md) - **5-MINUTE SETUP**
Get started in 5 minutes:
- Quick installation
- Essential commands
- Keyboard shortcuts
- Quick troubleshooting
- Next steps

### [SETUP.md](./SETUP.md) - **DETAILED GUIDE**
Comprehensive setup and development guide:
- Prerequisites and installation
- Environment variable setup
- Development workflow
- Project structure breakdown
- Android development guide
- Building APKs
- Troubleshooting
- Performance optimization
- Deployment checklist

### [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - **PROJECT OVERVIEW**
Executive summary of what's been built:
- Complete feature list
- Technology stack details
- Architecture overview
- Quick start commands
- Next steps and roadmap
- Performance metrics
- Security notes

## 🔧 Developer Guides

### [.github/copilot-instructions.md](./.github/copilot-instructions.md)
Development environment setup and guidelines:
- Current project status
- Environment requirements
- Installation steps
- Development workflow
- Project structure
- Code style guidelines
- Common tasks
- Debugging tips
- Building for production
- Troubleshooting

## 📂 Source Code Organization

```
src/
├── components/           # React UI components
│   ├── CodeEditor.tsx   # Code input component
│   ├── OutputConsole.tsx # Results display
│   ├── LanguageSelector.tsx # Language selector
│   ├── Toolbar.tsx      # Action buttons
│   └── SettingsPanel.tsx # User settings
│
├── hooks/               # Custom React hooks
│   ├── useCodeStore.ts  # State management
│   ├── useKeyboardShortcuts.ts # Keyboard input
│   └── useAppSettings.ts # Settings persistence
│
├── utils/               # Utility functions
│   ├── executor.ts      # Code execution
│   ├── runners/         # Language-specific runners
│   ├── languageConfig.ts # Language config
│   ├── shortcuts.ts     # Keyboard shortcuts
│   ├── highlighter.ts   # Syntax highlighting
│   └── androidBuildGuide.ts # Android guide
│
├── types/               # TypeScript definitions
│   └── language.ts      # Type definitions
│
├── App.tsx              # Main app component
├── main.tsx             # React entry point
└── index.css            # Global styles
```

## 🚀 Quick Commands

### Development
```bash
npm run dev              # Start dev server
npm run type-check       # Check types
npm run lint             # Check code quality
npm run format           # Format code
npm run build            # Production build
```

### Android
```bash
npm run tauri:android-dev    # Build & deploy debug APK
npm run tauri:android        # Build release APK
```

## 🎯 Common Tasks

### I want to...

**Start developing locally**
→ See: [QUICKSTART.md](./QUICKSTART.md#5-minute-setup)

**Build for Android**
→ See: [SETUP.md](./SETUP.md#building-for-android)

**Understand the project structure**
→ See: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md#-project-structure)

**Fix a build error**
→ See: [SETUP.md](./SETUP.md#troubleshooting)

**Add a new language**
→ See [README.md](./README.md#language-support-details) & code comments

**Deploy to Play Store**
→ See: [SETUP.md](./SETUP.md#deployment-checklist)

**Understand the tech stack**
→ See: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md#-technology-stack)

**Set up environment variables**
→ See: [SETUP.md](./SETUP.md#2-set-environment-variables)

**Add Python or C++ support**
→ See: [README.md](./README.md#language-support-details)

## 📋 Project Status

✅ **Completed**
- React + TypeScript setup
- All UI components
- State management
- Keyboard shortcuts
- Settings panel
- Code execution engine
- JavaScript/TypeScript execution
- Offline support
- Responsive design
- Build configurations

🔄 **Ready for Enhancement**
- Python via Pyodide
- C/C++ via Emscripten
- Monaco Editor integration
- Advanced syntax highlighting
- Code templates
- File management

## 🔑 Key Files

| File                        | Purpose                      |
| --------------------------- | ---------------------------- |
| `package.json`              | npm dependencies and scripts |
| `tsconfig.json`             | TypeScript configuration     |
| `vite.config.ts`            | Vite build configuration     |
| `tailwind.config.js`        | Tailwind CSS configuration   |
| `src/App.tsx`               | Main application component   |
| `src/utils/executor.ts`     | Code execution logic         |
| `src-tauri/src/lib.rs`      | Rust backend                 |
| `src-tauri/Cargo.toml`      | Rust dependencies            |
| `src-tauri/tauri.conf.json` | Tauri Android configuration  |

## 🎓 Learning Resources

### Official Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tauri Guide](https://tauri.app/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/)
- [Android Developers](https://developer.android.com/)

### Language Runtime Options
- [Pyodide: Python in Browser](https://pyodide.org/)
- [Emscripten: C/C++ Compiler](https://emscripten.org/)
- [Lucide Icons](https://lucide.dev/)
- [Zustand State Library](https://zustand-demo.vercel.app/)

## 💬 FAQ

**Q: Where do I start?**
A: Read [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup, then [README.md](./README.md) for full details.

**Q: How do I build an APK?**
A: See [SETUP.md - Building for Android](./SETUP.md#building-for-android) section.

**Q: Where are the components?**
A: All components are in `src/components/` - each is a separate `.tsx` file.

**Q: How do I add Python support?**
A: See [README.md - Language Support](./README.md#language-support-details) and `src/utils/runners/python.ts`.

**Q: Is there offline support?**
A: Yes! JavaScript/TypeScript execution works completely offline. See [README.md - Offline Functionality](./README.md#offline-functionality).

**Q: Can I modify the UI?**
A: Yes! All code is in `src/` and uses React + Tailwind CSS which is fully customizable.

## 📞 Support

For issues or questions:
1. Check relevant documentation section
2. Review [SETUP.md - Troubleshooting](./SETUP.md#troubleshooting)
3. Check inline code comments
4. Review component implementations

## 📝 Version Info

- **Version**: 1.0.0
- **Last Updated**: February 2026
- **Status**: Production Ready ✅
- **License**: MIT

---

**Happy coding!** 🚀

Start with [QUICKSTART.md](./QUICKSTART.md) or [README.md](./README.md) depending on your needs.
