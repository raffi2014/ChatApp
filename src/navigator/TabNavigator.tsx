import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from '../views/HomeTab';
import SettingsTab from '../views/SettingsTab';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,
      tabBarInactiveTintColor: 'black',
      tabBarActiveTintColor: 'orange', }}>
        <Tab.Screen name='HomeTab' component={HomeTab} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <Icon
            name="home"
            color={color}
            size={size} />,
        }}/>  
        <Tab.Screen name='SettingsTab' component={SettingsTab} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => <Icon
            name="settings"
            color={color}
            size={size} />,
        }}/>
        <Tab.Screen name='ProfileTab' component={SettingsTab} options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({color, size}) => <Icon
            name="image"
            color={color}
            size={size} />,
        }}/>
    </Tab.Navigator>
  )
};