import React from 'react';
import { ThemeProvider } from 'styled-components';
import HomeScreen from './src/screens/home';
import theme from './src/global/theme';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export default function App(): JSX.Element {
  const [isLoading] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!isLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>
  );
}
