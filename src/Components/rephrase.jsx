// Rephrase.js
import React, { useState } from 'react';
import axios from 'axios';

const Rephrase = ({ text, showAlert,mode}) => {
    const [rephrasedText, setRephrasedText] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRephrase = async () => {
        if (text.trim() === "") {
            showAlert("Please enter a word to Rephrase", "warning");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                'https://api.sapling.ai/api/v1/paraphrase',
                {
                    key: '38Z4P9EL8QP2H3XIW212T15O6K1RI51T',
                    text: text, // Pass the text prop for rephrasing
                }
            );

            const { status, data } = response;
            if (status === 200 && data.results) {
                setRephrasedText(data.results);
                showAlert("Text successfully rephrased", "success");
            } else {
                showAlert("Failed to rephrase the text", "danger");
            }
        } catch (error) {
            showAlert("Error in rephrasing", "danger");
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary my-1" onClick={handleRephrase} disabled={loading}>
                {loading ? 'Rephrasing...' : 'Rephrase Text'}
            </button>
            <div style={{ color: mode === 'dark' ? 'white' : '#041743'}}>
                {
                    rephrasedText.length > 0 && (
                        <ul>
                            {rephrasedText.map((item) => (
                                <li key={item.hash}>{item.replacement}</li>
                            ))}
                        </ul>
                    ) 
                }
            </div>

        </div>
    );
};

export default Rephrase;
