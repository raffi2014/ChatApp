import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const NAV_ITEMS: any[] = [
  { label: 'Account', icon: 'settings' },
  { label: 'Messages', icon: 'chat', routeKey: 'chat' },
  {
    label: 'Help',
    icon: 'support'
  },
  { label: 'Feedback', icon: 'help' },
  { label: 'Invite', icon: 'group' },
  { label: 'Rate the app', icon: 'share' },
  { label: 'About Us', icon: 'info' },
];

const NavItemRow: React.FC<any> = props => {

  const navigation = useNavigation<any>();
  const {
    label,
    icon,
  } = props;

  const navigateTo = () => {
    navigation.navigate("Chat");
  };

  const window = useWindowDimensions();
  const rowWidth = window.width;

  return (
    <Pressable
    {...props}
    onPress={navigateTo}
  >
      <Animated.View
        style={[
          styles.userRowbackViewStyle,
          {
            width: rowWidth,
          }
        ]}
      />
      <View style={styles.userRowContentContainer}>
          <Icon name={icon} size={24} color={'black'} />
        <Text
          numberOfLines={1}
          style={[styles.userRowTextStyle, { color: 'black' }]}
        >
          {label}
        </Text>
      </View>
  </Pressable>
  );
};

const HomeTab: React.FC<any> = props => {
  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <View style={styles.userAvatar}>
        <Animated.View
          style={[styles.userAvatarStyle, styles.avatarShadow]}
        >
        </Animated.View>
        <Text style={styles.userName}>Mohammad Raffi</Text>
      </View>
      <View style={styles.divider} />

      <ScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 10 }}
      >
        {NAV_ITEMS.map(scene => (
          <NavItemRow
            key={scene.label}
            {...{ ...props, ...scene }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 18,
    color: '#3A5160',
    fontFamily: 'WorkSans-SemiBold',
    paddingTop: 8,
    paddingLeft: 4,
  },
  userAvatar: {
    padding: 16, 
    marginTop: 40, 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  userRowStyle: {
    marginHorizontal: 0,
    paddingVertical: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  userRowbackViewStyle: {
    opacity: 0.3,
    height: 52,
    borderRadius: 24,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
  userRowTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  userRowContentContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingHorizontal: 26,
    position: 'absolute',
  },
  userAvatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarShadow: {
    elevation: 1,
    shadowColor: '#3A5160',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  divider: {
    backgroundColor: 'darkgrey',
    height: StyleSheet.hairlineWidth,
  }
});

export default HomeTab;
