# Inc People Builder - App Template

This is the template repository used by Inc People Builder (IPB) to generate native mobile apps from web URLs using Capacitor.

## How It Works

When a new app build is triggered in IPB, the system:

1. Clones this template into a new repository for the app
2. Dispatches the `build.yml` workflow with the app's configuration as inputs
3. The workflow generates `capacitor.config.ts` from the template, syncs native projects, and builds Android/iOS binaries
4. Build artifacts (APK/IPA) are uploaded and the IPB backend is notified via callback

## Structure

- `.github/workflows/build.yml` - GitHub Actions workflow for building Android and iOS apps
- `capacitor.config.ts.template` - Template for Capacitor configuration (variable substitution via `scripts/generate-config.js`)
- `scripts/generate-config.js` - Node script that reads environment variables and generates `capacitor.config.ts`
- `package.json` - Dependencies including Capacitor core, Android, iOS, and plugins
- `dist/` - Web assets directory (populated at build time)

## Required Repository Secrets

The generated app repository must have these secrets configured:

- `CI_CALLBACK_URL` - IPB backend callback URL for build notifications
- `IPB_CI_SECRET` - Shared secret for authenticating CI callbacks
- `IOS_BUILD_CERTIFICATE_BASE64` - Apple distribution certificate (base64)
- `IOS_P12_PASSWORD` - Certificate password
- `IOS_PROVISIONING_PROFILE_BASE64` - Provisioning profile (base64)
- `APP_STORE_API_KEY_ID` - App Store Connect API key ID (for TestFlight uploads)
- `APP_STORE_API_ISSUER_ID` - App Store Connect API issuer ID
- `PLAY_STORE_SERVICE_ACCOUNT_JSON` - Google Play service account JSON (for Play Store uploads)
