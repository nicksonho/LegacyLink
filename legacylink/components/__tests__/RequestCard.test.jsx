import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RequestCard from '../RequestCard';

/*
  This test suite covers the RequestCard component, which displays a student request and allows accepting or rejecting it.
  - It checks rendering of student details (name, bio, course, year)
  - It checks the callback for Accept and Reject button presses
*/

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
  /**
   * Test: Renders student info
   * This test ensures that the RequestCard displays the student's name, bio, course, and year.
   */
  it('renders student info', () => {
    const { getByText } = render(
      <RequestCard request={mockRequest} onRespond={jest.fn()} />
    );
    expect(getByText('Student Name')).toBeTruthy();
    expect(getByText('Student bio')).toBeTruthy();
    expect(getByText('Engineering • Year 2')).toBeTruthy();
  });

  /**
   * Test: Calls onRespond with 'accepted' when Accept is pressed
   * This test ensures that pressing the 'Accept' button calls onRespond with 'accepted'.
   */
  it('calls onRespond with accepted when Accept is pressed', () => {
    const onRespond = jest.fn();
    const { getByText } = render(
      <RequestCard request={mockRequest} onRespond={onRespond} />
    );
    fireEvent.press(getByText('Accept'));
    expect(onRespond).toHaveBeenCalledWith('accepted');
  });

  /**
   * Test: Calls onRespond with 'rejected' when Reject is pressed
   * This test ensures that pressing the 'Reject' button calls onRespond with 'rejected'.
   */
  it('calls onRespond with rejected when Reject is pressed', () => {
    const onRespond = jest.fn();
    const { getByText } = render(
      <RequestCard request={mockRequest} onRespond={onRespond} />
    );
    fireEvent.press(getByText('Reject'));
    expect(onRespond).toHaveBeenCalledWith('rejected');
  });
}); 