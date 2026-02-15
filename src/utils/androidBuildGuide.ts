export const ANDROID_BUILD_GUIDE = `
# Android Code Runner - Build Guide for Android APK

## Prerequisites

### 1. Java Development Kit (JDK) 11+
- Download from: https://www.oracle.com/java/technologies/downloads/
- Or use: \`choco install openjdk\` (Windows) or \`brew install openjdk\` (Mac)
- Verify: \`java -version\`
- Set JAVA_HOME environment variable

### 2. Android SDK
- Install via Android Studio: https://developer.android.com/studio
- Or install command-line tools from: https://developer.android.com/tools/releases/cmdline-tools
- Required packages:
  - Android SDK Platform (API 21 or higher)
  - Android SDK Tools
  - Android SDK Build Tools

### 3. Android NDK
- Download version r25b or compatible
- Latest: https://developer.android.com/ndk/downloads
- Extract and note the path

### 4. Rust Toolchain
- Install from: https://rustup.rs/
- Add Android targets:
  \`\`\`bash
  rustup target add aarch64-linux-android armv7-linux-android x86_64-linux-android
  \`\`\`

### 5. Tauri CLI
- Install: \`npm install -g @tauri-apps/cli\`
- Or: \`npm install --save-dev @tauri-apps/cli\`

## Environment Setup (Windows)

Create a batch file to set environment variables:

\`\`\`batch
@echo off
REM Set Java Home
set JAVA_HOME=C:\\Program Files\\Java\\jdk-11

REM Set Android SDK Home
set ANDROID_HOME=C:\\Users\\%USERNAME%\\AppData\\Local\\Android\\Sdk

REM Set Android NDK Home
set ANDROID_NDK_HOME=C:\\Users\\%USERNAME%\\Android\\android-ndk-r25b

REM Add to PATH
set PATH=%JAVA_HOME%\\bin;%ANDROID_HOME%\\cmdline-tools\\latest\\bin;%ANDROID_HOME%\\platform-tools;%PATH%

REM Run development server
npm run tauri:android-dev
\`\`\`

## Development Build

### Debug APK (for testing on device)

\`\`\`bash
# Start dev server and build Android debug APK
npm run tauri:android-dev

# Or just build without running
tauri android build --debug
\`\`\`

This will:
1. Build the React/TypeScript frontend
2. Compile Rust backend for Android
3. Create debug APK at: \`src-tauri/target/android/debug/*.apk\`
4. Deploy to connected Android device (if available)

### Connect Android Device

\`\`\`bash
# Enable USB debugging on your Android device
# Settings > Developer options > USB debugging

# Connect via USB and verify connection
adb devices

# View logs while app runs
adb logcat
\`\`\`

## Release Build

### Prepare Release Signing Key

\`\`\`bash
# Generate keystore (one time)
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release-key

# Note: Keep this file safe! You'll need it for all future releases
\`\`\`

### Build Release APK

\`\`\`bash
# Build optimized release APK
npm run tauri:android

# APK location: src-tauri/target/android/release/*.apk
\`\`\`

### Sign APK for Distribution

\`\`\`bash
# Using jarsigner
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \\
  -keystore release-key.jks \\
  app-release.apk release-key

# Or using Android's apksigner (recommended)
apksigner sign --ks release-key.jks \\
  --ks-key-alias release-key \\
  --out app-signed.apk \\
  app-release.apk

# Verify signature
apksigner verify -verbose app-signed.apk
\`\`\`

## Testing APK

### Install on Device

\`\`\`bash
# Install debug APK
adb install path/to/debug.apk

# Uninstall
adb uninstall com.tauri.codrunner

# Launch app
adb shell am start -n com.tauri.codrunner/.MainActivity
\`\`\`

### Android Emulator

\`\`\`bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd emulator-name

# Then install APK on emulator
adb install app-debug.apk
\`\`\`

## Troubleshooting

### NDK Not Found
\`\`\`bash
# Set NDK path explicitly
set ANDROID_NDK_HOME=path/to/ndk
\`\`\`

### Gradle Build Fails
\`\`\`bash
# Clear gradle cache
rm -rf .gradle
# Rebuild
npm run tauri:android
\`\`\`

### Permission Issues
- Ensure debug mode is enabled on device
- Check USB driver installation (Windows)
- Try: \`adb kill-server && adb start-server\`

### App Crashes on Start
1. Check logs: \`adb logcat | grep -i crash\`
2. Verify Rust compilation
3. Check JavaScript console in app

## Performance Optimization for Android

- Minimize JavaScript bundle size
- Use code splitting for language runners
- Lazy load Monaco Editor
- Optimize images and assets
- Enable ProGuard/R8 minification

## Distribution

### Google Play Store

1. Create Google Play Developer account
2. Create application listing
3. Generate proper signing key
4. Build release APK with signing
5. Upload APK to Play Store
6. Review and publish

### F-Droid or APK Distribution

1. Build release APK
2. Create release notes and documentation
3. Host on your own server or alternative app store
4. Update version tracking

## Resources

- [Tauri Android Guide](https://tauri.app/docs/guides/getting-started/android/)
- [Android Developer Docs](https://developer.android.com/docs)
- [Rust for Android](https://rust-lang.github.io/rustup/cross-compilation.html)
- [Play Store Publication Guide](https://developer.android.com/studio/publish)
`

export default ANDROID_BUILD_GUIDE
