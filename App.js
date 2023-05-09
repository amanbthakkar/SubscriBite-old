import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
const Stack = createNativeStackNavigator();

function AuthStack() {
  //this is the stuff that is displayed prior to the user being authenticated
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  //this is the stuff that is displayed after the user is authenticated
  // we do not need to show login screens and all once this is done
  // you only render this Navigator if a certain condition is met (ie logged in user)
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      {!authCtx.isRegistered ? (
        <Stack.Screen name='UserDetail' component={UserDetailScreen} />
      ) : (
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
      )}
      {/* <Stack.Screen name='UserDetail' component={UserDetailScreen} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} /> */}
    </Stack.Navigator>
  );
}

function Navigation() {
  // now we can use useContext() to tap into the context part
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  // we move the authcontextprovider stuff into this container
  return (
    <>
      <StatusBar style='light' />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
