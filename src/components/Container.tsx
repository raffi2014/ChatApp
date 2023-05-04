// @flow
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

type Props = {
  children?: React.ReactNode,
  style?: {}
};

export const Container = ({ children, style }:Props) => (
  <SafeAreaView style={[styles.container, style]}>
    { children }
  </SafeAreaView>
);

