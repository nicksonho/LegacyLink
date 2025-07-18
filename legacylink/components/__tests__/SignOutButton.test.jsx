import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useClerk } from '@clerk/clerk-expo';
import { Text } from 'react-native';
import { SignOutButton } from '../SignOutButton';

jest.mock('@clerk/clerk-expo');

describe('SignOutButton', () => {
  it('renders sign out text', () => {
    useClerk.mockReturnValue({ signOut: jest.fn() });
    const { getByText } = render(<SignOutButton />);
    expect(getByText('Sign out')).toBeTruthy();
  });

  it('calls signOut when pressed', async () => {
    const signOut = jest.fn();
    useClerk.mockReturnValue({ signOut });
    const { getByText } = render(<SignOutButton />);
    fireEvent.press(getByText('Sign out'));
    // Wait for async handler
    expect(signOut).toHaveBeenCalled();
  });
}); 