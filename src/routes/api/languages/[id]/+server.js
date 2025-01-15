import axios from "axios";
import { createApi } from "$lib/api";



const api = createApi()

export async function GET({ params }) {
  try {
    // Mengambil id dari params
    const { id } = params;
    
    // Lakukan request ke backend API (tersembunyi dari client)
    const response = await api.get(`/languages/${id}`);
    
    // Return response dengan format JSON
    return new Response(JSON.stringify(response.data), {
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    // Handle error dan return error response
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}