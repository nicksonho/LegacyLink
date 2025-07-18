import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeScreen from '../SafeScreen';

const initialMetrics = {
  frame: { x: 0, y: 0, width: 375, height: 812 },
  insets: { top: 44, left: 0, right: 0, bottom: 34 },
};

describe('SafeScreen', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <SafeScreen>
          <Text>Hello</Text>
        </SafeScreen>
      </SafeAreaProvider>
    );
    expect(getByText('Hello')).toBeTruthy();
  });
});
