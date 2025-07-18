import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock expo-linear-gradient to avoid native dependency issues in Jest
describe('MentorCard', () => {
  /*
    This test suite covers the MentorCard component, which displays mentor information and a request button.
    - It checks rendering of mentor details (name, bio, interests)
    - It checks the button press callback
    - It checks rendering when no profilePicUrl is provided
  */
});

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});

import MentorCard from '../MentorCard';

const mockMentor = {
  name: 'Jane Doe',
  bio: 'Mentor bio',
  interests: ['Math', 'Science'],
  profilePicUrl: 'https://example.com/pic.jpg',
};

describe('MentorCard', () => {
  /**
   * Test: Renders mentor info
   * This test ensures that the MentorCard displays the mentor's name, bio, and interests.
   */
  it('renders mentor info', () => {
    const { getByText } = render(
      <MentorCard mentor={mockMentor} onRequest={jest.fn()} />
    );
    expect(getByText('Jane Doe')).toBeTruthy();
    expect(getByText('Mentor bio')).toBeTruthy();
    expect(getByText('✨ Math')).toBeTruthy();
    expect(getByText('✨ Science')).toBeTruthy();
  });

  /**
   * Test: Calls onRequest when button is pressed
   * This test ensures that pressing the 'Request' button calls the onRequest callback.
   */
  it('calls onRequest when button is pressed', () => {
    const onRequest = jest.fn();
    const { getByText } = render(
      <MentorCard mentor={mockMentor} onRequest={onRequest} />
    );
    fireEvent.press(getByText('Request'));
    expect(onRequest).toHaveBeenCalled();
  });

  /**
   * Test: Renders placeholder if no profilePicUrl
   * This test ensures that the MentorCard still renders correctly if the mentor has no profilePicUrl.
   */
  it('renders placeholder if no profilePicUrl', () => {
    const mentorNoPic = { ...mockMentor, profilePicUrl: undefined };
    const { getByText } = render(
      <MentorCard mentor={mentorNoPic} onRequest={jest.fn()} />
    );
    expect(getByText('Jane Doe')).toBeTruthy();
  });
}); 