# Workout Tracker React Native App

This React Native application serves as the frontend for the Workout Tracker project, which is designed to log workouts
and exercises per user to track their fitness progress. Please note that this frontend primarily supports iOS, with
minimal testing done for Android.

## Backend API

This frontend application communicates with the backend GraphQL API for logging workouts and exercises. For more
information about the backend API, including its technology stack, authentication, and deployment, please refer to
the [Workout Tracker Backend README](https://github.com/Kaediin/workout-progress).

## Dependencies

The project relies on the following dependencies:

### Main Dependencies (included in `dependencies`):

- **@apollo/client**: Apollo Client for GraphQL communication.
- **@gorhom/bottom-sheet**: A customizable and responsive bottom sheet component.
- **@react-native-async-storage/async-storage**: AsyncStorage for storing data locally.
- **@react-native-community/netinfo**: Network information for React Native.
- **@react-native-picker/picker**: Picker component for React Native.
- **@react-navigation/material-bottom-tabs**: Material design bottom tabs for React Navigation.
- **@react-navigation/native**: Core navigation library for React Navigation.
- **@react-navigation/native-stack**: Stack navigation for React Navigation.
- **@sentry/react-native**: Sentry for issue tracking.
- **amazon-cognito-identity-js**: Amazon Cognito SDK for user authentication.
- **apollo-link-queue**: Apollo Link Queue for batching GraphQL requests.
- **aws-amplify**: AWS Amplify for serverless backend integration.
- **aws-amplify-react-native**: AWS Amplify for React Native integration.
- **graphql**: GraphQL library.
- **jwt-decode**: JWT token decoding library.
- **moment**: Library for handling dates and times.
- **react**: React library.
- **react-native**: React Native library.
- **react-native-config**: Environment variables for React Native.
- **react-native-context-menu-view**: Context menu view for React Native.
- **react-native-dropdown-picker**: Dropdown picker for React Native.
- **react-native-exception-handler**: Exception handling for React Native.
- **react-native-gesture-handler**: Gesture handling for React Native.
- **react-native-keychain**: Keychain access for React Native.
- **react-native-linear-gradient**: Linear gradient for React Native.
- **react-native-modal**: Modal component for React Native.
- **react-native-paper**: Material design for React Native.
- **react-native-radio-buttons-group**: Radio buttons group for React Native.
- **react-native-reanimated**: Reanimated for React Native.
- **react-native-safe-area-context**: Safe area context for React Native.
- **react-native-screens**: Native screens for React Native.
- **react-native-svg**: SVG library for React Native.
- **react-native-vector-icons**: Vector icons for React Native.
- **zustand**: State management library.

### Development Dependencies (included in `devDependencies`):

- **@babel/core**: Babel core for JavaScript compilation.
- **@babel/preset-env**: Babel preset for JavaScript compilation.
- **@babel/runtime**: Babel runtime for JavaScript compilation.
- **@graphql-codegen/cli**: GraphQL code generation CLI.
- **@graphql-codegen/schema-ast**: GraphQL schema AST for code generation.
- **@graphql-codegen/typescript**: TypeScript code generation for GraphQL.
- **@graphql-codegen/typescript-operations**: TypeScript operations code generation for GraphQL.
- **@graphql-codegen/typescript-react-apollo**: TypeScript React Apollo code generation for GraphQL.
- **@react-native-community/eslint-config**: ESLint configuration for React Native.
- **@tsconfig/react-native**: TypeScript configuration for React Native.
- **@types/jest**: TypeScript types for Jest.
- **@types/react**: TypeScript types for React.
- **@types/react-test-renderer**: TypeScript types for React Test Renderer.
- **babel-jest**: Babel Jest for JavaScript compilation.
- **eslint**: ESLint for linting JavaScript code.
- **jest**: Jest for JavaScript testing.
- **metro-react-native-babel-preset**: Metro React Native Babel preset.
- **prettier**: Prettier for code formatting.
- **react-test-renderer**: React Test Renderer for React Native.
- **typescript**: TypeScript for type-checking and compiling.

## Getting Started

Follow these steps to get started with the Workout Tracker React Native App:

1. Clone the repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies using npm or yarn.

   ```bash
   npm install
   # or
   yarn install
   ```

3. Install the POD's required by this project.
   ```bash
   cd ios && pod install && cd ../
   ```

4. Run the application on an iOS simulator or device.

   ```bash
   npx react-native run-ios
   ```

   For Android, you can use:

   ```bash
   npx react-native run-android
   ```

## Usage

This React Native app interacts with the Workout Tracker GraphQL API. Users can log workouts, exercises, and track
fitness progress through the app's user-friendly interface. More details on how to use the app and navigate its features
will be provided in the future.

## Contribution Guidelines

Contributions to this project are welcome! If you'd like to contribute, please follow these guidelines:

- Fork the repository and create a new branch for your feature or bug fix.
- Ensure that your code adheres to the project's coding standards.
- Write clear and concise commit messages.
- Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact Information

If you have any questions or need further assistance, you can contact the developer at **skaedin@gmail.com**.

Thank you for using the Workout Tracker React Native App! I hope you find it helpful in achieving your fitness goals.