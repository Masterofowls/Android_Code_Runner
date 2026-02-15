# APK Signing Guide

## Overview

The Android Code Runner APK is signed with an RSA-2048 certificate valid until July 3, 2053.

## Signing Credentials

- **Keystore File**: `android-code-runner.keystore`
- **Alias**: `android-code-runner`
- **Key Algorithm**: RSA (2048-bit)
- **Signature Algorithm**: SHA256withRSA
- **Expiration**: July 3, 2053
- **Store Password**: `coderunner123`
- **Key Password**: `coderunner123`

## Installing the APK

### Method 1: Direct Installation (Easiest)
1. Download the signed APK from the [releases page](https://github.com/Masterofowls/Android_Code_Runner/releases)
2. Connect your Android device via USB or transfer via cloud storage
3. On your phone, open the file manager and navigate to the APK
4. Tap the APK file to install
5. Grant permissions when prompted
6. Launch the app!

### Method 2: Using ADB
```bash
adb install app-universal-release-unsigned.apk
```

## Building and Signing Your Own APK

### Prerequisites
- Java JDK 17+
- Android NDK 29+
- Rust with Android targets
- Tauri CLI

### Build Release APK
```bash
npx tauri android build --release
```

### Sign the APK
```bash
# Set environment variables
$env:PATH = "C:\Users\froggy\scoop\apps\openjdk17\current\bin;$env:PATH"

# Sign the APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore android-code-runner.keystore \
  -storepass coderunner123 \
  -keypass coderunner123 \
  src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk \
  android-code-runner
```

### Verify Signature
```bash
jarsigner -verify -verbose app-universal-release-unsigned.apk
```

## Creating Your Own Keystore

If you want to create a custom keystore for your own builds:

```bash
keytool -genkey -v -keystore my-app.keystore \
  -alias my-app \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -dname "CN=My App, OU=Development, O=YourOrg, L=City, ST=State, C=CountryCode"
```

Then use it to sign your APK:
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore my-app.keystore \
  app-universal-release-unsigned.apk \
  my-app
```

## Security Notes

⚠️ **Important**: The keystore password is stored in this repository for development purposes only. For production:
1. Store the keystore in a secure location
2. Use environment variables for passwords
3. Never commit keystore files with secrets to public repositories

## Troubleshooting

**"Installation failed - App not installed"**
- Ensure you have enough storage space on your device
- Try uninstalling any previous version
- Clear the app cache from device settings

**"Signature verification failed"**
- The APK may be corrupted during transfer
- Re-download from the releases page
- Try using ADB to install instead

**"Unknown sources" permission error**
- Go to Settings > Security > Unknown Sources
- Enable installation from unknown sources
- Note: The signed APK should not require this

## References

- [Android Developer: App Signing](https://developer.android.com/studio/publish/app-signing)
- [Keytool Documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)
- [Jarsigner Documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jarsigner.html)
