import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);    // Stores the fetched data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null);   // Tracks error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url); // Fetch data from the provided URL

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json(); // Parse the response as JSON
        setData(result);    // Store the data in state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message); // If there's an error, store it in the error state
        setLoading(false);       // Set loading to false
      }
    };

    fetchData(); // Call the fetch function
  }, [url]); // Re-run the effect whenever the URL changes

  return { data, loading, error };
};

export default useFetch;
