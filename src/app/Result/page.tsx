import React from 'react';

interface ResultPageProps {
    responseData: string; // Assuming responseData is a string
}

const ResultPage: React.FC<ResultPageProps> = ({ responseData }) => {
    let results = '';
    try {
        // Attempt to parse the response data
        const responseObj = JSON.parse(responseData);
        results = responseObj.results || '';
    } catch (error) {
        // If parsing fails, display an error message
        console.error('Error parsing JSON:', error);
        results = 'Invalid JSON';
    }

    return (
        <div>
            <h1>Scan Result</h1>
            <p>Response from server:</p>
            {/* Display the results */}
            <pre>{results}</pre>
        </div>
    );
};

export default ResultPage;
