'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const MyForm: React.FC = () => {
    const [ipOrDomain, setIpOrDomain] = useState('');
    const [portCount, setPortCount] = useState('10');
    const [osDetection, setOsDetection] = useState(false);
    const [result, setresult] = useState();
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Prepare the data to send to the server
        const queryParams = new URLSearchParams();
        queryParams.append('ip', ipOrDomain);
        queryParams.append('services', osDetection ? 'O' : 'A');
        queryParams.append('ports', portCount);
    
        try {
            // Send the form data to the server
            const response = await fetch(`/api/scan?${queryParams.toString()}`);
    
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
    
            // Parse the response JSON
            console.log('Response:', response.body);
            const data = await response.json();
        
            setresult(data.results
            );
            // router.push("/Result",data);
            console.log('Server response:', data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    IP Address or Domain:
                    <input
                        type="text"
                        value={ipOrDomain}
                        className='text-gray-900'
                        onChange={(e) => setIpOrDomain(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <p>Number of Ports:</p>
                <label>
                    <input
                        type="radio"
                        value="10"
                        checked={portCount === '10'}
                        onChange={() => setPortCount('10')}
                    /> 10
                </label>
                <label>
                    <input
                        type="radio"
                        value="100"
                        checked={portCount === '100'}
                        onChange={() => setPortCount('100')}
                    /> 100
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="O"
                        checked={osDetection}
                        onChange={() => setOsDetection(true)}
                    /> OS 
                </label>
                <label>
                    <input
                        type="radio"
                        value="A"
                        checked={!osDetection}
                        onChange={() => setOsDetection(false)}
                    /> Services
                </label>
            </div>
           
            <button type="submit">Submit</button>

            {result && (
                <div>
                    <h2>Server Response:</h2>
                    <pre>{result}</pre>
                </div>
            )}
        </form>
    );
};

export default MyForm;
