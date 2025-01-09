export async function load({ fetch }) {
    try {
      const res = await fetch('/api/languages'); 
  
      if (!res.ok) {
        throw new Error('Failed to fetch feedback');
      }
  
      const all_Feedback = await res.json();
  
      return { all_Feedback };
    } catch (error) {
      console.error('Error fetching feedback:', error);
      return { all_Feedback: [] };
    }
  }
  