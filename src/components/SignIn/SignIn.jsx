import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { signin } from '../../api/notesApi';
import './SignIn.css'

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 3) {
        setMessage('Имя пользователя должно быть больше 2 символов');
        setShow(true);
        return;
    }

    if (password.length < 5) {
        setMessage('Пароль должен быть больше 4 символов');
        setShow(true);
        return;
    }

    setShow(false);
    setMessage('');

    try {
        await signin(username, password);
        window.location.href = '/';
    } catch (error) {
        setMessage(`Ошибка при входе: ${error}`);
        setShow(true);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Войти</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Имя пользователя:</Form.Label>
              <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль:</Form.Label>
              <Form.Control type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            
            <Button variant="warning" className='submit-button' type="submit">
                Войти
            </Button>
            <Alert className='mt-5' show={show} variant="danger" onClose={() => setShow(false)} dismissible>{message}</Alert>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
