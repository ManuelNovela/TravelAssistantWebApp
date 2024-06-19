import React, { useContext, useState } from 'react';
import { login, register } from '../../services/api';
import { Button, Modal } from 'react-bootstrap';
import { Input } from '@chakra-ui/react';
import DataContext from '../../services/context/DataContext';

interface AuthModalProps {
  showLogin: boolean;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  showLogin,
  showModal,
  setShowModal,
}: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { setIsLoggedIn } = useContext(DataContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
      setIsLoggedIn(true);
      setShowModal(false); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      setIsLoggedIn(true);
      setShowModal(false); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (showLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  const handleClose = () => {
    setShowModal(false); // Fechar o modal ao clicar no botão de fechar
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{showLogin ? 'Entrar' : 'Cadastrar-se'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {!showLogin && (
            <Input
              type="text"
              id="username"
              name="username"
              className="auth-input form-control mb-2"
              placeholder="Nome de Usuário"
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
            name="password"
            className="auth-input form-control mb-3"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p style={{ color: 'red' }} className="mb-2">
            {error}
          </p>
          <Button type="submit" className="btn btn-secondary w-100">
            {showLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
