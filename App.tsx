import React, { useEffect } from 'react';
import { BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigation from './components/BottomNavigation';
import { colors } from './constants/theme';
import { AppProvider, useApp } from './context/AppContext';
import HazardDetailsScreen from './screens/HazardDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReportsScreen from './screens/ReportsScreen';
import RouteAssessmentScreen from './screens/RouteAssessmentScreen';
import SubmitReportScreen from './screens/SubmitReportScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { TabName } from './types';

const TAB_NAMES: string[] = ['Home', 'Reports', 'RouteAssess', 'Profile'];

function Navigator() {
  const { route, navigate, goBack, canGoBack } = useApp();

  // Android hardware back button goes to the previous screen.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) {
        goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack, goBack]);

  let screen: React.ReactNode;
  switch (route.name) {
    case 'Welcome': screen = <WelcomeScreen />; break;
    case 'Login': screen = <LoginScreen />; break;
    case 'Register': screen = <RegisterScreen />; break;
    case 'Home': screen = <HomeScreen />; break;
    case 'Reports': screen = <ReportsScreen />; break;
    case 'RouteAssess': screen = <RouteAssessmentScreen />; break;
    case 'Profile': screen = <ProfileScreen />; break;
    case 'HazardDetails': screen = <HazardDetailsScreen reportId={route.params?.reportId ?? ''} />; break;
    case 'SubmitReport': screen = <SubmitReportScreen />; break;
  }

  const showTabs = TAB_NAMES.includes(route.name);

  return (
    <View style={styles.root}>
      <View style={styles.screen}>{screen}</View>
      {showTabs ? (
        <BottomNavigation active={route.name} onChange={(tab: TabName) => navigate(tab)} />
      ) : null}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.card} />
      <AppProvider>
        <Navigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  screen: { flex: 1 },
});
