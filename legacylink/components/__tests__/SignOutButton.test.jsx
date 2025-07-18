import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SignOutButton } from '../SignOutButton';

/*
  This test suite covers the SignOutButton component, which renders a sign out button and calls the signOut function from Clerk when pressed.
  - It checks rendering of the button text
  - It checks that the signOut function is called on press
*/

// Mock @clerk/clerk-expo and expose signOutMock on the module
jest.mock('@clerk/clerk-expo', () => {
  const signOutMock = jest.fn();
  return {
    useClerk: () => ({ signOut: signOutMock }),
    __esModule: true,
    signOutMock, // expose for test access
  };
});

describe('SignOutButton', () => {
  /**
   * Test: Renders sign out text
   * This test ensures that the SignOutButton displays the 'Sign out' text.
   */
  it('renders sign out text', () => {
    const { getByText } = render(<SignOutButton />);
    expect(getByText('Sign out')).toBeTruthy();
  });

  /**
   * Test: Calls signOut when pressed
   * This test ensures that pressing the button calls the signOut function from Clerk.
   */
  it('calls signOut when pressed', () => {
    // Access the mock from the module
    const { signOutMock } = require('@clerk/clerk-expo');
    signOutMock.mockClear(); // clear previous calls
    const { getByText } = render(<SignOutButton />);
    fireEvent.press(getByText('Sign out'));
    expect(signOutMock).toHaveBeenCalled();
  });
}); 