# Shadow Clash

Shadow Clash is an **offline Android game built with Expo / React Native and EAS Build**. It is not intended to be played in a browser.

## Build an Android APK

1. Connect this repository to EAS Build.
2. Select the `main` branch.
3. Select the `preview` build profile.
4. EAS will produce an installable Android APK.

The `preview` profile is configured for APK output. The `production` profile is configured for an Android App Bundle (AAB).

## Project

- Expo SDK 58
- React Native 0.88
- Landscape orientation
- Offline-first; no account or sign-in required
- EAS configuration in `eas.json`

The current native app is the initial Expo foundation. Full fighting gameplay, animations, character progression, and local save data still need to be developed.
