import axios from 'axios';
import { createApi } from "$lib/api";



const api = createApi()

export async function POST({ request }) {

  const data = await request.json(); 

  try {
    const response = await api.post('/public_api', data, {
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
    const response = await api.get('/public_api');
    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch feedback' }),
    );
  }
}
