import React, { useState } from 'react';

const AverageCalculator = () => {
    const [numberId, setNumberId] = useState('');
    const [response, setResponse] = useState(null);

    const fetchNumbers = async () => {
        try {
            const res = await fetch(`http://localhost:9876/numbers/${numberId}`);
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={numberId} 
                onChange={(e) => setNumberId(e.target.value)} 
                placeholder="Enter number ID (p, f, e, r)" 
            />
            <button onClick={fetchNumbers}>Fetch Numbers</button>
            {response && (
                <div>
                    <h2>Previous State: {JSON.stringify(response.windowPrevState)}</h2>
                    <h2>Current State: {JSON.stringify(response.windowCurrState)}</h2>
                    <h2>Numbers: {JSON.stringify(response.numbers)}</h2>
                    <h2>Average: {response.avg}</h2>
                </div>
            )}
        </div>
    );
};

export default AverageCalculator;
