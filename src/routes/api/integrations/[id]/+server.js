import axios from "axios";
import { createApi } from "$lib/api";



const api = createApi()

export async function GET({ params }) {
  try {
    const { id } = params;
    
    const response = await api.get(`/integrations/${id}`);
    
    return new Response(JSON.stringify(response.data), {
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}