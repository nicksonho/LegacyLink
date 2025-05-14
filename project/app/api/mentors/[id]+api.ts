export function GET(request: Request, { id }: Record<string, string>) {
  // In a real application, you would fetch a specific mentor from your database
  // For this example, we'll return mock data based on the ID
  
  const mentors = {
    '1': {
      id: '1',
      name: 'David Lee',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Computing 2018',
      occupation: 'Software Engineer',
      company: 'Google',
      expertise: ['Web Development', 'Mobile Apps', 'Cloud Computing'],
      bio: 'Previously at Microsoft, now leading frontend development at Google. I love mentoring students and helping them navigate the tech industry.',
      reviews: [
        {
          id: '101',
          userId: '201',
          userName: 'Alice Chen',
          userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          rating: 5,
          comment: 'David provided excellent guidance for my software engineering internship search. His advice on interview preparation was invaluable.',
          timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7 // 7 days ago
        },
        {
          id: '102',
          userId: '202',
          userName: 'Bob Tan',
          userImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          rating: 4,
          comment: 'Great mentor who takes time to understand your goals. Helped me improve my web development portfolio significantly.',
          timestamp: Date.now() - 1000 * 60 * 60 * 24 * 14 // 14 days ago
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Michelle Tan',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Business 2016',
      occupation: 'Product Manager',
      company: 'Apple',
      expertise: ['Product Management', 'UX Design', 'Market Research'],
      bio: 'Product leader with experience in consumer tech. Passionate about building products that improve people\'s lives.',
      reviews: [
        {
          id: '103',
          userId: '203',
          userName: 'Carol Lim',
          userImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          rating: 5,
          comment: 'Michelle is a fantastic mentor who helped me transition from engineering to product management. She shared real-world examples and practical advice.',
          timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5 // 5 days ago
        }
      ]
    }
  };

  const mentor = mentors[id];
  
  if (!mentor) {
    return new Response('Mentor not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return new Response(
    JSON.stringify(mentor),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}