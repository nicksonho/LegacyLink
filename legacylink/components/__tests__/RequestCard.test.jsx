import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RequestCard from '../RequestCard';

const mockRequest = {
  sender: {
    name: 'Student Name',
    bio: 'Student bio',
    course: 'Engineering',
    yearOfStudy: 2,
    profilePicUrl: 'https://example.com/student.jpg',
  },
};

describe('RequestCard', () => {
  it('renders student info', () => {
    const { getByText } = render(
      <RequestCard request={mockRequest} onRespond={jest.fn()} />
    );
    expect(getByText('Student Name')).toBeTruthy();
    expect(getByText('Student bio')).toBeTruthy();
    expect(getByText('Engineering • Year 2')).toBeTruthy();
  });

  it('calls onRespond with accepted when Accept is pressed', () => {
    const onRespond = jest.fn();
    const { getByText } = render(
      <RequestCard request={mockRequest} onRespond={onRespond} />
    );
    fireEvent.press(getByText('Accept'));
    expect(onRespond).toHaveBeenCalledWith('accepted');
  });

  it('calls onRespond with rejected when Reject is pressed', () => {
    const onRespond = jest.fn();
    const { getByText } = render(
      <RequestCard request={mockRequest} onRespond={onRespond} />
    );
    fireEvent.press(getByText('Reject'));
    expect(onRespond).toHaveBeenCalledWith('rejected');
  });
}); 