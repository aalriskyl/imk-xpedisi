import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = () => {
    const data = { username, password };
    axios
      .post("https://ekspedisi.netlify.app/.netlify/functions/api/login", data)
      .then((result) => {
        if (result && result.data && result.data && result.data.token) {
          localStorage.setItem("token", result.data.token);
          navigate('/admin'); // Redirect to the profile page after successful login
        } else {
          setError("Invalid response from the server");
        }
      })
      .catch((e) => {
        setError(e.response ? e.response.data.message : "An error occurred");
      });
  };

  return (
    <div className="container">
      <div className="container-form row justify-content-center align-items-center">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title justify-content-center align-items-center">Login</h2>
              <form autoComplete="off">
                <div className="form-group mb-3 pad1">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group mb-3 pad1">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={submit}>
                  Login
                </button>
              </form>
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
