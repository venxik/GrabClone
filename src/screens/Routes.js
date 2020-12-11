import * as React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import PayScannerScreen from './PayScannerScreen';
import LandingPageScreen from './LandingPageScreen';

const ActivityScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is Activity Screen!</Text>
    </View>
  );
};

const PaymentScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is Payment Screen!</Text>
    </View>
  );
};

const MessagesScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is Messages Screen!</Text>
    </View>
  );
};

const AccountScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is Account Screen!</Text>
    </View>
  );
};

const getTabBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
};

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LandingPageBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'LandingPage':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Activity':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'Payment':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Messages':
              iconName = focused ? 'mail-sharp' : 'mail-outline';
              break;
            case 'Account':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="LandingPage"
        component={LandingPageScreen}
        options={({route}) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const Root = () => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      initialRouteName={LandingPageBottomTabs}>
      <HomeStack.Screen name="LandingPage" component={LandingPageBottomTabs} options={{headerShown: false}}/>
      <HomeStack.Screen
        name="PayScanner"
        component={PayScannerScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'Pay',
          headerLeftContainerStyle: {marginLeft: 10},
          headerBackTitleVisible: false
        }}
      />
    </HomeStack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default Routes;
