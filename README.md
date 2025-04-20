
# Track It All - Expense Tracker App

A mobile application for tracking expenses and analyzing spending patterns.

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- Android Studio (for Android builds)
- Xcode (for iOS builds, Mac only)

### Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```

3. Build the web assets:
```
npm run build
```

4. Sync with Capacitor:
```
npx cap sync
```

### Running on Android

```
npx cap open android
```

Then build and run from Android Studio.

### Running on iOS (Mac only)

```
npx cap open ios
```

Then build and run from Xcode.

### Troubleshooting WebView Issues

If you encounter "Webpage not available" errors:

1. Make sure you have published your app at the URL specified in `capacitor.config.ts`
2. Ensure your device has internet access
3. Check that the URL in the configuration is accessible
4. For development, you can build with:
```
npm run build && npx cap sync && npx cap open android
```

