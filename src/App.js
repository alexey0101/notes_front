import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { getNotes } from './api/notesApi';
import Main from './components/Main/Main';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

const App = () => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
      async function getData() {
        try {
          const notes = await getNotes();
          setNotes(notes);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
  }, []);
  
  return (
    <html>
    <head></head>
      <body>
        <NavBar authorized={notes != null} />
        <BrowserRouter>
          <Routes >
            <Route exact path="/" element={<Main notes={notes}/>} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </body>
    </html>
  );
}

export default App;
