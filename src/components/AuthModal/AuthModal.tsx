import React, { useState } from 'react';
import { login, register } from '../../services/api';
import { Button, Form, Modal } from 'react-bootstrap';
import { Input } from '@chakra-ui/react';

interface AuthModalProps {
  showLogin: boolean;
  showModal: boolean;
  setShowModal: (value:boolean) => void;
}

const AuthModal = (props: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlerSubmit = async () => {
    if(props.showLogin){
      await handleLogin()
    }else{
      await handleRegister()
    }
  };

  const handleOnHIde = async () => {
    props.setShowModal(false);
  };

  return (
    <Modal show={props.showModal} onHide={() => handleOnHIde()} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.showLogin ? "Entrar" : "Cadastrar-se"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {!props.showLogin && (
            <Input
              type="text"
              id="username"
              name="username"
              className="auth-input form-control mb-2"
              placeholder="Nome de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <Input
            type="email"
            id="email"
            name="email"
            className="auth-input form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <Input
            type="password"
            id="password"
            name="Senha"
            className="auth-input form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p style={{color:'red'}} className='mb-2'>{error}</p>
          <Button
            type="submit" 
            className="btn btn-secondary w-100"
            onClick={handlerSubmit}>
            Entrar
          </Button>
          
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
