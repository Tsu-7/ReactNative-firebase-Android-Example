/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/view/home/Home';
import Login from './src/view/login/Login';
import Register from './src/view/register/Register';
import { Provider } from 'react-redux';
import analytics from "@react-native-firebase/analytics";

import store from './src/reducer/reducerConfig';

const Stack = createStackNavigator();

const App = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  return (
    <Provider store={store}>
    <NavigationContainer
      ref={navigationRef}
      onStateChange={async (state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
    
        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="RegisterScreen" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
