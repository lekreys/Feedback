export async function load({ fetch, params }) {
    const { id } = params;
    
    // Gunakan endpoint internal SvelteKit
    const response = await fetch(`/api/languages/${id}`);
    const data = await response.json();
  
    if (!response.ok) {
      // Handle error jika diperlukan
      throw new Error(data.error);
    }
  
    return { data };
  }