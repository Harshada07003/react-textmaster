import React, { useState } from "react";
import Axios from "axios";

const Dictionary = ({ showAlert, mode }) => {
  const [data, setData] = useState(null); // Start with null for better type checking
  const [searchWord, setSearchWord] = useState("");

  // Function to fetch information on button click
  const getMeaning = () => {
    if (searchWord.trim() === "") {
      showAlert("Please enter a word to search", "warning");
      return;
    }

    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          showAlert("Word not found. Please try again with a valid word.", "danger");
        }
        setSearchWord(""); // Clear the search input after fetching data
      })
      .catch((error) => {
        showAlert("Word not found. Please try again with a valid word.", "danger");
      });
  };

  return (
    <div className="App">
      <h1 style={{ color: "blue" }}>Free Dictionary 📘</h1>
      <div className="searchBox my-4" style={{ display: "flex" }}>
        <input
          type="text"
          value={searchWord}
          placeholder="Search..."
          onChange={(e) => setSearchWord(e.target.value)}
          style={{ width: "50%" }}
        />
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={getMeaning}
          aria-label="Search for meaning"
        >
          Search
        </button>
      </div>
      {data ? (
        <div className="showResults" style={{ color: mode === 'dark' ? 'white' : 'grey' }}>
          <h2 style={{ color: "blue" }}>{data.word}</h2>
          <h5>Parts of speech:</h5>
          <p>{data.meanings[0]?.partOfSpeech || "Not found"}</p>
          <h5>Definition:</h5>
          <p>{data.meanings[0]?.definitions[0]?.definition || "No definition found"}</p>
          <h5>Example:</h5>
          <p>{data.meanings[0]?.definitions[0]?.example || "No example found."}</p>
        </div>
      ) : (
        <p style={{ color: mode === 'dark' ? 'white' : 'grey' }}>
          Enter a word to look up its meaning, definition, and examples.
        </p>
      )}
    </div>
  );
}

export default Dictionary;
