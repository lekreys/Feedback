import axios from 'axios';


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
    
    // Append file jika ada
    const imageFile = formData.get('image');
    if (imageFile) {
      sendFormData.append('image', imageFile);
    }

    // Kirim request ke backend
    const response = await axios.post('http://127.0.0.1:8000/automations/upload-file', 
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
