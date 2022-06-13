1. Install React Navigation
`npm install @react-navigation/native`
`expo install react-native-screens react-native-safe-area-context`

2. Install Stack Navigator
`npm install @react-navigation/native-stack`

3. Install Tab Navigator
`npm install @react-navigation/bottom-tabs`

4. Install React Native SVG
`expo install react-native-svg`
`yarn add react-native-svg-charts`

5. Generate Client from OpenAPI Spec
`npx @openapitools/openapi-generator-cli generate -i https://paper-trading.lemon.markets/v1/openapi.json -g typescript-fetch -o src/clients/trading-api --skip-validate-spec`