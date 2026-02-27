export const reactNativeTemplates = {
  //* README File
  "README.md": `# React Native Mobile App

### Starting the Development Server
1. Clone the repository:
   git clone <repository-url>

2. Navigate to the project directory:
    cd <project-directory>
    
3. Install dependencies:
    npm install

4. Start the development server:
    npx expo start
`,

  //* App.js File
  "src/App.js": `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
    
export default function App() {
    return (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
    );
}`,

  //* AppNavigator.js File
  "src/navigation/AppNavigator.js": `import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}
`,
};
