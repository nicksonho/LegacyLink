export function POST(request: Request) {
  return new Response(
    JSON.stringify({
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'student',
        profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      token: 'mock-auth-token'
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}