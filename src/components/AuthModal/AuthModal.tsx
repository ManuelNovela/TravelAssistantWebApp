import React, { useState } from 'react';
import { login, register } from '../../services/api';

const AuthModal = () => {
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

  return (
    <div className="modal">
      <h2>Login or Register</h2>
      {error && <p className="error-message">{error}</p>}
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default AuthModal;
