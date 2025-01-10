import axios from "axios";

export async function GET({ params }) {
  try {
    // Mengambil id dari params
    const { id } = params;
    
    // Lakukan request ke backend API (tersembunyi dari client)
    const response = await axios.get(`http://127.0.0.1:8000/integrations/${id}`);
    
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