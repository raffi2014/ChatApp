// @flow
import { Platform } from 'react-native';

type Environment = {
  API_URL: string,
  prod: boolean,
  isAndroid: boolean,
  isIOS: boolean,
}

export const env: Environment = {
  API_URL: 'https://smartcontrol.adafsa.gov.ae/',
  prod: false,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
};
