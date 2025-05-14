export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, role } = body;

  // In a real application, you would create a user in your database
  // For this example, we'll return a mock response

  return new Response(
    JSON.stringify({
      user: {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name,
        role,
        profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        createdAt: new Date().toISOString(),
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