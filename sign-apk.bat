@echo off
REM Sign APK using apksigner
setlocal enabledelayedexpansion

set APKSIGNER=C:\Users\froggy\AppData\Local\Android\Sdk\build-tools\34.0.0\apksigner.bat
set KEYSTORE=android-code-runner.keystore
set KS_PASS=coderunner123
set KEY_PASS=coderunner123
set INPUT=src-tauri\gen\android\app\build\outputs\apk\universal\release\app-universal-release-unsigned.apk
set OUTPUT=src-tauri\gen\android\app\build\outputs\apk\universal\release\app-release-signed.apk

echo Signing APK...
call "%APKSIGNER%" sign --ks "%KEYSTORE%" --ks-pass "pass:%KS_PASS%" --key-pass "pass:%KEY_PASS%" --out "%OUTPUT%" "%INPUT%"

if !errorlevel! equ 0 (
    echo.
    echo Success! Signed APK created at:
    echo %OUTPUT%
    dir "%OUTPUT%"
) else (
    echo Error: APK signing failed!
    exit /b 1
)
