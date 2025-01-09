import axios from 'axios';

export async function POST({ request }) {

  const data = await request.json(); 

  try {
    const response = await axios.post('http://127.0.0.1:8000/integrations', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return new Response(
      JSON.stringify({ message: 'Feedback submitted successfully', data: response.data })
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.messag})
    );
  }
}


export async function GET() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/integrations');
    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch feedback' }),
    );
  }
}
