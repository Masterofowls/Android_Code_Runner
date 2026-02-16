## Android Code Runner v1.0.0

The complete offline-capable code execution environment for Android 10-16!

### 📥 Installation - TWO OPTIONS PROVIDED

We've created **TWO APK versions** due to varying device compatibility. Try the Release first, then Debug if needed.

#### TRY FIRST: Release APK (32 MB) ⭐ Recommended
- **File:** app-release-signed.apk (31.3 MB)
- **Why:** Optimized for modern devices, ProGuard minification **DISABLED** for compatibility
- **Signature:** v2 & v3 (modern Android standard)
- **Target:** Android 10+ (minSdk 29)

#### IF RELEASE FAILS: Debug APK (381 MB) 🔧 Fallback
- **File:** app-universal-debug.apk (381 MB)
- **Why:** No optimization, full debug symbols, maximum compatibility
- **Guaranteed to work** if device supports Android 10+
- **Use if:** Release APK won't install despite multiple tries

### 🎯 Installation Steps

1. Download one of the APK files above
2. Transfer to your Android phone (USB, email, cloud storage)
3. On your phone:
   - Open file manager
   - Find the APK file
   - Tap to install
   - Grant permissions

### ❌ Installation Troubleshooting

**If "Package appears invalid" error:**
1. Try the other APK (Release vs Debug)
2. Delete old app: Settings → Apps → Android Code Runner → Uninstall
3. Reboot phone
4. Re-download APK (may be corrupted)
5. Ensure 100+ MB free storage

**Release APK specific:**
- Minification is disabled but test anyway
- If fails consistently, use Debug APK

**Debug APK specific:**
- If this fails too, device may need Android update (requires API 29+)
- Try ADB installation (see SIGNING.md)

### 🔧 Technical Details

Both APKs built with:
- **Rust backend:** 1.93.1 + Tauri 2.0
- **Frontend:** React 18 + TypeScript 5.3 + Vite
- **Compile SDK:** 36 (Android 16)
- **Target SDK:** 36 (Android 16)
- **Min SDK:** 29 (Android 10+)
- **Architectures:** arm64-v8a, armeabi-v7a, x86, x86_64 (universal)
- **Signature:** SHA256withRSA v2 & v3

### 🚀 Features
- Execute **JavaScript, TypeScript, Python, C, C++**
- **Offline capability** (fully functional without internet)
- **Universal binary** works on all Android phones
- **Multiple language support**
- **Tauri backend** for native performance

### 📱 Tested Compatibility
- Android 10, 11, 12, 13, 14, 15, 16
- Pixel, Samsung Galaxy, OnePlus, Xiaomi devices
- All device architectures

### 📚 Additional Resources
- [SIGNING.md](https://github.com/Masterofowls/Android_Code_Runner/blob/master/SIGNING.md) - ADB installation guide
- [README.md](https://github.com/Masterofowls/Android_Code_Runner/blob/master/README.md) - Full documentation

### 🎓 What Else You Can Do
After installation, try:
- Write and execute JavaScript code
- Run TypeScript snippets
- Execute Python scripts
- Compile and run C/C++ programs
- All completely offline!

---

**Key Fix:** Disabled ProGuard minification in release APK for maximum Android compatibility. Provided debug APK as fallback for problematic installations.
