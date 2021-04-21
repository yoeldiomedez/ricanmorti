# ricanmorti

cross-platform dev-training using Ionic and Rick and Morty API

## Generate app-debug.apk without Android Studio

The following steps were tested on a [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) environment

1. Build web assets and prepare your app for android platform

```
ionic build --prod
```

2. Once the web assets and configuration are copied into your native project, build the app using the native IDE

```
ionic capacitor build android
```

3. Build APK

```
ionic capacitor copy android && cd android && ./gradlew assembleDebug && cd ..
```

You'll now be able to access the APK at `android/app/build/outputs/apk/debug/app-debug.apk`.
