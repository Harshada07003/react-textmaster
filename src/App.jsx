import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
import Dictionary from './Components/Dictionary';
import About from './Components/About'; // Import the About component
import Summarize from './Components/Summarize';

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [enabletext, setEnabletext] = useState("Enable Darkmode");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setEnabletext('Enable lightMode');
      document.body.style.backgroundColor = '#042743';
    } else {
      setMode('light');
      setEnabletext('Enable darkMode');
      document.body.style.backgroundColor = 'white';
    }
  };

  return (
    <Router>
      <Navbar title="TextMaster" mode={mode} toggleMode={toggleMode} enabletext={enabletext} />
      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route path="/" element={<Container heading="Format your Text 📖🖋️" showAlert={showAlert} mode={mode} />} />
          <Route path="/dictionary" element={<Dictionary  showAlert={showAlert} mode={mode}/>} />
          <Route path="/summury" element={<Summarize  showAlert={showAlert} mode={mode}/>} />
          <Route path="/about" element={<About mode={mode}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
