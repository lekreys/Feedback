export async function load({ fetch }) {
    try {
      const res = await fetch('/api/automations'); 
  
      if (!res.ok) {
        throw new Error('Failed to fetch automations');
      }
  
      const all_Feedback = await res.json();
  
      return { all_Feedback };
    } catch (error) {
      console.error('Error fetching automations:', error);
      return { all_Feedback: [] };
    }
  }
  