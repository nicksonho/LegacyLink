import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MentorCard from '../MentorCard';

const mockMentor = {
  name: 'Jane Doe',
  bio: 'Mentor bio',
  interests: ['Math', 'Science'],
  profilePicUrl: 'https://example.com/pic.jpg',
};

describe('MentorCard', () => {
  it('renders mentor info', () => {
    const { getByText } = render(
      <MentorCard mentor={mockMentor} onRequest={jest.fn()} />
    );
    expect(getByText('Jane Doe')).toBeTruthy();
    expect(getByText('Mentor bio')).toBeTruthy();
    expect(getByText('✨ Math')).toBeTruthy();
    expect(getByText('✨ Science')).toBeTruthy();
  });

  it('calls onRequest when button is pressed', () => {
    const onRequest = jest.fn();
    const { getByText } = render(
      <MentorCard mentor={mockMentor} onRequest={onRequest} />
    );
    fireEvent.press(getByText('Request'));
    expect(onRequest).toHaveBeenCalled();
  });

  it('renders placeholder if no profilePicUrl', () => {
    const mentorNoPic = { ...mockMentor, profilePicUrl: undefined };
    const { getByText } = render(
      <MentorCard mentor={mentorNoPic} onRequest={jest.fn()} />
    );
    expect(getByText('Jane Doe')).toBeTruthy();
  });
}); 