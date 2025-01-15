import axios from 'axios';
import { createApi } from "$lib/api";



const api = createApi()

export async function POST({ request }) {
  try {
    // Ambil FormData dari request
    const formData = await request.formData();
    
    // Buat FormData baru untuk dikirim ke backend
    const sendFormData = new FormData();
    
    // Append semua field ke FormData baru
    sendFormData.append('Title', formData.get('Title'));
    sendFormData.append('Description', formData.get('Description'));
    sendFormData.append('Category', formData.get('Category'));
    sendFormData.append('Vote', formData.get('Vote'));
    
    // Ambil semua file yang diupload (bisa berupa banyak file)
    const imageFiles = formData.getAll('images'); // Mengambil semua file dari field 'images'
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        sendFormData.append('images', file); // Tambahkan setiap file ke FormData
      });
    }

    // Kirim request ke backend
    const response = await api.post(
      '/automations/upload-file', 
      sendFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return new Response(
      JSON.stringify({ 
        message: 'Feedback submitted successfully', 
        data: response.data 
      })
    );

  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(
      JSON.stringify({ 
        message: error.message || 'Failed to submit feedback'
      }),
      { status: 500 }
    );
  }
}
