export function GET(request: Request) {
  // In a real application, you would fetch mentors from your database
  // For this example, we'll return mock data
  
  const mentors = [
    {
      id: '1',
      name: 'David Lee',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Computing 2018',
      occupation: 'Software Engineer',
      company: 'Google',
      expertise: ['Web Development', 'Mobile Apps', 'Cloud Computing'],
      bio: 'Previously at Microsoft, now leading frontend development at Google. I love mentoring students and helping them navigate the tech industry.'
    },
    {
      id: '2',
      name: 'Michelle Tan',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Business 2016',
      occupation: 'Product Manager',
      company: 'Apple',
      expertise: ['Product Management', 'UX Design', 'Market Research'],
      bio: 'Product leader with experience in consumer tech. Passionate about building products that improve people\'s lives.'
    },
    {
      id: '3',
      name: 'James Wong',
      profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Computing 2017',
      occupation: 'Data Scientist',
      company: 'Microsoft',
      expertise: ['Machine Learning', 'Data Analysis', 'Python', 'R'],
      bio: 'Data scientist specializing in machine learning and AI. I enjoy discussing the latest developments in AI and helping students break into the field.'
    },
    {
      id: '4',
      name: 'Sarah Chen',
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Business 2019',
      occupation: 'Marketing Manager',
      company: 'Meta',
      expertise: ['Digital Marketing', 'Brand Strategy', 'Content Creation'],
      bio: 'Marketing professional with experience in digital and social media marketing. I can provide guidance on building a career in marketing and PR.'
    },
    {
      id: '5',
      name: 'Alex Lim',
      profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Engineering 2015',
      occupation: 'Engineering Lead',
      company: 'Tesla',
      expertise: ['Electrical Engineering', 'Robotics', 'Hardware Design'],
      bio: 'Electrical engineer working on cutting-edge EV technology. Happy to discuss engineering careers and provide advice on academic paths.'
    },
  ];

  return new Response(
    JSON.stringify(mentors),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}