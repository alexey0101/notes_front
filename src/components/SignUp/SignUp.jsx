import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { signup } from '../../api/notesApi';
import './SignUp.css'


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

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

    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(username)) {
        setMessage('Имя пользователя должно состоять из латинских букв, цифр и специальных символов (!, @, #, $, %, ^, &, *)');
        setShow(true);
        return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(password)) {
        setMessage('Пароль должен состоять из латинских букв, цифр и специальных символов (!, @, #, $, %, ^, &, *)');
        setShow(true);
        return;
    }

    if (password !== repeatPassword) {
        setMessage('Пароли не совпадают');
        setShow(true);
        return;
    }

    setShow(false);
    setMessage('');

    try {
        await signup(username, password);
        window.location.href = '/signin';
    } catch (error) {
        setMessage(`Ошибка при регистрации: ${error}`);
        setShow(true);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Регистрация</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Имя пользователя:</Form.Label>
              <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль:</Form.Label>
              <Form.Control type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
              <Form.Label>Повторите пароль:</Form.Label>
              <Form.Control type="password" placeholder="*******" onChange={(e) => setRepeatPassword(e.target.value)} />
            </Form.Group>
            <Button variant="warning" className='submit-button' type="submit">
                Зарегистрироваться
            </Button>
            <Alert className='mt-5' show={show} variant="danger" onClose={() => setShow(false)} dismissible>{message}</Alert>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
