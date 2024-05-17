'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const MyForm: React.FC = () => {
    const [ipOrDomain, setIpOrDomain] = useState('');
    const [portCount, setPortCount] = useState('10');
    const [osDetection, setOsDetection] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event:any) => {
      event.preventDefault();
      
      // Prepare the data to send to the server
      const queryParams = new URLSearchParams();
      queryParams.append('ip', ipOrDomain);
      queryParams.append('services', osDetection ? 'O' : 'A');
      queryParams.append('ports', portCount);
  
      // Use the router to redirect
      router.push(`/Result?${queryParams.toString()}`);
    };

    return (
        <div className='flex flex-col items-center'>
            <nav className="bg-blue-300 p-4 shadow-md w-[100vw] text-mono text-center font-mono text-4xl">
                <div className="container mx-auto">
                    <h1 className="text-white text-xl font-bold">Nmap Scanner</h1>
                </div>
            </nav>
            <form onSubmit={handleSubmit} className="bg-blue-100 p-6 rounded-lg shadow-md w-[80vw] mt-20 ">
                <div className="mb-4">
                    <label className="block text-blue-900 font-bold mb-2">
                        IP Address or Domain:
                        <input
                            type="text"
                            value={ipOrDomain}
                            className="mt-1 p-2 w-full border border-blue-300 rounded text-gray-900"
                            onChange={(e) => setIpOrDomain(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <p className="text-blue-900 font-bold">Number of Ports:</p>
                    <label className="inline-flex items-center mt-2">
                        <input
                            type="radio"
                            value="10"
                            checked={portCount === '10'}
                            onChange={() => setPortCount('10')}
                            className="text-blue-300 focus:ring-blue-300"
                        />
                        <span className="ml-2 text-blue-900">10</span>
                    </label>
                    <label className="inline-flex items-center mt-2 ml-4">
                        <input
                            type="radio"
                            value="100"
                            checked={portCount === '100'}
                            onChange={() => setPortCount('100')}
                            className="text-blue-300 focus:ring-blue-300"
                        />
                        <span className="ml-2 text-blue-900">100</span>
                    </label>
                </div>
                <div className="mb-4">
                    <p className="text-blue-900 font-bold">Detection Type:</p>
                    <label className="inline-flex items-center mt-2">
                        <input
                            type="radio"
                            value="O"
                            checked={osDetection}
                            onChange={() => setOsDetection(true)}
                            className="text-blue-300 focus:ring-blue-300"
                        />
                        <span className="ml-2 text-blue-900">OS</span>
                    </label>
                    <label className="inline-flex items-center mt-2 ml-4">
                        <input
                            type="radio"
                            value="A"
                            checked={!osDetection}
                            onChange={() => setOsDetection(false)}
                            className="text-blue-300 focus:ring-blue-300"
                        />
                        <span className="ml-2 text-blue-900">Services</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-300 text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
                >
                    Submit
                </button>
    
                {/* {result && (
                    <div className="mt-6">
                        <h2 className="text-blue-900 font-bold">Server Response:</h2>
                        <pre className="bg-white p-4 border border-blue-300 rounded">{result}</pre>
                    </div>
                )} */}
            </form>
        </div>
    );
};

export default MyForm;
