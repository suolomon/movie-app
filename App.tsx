import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify from "aws-amplify";
import awsExports from './src/aws-exports'
Amplify.configure(awsExports);

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {withAuthenticator} from 'aws-amplify-react-native';

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    ); 
  }
}

export default withAuthenticator(App);
