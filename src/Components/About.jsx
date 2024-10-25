import React from 'react'

const About = ({mode}) => {
  return (
    <>
      <div className="card" style={{ backgroundColor:mode === 'dark' ? '#042743' : 'white', color:mode === 'dark' ? 'white' : '#041743', border:mode === 'dark' ? '0.5px solid grey' : '0.5px solid black' }}> 
        <div className="card-header" style={{border:mode === 'dark' ? '0.2px solid grey' : '0.2px solid black' }}>
          About TextMaster
        </div>
        <div className="card-body">
          <h6 className="card-title">TextMaster is a free, web-based application designed to streamline your text manipulation and analysis tasks. With its user-friendly interface, TextMaster offers a suite of features accessible directly from your browser, eliminating the need for downloads or installations.</h6>
          <h5>Key Features:</h5>
          <p><strong>Word and Character Count:</strong> Quickly determine the number of words and characters in your text, assisting you in meeting specific content requirements.</p>
          <p><strong>Text Conversion:</strong> Easily switch between uppercase and lowercase formats to suit your formatting needs.</p>
          <p><strong>Title Case Transformation:</strong> Convert your text to title case, capitalizing the first letter of each word for proper formatting.</p>
          <p><strong>Remove Extra Spaces:</strong> Efficiently eliminate unnecessary spaces from your text to enhance readability and presentation.</p>
          <p><strong>Copy Functionality:</strong> Seamlessly copy your processed text to the clipboard for use in other applications.</p>
          <p><strong>Dictionary Lookup:</strong> Access definitions and meanings of words directly within the app to enrich your vocabulary and ensure precise language usage.</p>
          <p><strong>Text Summarization:</strong> Condense lengthy texts into concise summaries, allowing you to grasp key points without reading the entire content. </p>
        </div>
      </div>
    </>
  )
}

export default About
