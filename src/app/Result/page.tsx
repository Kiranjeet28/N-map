'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

export  const Results = () => {
  const searchParams = useSearchParams() as unknown as { query: string };
  console.log(searchParams)

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!searchParams) return;
        console.log("In Try")
        setLoading(true);

        const response = await fetch(`/api/scan?${searchParams.toString()}`);
         
        if (!response.ok) {
          throw new Error(`Failed to submit form: ${response.statusText}`);
        }

        const data = await response.json();
        setResult(data.results);
        console.log('Server response:', data);
      } catch (error:any) {
        console.error('Error submitting form:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="bg-blue-50  flex justify-center items-center">
      <nav className="bg-blue-300 p-4 shadow-md w-[100vw] text-mono text-center font-mono text-4xl fixed top-0 left-0 z-10">
        <div className="container mx-auto">
          <h1 className="text-white text-xl font-bold">Nmap Scanner</h1>
        </div>
      </nav>
      <div className=" p-8 max-w-2xl bg-white shadow-lg rounded-lg absolute top-20">
        <h1 className="text-3xl text-blue-700 font-bold text-center mb-8">Search Results</h1>
        {loading && <p className="text-center text-gray-800">Loading...</p>}
        {result && (
          <div className='w-auto'>
            <h2 className="text-2xl font-bold mb-4 ">Server Response:</h2>
            <pre className=" p-4 rounded-lg  text-gray-800">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
  

}

export default Results;
