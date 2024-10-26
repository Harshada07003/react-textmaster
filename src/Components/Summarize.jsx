import React, { useState } from 'react';

const Summarize = ({ showAlert, mode }) => {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState(""); // To store the summary result
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleClear = () => {
        setText('');
        setSummary(''); // Clear the summary when clearing the text
        showAlert("Cleared text", "success");
    };

    const summarizeText = async () => {
        if (text.trim()) {
            setLoading(true);
            try {
                const response = await fetch('https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text', {
                    method: "POST",
                    headers: {
                        'x-rapidapi-key':'ffa499c7f2msh48e6d7626a22787p150626jsn810415ccb194', // Use environment variable for API key
                        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "text": text })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setSummary(data.summary || "No summary available."); // Handle empty summary
            } catch (error) {
                console.error("Error:", error);
                setSummary("An error occurred while summarizing the text: " + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            showAlert("Please enter some text.", "warning");
        }
    };

    return (
        <>
            <div>
                <h3 className='my-4' style={{ color: mode === 'dark' ? 'white' : '#041743' }}>Summarize Your Text here 📜</h3>
                <textarea 
                    className="form-control" 
                    id="textInput" 
                    value={text} 
                    rows="10" 
                    cols="50" 
                    placeholder='Enter your text here' 
                    onChange={handleChange} 
                    style={{ backgroundColor: mode === 'dark' ? 'grey' : 'white', color: mode === 'dark' ? 'white' : '#041743', border: '0.1px solid black' }}
                />
                <button type="button" className="btn btn-primary my-1" onClick={summarizeText} disabled={loading}>
                    {loading ? 'Summarizing...' : 'Summarize Text'}
                </button>
                <button 
                    disabled={text.length === 0} 
                    type="button" 
                    className="btn btn-primary mx-1 my-1" 
                    onClick={handleClear}
                >
                    Clear Text
                </button>
            </div>
            <div style={{ color: mode === 'dark' ? 'white' : '#041743' }}>
                <h5>{text.split(" ").filter((element) => element.length !== 0).length} words and {text.length} characters</h5>
                <h4>Summary:</h4>
                <p>{text ? summary : "No summary!"}</p>
            </div>
        </>
    );
}

export default Summarize;
