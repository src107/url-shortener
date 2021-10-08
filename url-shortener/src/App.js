
import { useEffect, useState } from 'react';
import { Button, TextField, FormControl, Alert, AlertTitle } from '@mui/material';
import { isValidURL, getShortenURL, shortUrlExist, longUrlExist, getDocId } from './util';
import db from './firebase';
import './App.css';

function App() {
  const [shortURLError, setShortURLError] = useState(false);
  const [longURLError, setLongURLError] = useState(false);
  const [shortURLErrorMsg, setShortURLErrorMsg] = useState("");
  const [longURLErrorMsg, setLongURLErrorMsg] = useState("");
  const [shortURLInput, setShortURLInput] = useState("");
  const [longURLInput, setLongURLInput] = useState("");

  const [urlShorten, setUrlShorten] = useState([]);
  const [convertedURL, setConvertedURL] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    db.collection("urlShorten").onSnapshot((snapshot) =>
      setUrlShorten(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    )
  }, []);

  const setInputURL = (value, urlType) => {
    if (urlType === 'long') {
      if (isValidURL(value)) {
        setLongURLError(false);
        setLongURLErrorMsg("");

      }
      else {
        setLongURLError(true);
        setLongURLErrorMsg("Enter a valid URL");
      }
      setLongURLInput(value);
    }
    else {
      if (isValidURL(value)) {
        setShortURLError(false);
        setShortURLErrorMsg("");

      }
      else {
        setShortURLError(true);
        setShortURLErrorMsg("Enter a valid URL");
      }
      setShortURLInput(value);
    }

  }

  const setLongInputURL = (e) => {
    setInputURL(e.target.value, "long");
  }

  const setShortInputURL = (e) => {
    setInputURL(e.target.value, "short");
  }

  const shortenURL = () => {
    setShowAlert(true);
    if (!longURLError && !shortURLError) {
      
      if (shortUrlExist(shortURLInput, urlShorten)) {
        setAlertType("error");
        setAlertTitle("Error");
        setAlertMsg("This short link exist. Try with a different one");
        return;
      }
      else if (shortURLInput && longUrlExist(longURLInput, urlShorten)) {
        const docId = getDocId(longURLInput, urlShorten);
        db.collection("urlShorten").doc(docId).delete();
      }
      const shortURL = getShortenURL(longURLInput, shortURLInput, urlShorten);
      db.collection("urlShorten").doc(encodeURIComponent(shortURL)).set({
        long_url: longURLInput,
        short_url: shortURL
      });
      setAlertType("success");
      setAlertTitle("Success");
      setAlertMsg(`Your URL can be accessed using this short Link : `);
      setConvertedURL(shortURL);
    }
    else {
      setAlertType("error");
      setAlertTitle("Error");
      setAlertMsg("Please provide valid URL's");
    }

    /*setLongURLInput("");
    setShortURLInput("");*/
  }

  return (
    <div className="app">
      <h2 className="app__header">Welcome to URL Shortener App</h2>
      <FormControl className="app__form">
        <TextField className="app__input" value={longURLInput} required error={longURLError}
          label="Long URL" variant="outlined" onChange={setLongInputURL}
          helperText={longURLErrorMsg} />
        <TextField className="app__input" value={shortURLInput} error={shortURLError}
          label="Short Link" variant="outlined" onChange={setShortInputURL}
          helperText={shortURLErrorMsg} />
        <Button variant="contained" size="large" onClick={shortenURL}>Shorten</Button>
        {showAlert ? (<Alert severity={alertType} onClose={() => { setShowAlert(false); }}>
          <AlertTitle className="app__alert">{alertTitle}</AlertTitle>
          {alertMsg} {alertType === 'success' ?
            (<strong><a href={longURLInput} target="_blank" rel="noreferrer">
              {convertedURL}</a></strong>) : ""}
        </Alert>) : ""}
      </FormControl>

    </div>
  );
}

export default App;
