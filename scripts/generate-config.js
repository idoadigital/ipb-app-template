const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, '..', 'capacitor.config.ts.template');
const OUTPUT_PATH = path.join(__dirname, '..', 'capacitor.config.ts');

const ENV_VARS = [
  'APP_NAME',
  'IOS_BUNDLE_ID',
  'ANDROID_PACKAGE_NAME',
  'START_URL',
  'ALLOWED_DOMAINS',
  'NAVIGATION_MODE',
  'OPEN_EXTERNAL_IN_BROWSER',
  'OFFLINE_FALLBACK',
  'STATUS_BAR_STYLE',
  'PRIMARY_COLOR',
  'APP_VERSION',
  'IOS_BUILD_NUMBER',
  'ANDROID_VERSION_CODE',
];

function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Template file not found: ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  let template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  for (const varName of ENV_VARS) {
    const value = process.env[varName] || '';
    template = template.replace(new RegExp(`\\$\\{${varName}\\}`, 'g'), value);
  }

  fs.writeFileSync(OUTPUT_PATH, template, 'utf-8');
  console.log(`Generated ${OUTPUT_PATH}`);
}

main();
