import React, { useState } from 'react';
import Rephrase from './rephrase';
import axios from "axios";



const Container = (props) => {
    const [text, setText] = useState('');
    const [searchWord, setSearchWord] = useState("");
    const [replaceWord, setReplaceWord] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnChange = (event) => {
        setText(event.target.value);
    };
    
    //handle toUppercase
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase", "success");
    };

    //handle toLowercase
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase", "success");
    };
   
    //handle clearText
    const handleClear = () => {
        setText('');
        props.showAlert("Cleared text", "success");
    };
    
    //handle Copy
    const handleCopy = () => {
        var copyText = document.getElementById("mybox");
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        props.showAlert("Successfully copied", "success");
    };

    //handle WhiteSpaces
    const handleWhiteSpaces = () => {
        let result = text.replace(/\s{1,}/g, ' ').trim();
        setText(result);
        props.showAlert("Whitespace removed", "success");
    };

    // Escaping special characters in the search word
    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    //handle replaceword
    const handleReplace = () => {
        if (searchWord.trim() !== "") {
            const escapedSearchWord = escapeRegExp(searchWord);
            const regex = new RegExp(escapedSearchWord, "gi");
            
            // Check if the search word is found in the text
            if (regex.test(text)) {
                const updatedParagraph = text.replace(regex, replaceWord);
                setText(updatedParagraph);
                props.showAlert("Text replaced", "success");
            } else {
                props.showAlert("Search word not found", "warning");
            }
    
            // Clear the input fields
            setSearchWord(""); 
            setReplaceWord("");
        }
    };
    
    //reverse the string
    const handleReverse = () => {
        let strRev = text.split('').reverse().join('');
        setText(strRev);
        props.showAlert("Text reverse", "success");
    }

    //converted to titileCase
    const titleCase = () => {
        let lower = text.toLowerCase().split(' ');
        let str = lower.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        setText(str.join(' '));
        props.showAlert("Converted to titleCase", "success");
    }

    // Grammar check and correction function
    const run = async (text) => {
        if (text.trim() === "") {
            props.showAlert("Please enter a word to check grammer", "warning");
            return;
        };
        setLoading(true);
        try {
            const response = await axios.post(
                'https://api.sapling.ai/api/v1/edits',
                {
                    "key": '38Z4P9EL8QP2H3XIW212T15O6K1RI51T',
                    "session_id": 'test session',
                    text,
                },
            );
            const { status, data } = response;

            if (status === 200 && data && data.edits.length > 0) {
                let updatedText = text;
                data.edits.forEach(edit => {
                    const { start, end, replacement } = edit;
                    updatedText = updatedText.substring(0, start) + replacement + updatedText.substring(end);
                });

                setText(updatedText);
                props.showAlert("Text corrected based on suggestions", "success");
            } else {
                props.showAlert("No corrections needed", "info");
            }
        } catch (err) {
            console.error(err);
            const msg = err.response ? err.response.data.msg : "Error occurred";
            props.showAlert("sorry", "danger");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div>
                <div className="mb-3" style={{ color: props.mode === 'dark' ? 'white' : '#041743' }}>
                    <h4>{props.heading}</h4>
                    <div className="myclass" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="mb-3" style={{ display: "flex", justifyContent: "space-between", height: "40px" }}>
                                <input type="text" className="form-control" id="searchBox" placeholder="Search word" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : '#041743', border: '0.1px solid black' }} />
                                <input type="text" className="form-control" id="replaceBox" placeholder="Replace word" value={replaceWord} onChange={(e) => setReplaceWord(e.target.value)} style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : '#041743', border: '0.1px solid black' }} />
                            </div>
                            <button type="button" className="btn btn-primary mx-1 my-1" onClick={handleReplace}>Replace</button>
                        </div>
                    </div>
                    <textarea className="form-control" id="mybox" value={text} rows="10" placeholder='Enter your text here' onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : '#041743', border: '0.1px solid black' }}></textarea>
                </div>
                <button disabled={text.length === 0} type="button" className="btn btn-primary my-1" onClick={handleUpClick}>toUppercase</button>
                <button disabled={text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>toLowercase</button>
                <button disabled={text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleClear}>Clear Text</button>
                <button disabled={text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy to Clipboard</button>
                <button disabled={text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleWhiteSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={titleCase}>TitleCase</button>
                <button disabled={text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleReverse}>Reverse</button>
                <button type="button" className="btn btn-primary mx-1 my-1" onClick={() => run(text)} disabled={loading}>{loading ? 'Correcting...' : 'Grammar Check'}</button>
            </div>
            <Rephrase text={text} showAlert={props.showAlert} mode={props.mode}/>
            <div className=" my-1" style={{ color: props.mode === 'dark' ? 'white' : '#041743' }}>
                <h5>{text.split(" ").filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</h5>
                <h5>{text.match(/[^a-zA-Z0-9\s]/g) ? text.match(/[^a-zA-Z0-9\s]/g).length : 0} special characters</h5>
                <h4>Preview</h4>
                <p>{text ? text : "Nothing to preview!!"}</p>
            </div>

        </>
    );
};

export default Container;
