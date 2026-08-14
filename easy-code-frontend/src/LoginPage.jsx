import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Key, Mail, Lock, ArrowRight, AlertTriangle, CheckCircle, Code } from 'lucide-react';

const API_BASE = 'http://localhost:8080/api/auth';

// Welcome recommendations shown after login/register
const WELCOME_TIPS = [
  '💡 Try the CSS Animation template to create stunning visual effects!',
  '🎨 Use the Glassmorphism template to master modern UI design!',
  '⚡ Switch between Desktop, Tablet & Mobile views to make responsive designs!',
  '🔗 Hit "Share" to generate a shareable link for your project!',
  '🗜️ Export your work as a ZIP file — ready to deploy anywhere!',
  '🖥️ Use console.log() in the JS tab and see live output in the console below!',
  '🌟 Explore all presets to jumpstart your next creative project!',
];

function getRandomTip() {
  return WELCOME_TIPS[Math.floor(Math.random() * WELCOME_TIPS.length)];
}

const MATRIX_SNIPPETS = [
  "<div><h1>HELLO</h1></div>",
  "function(e){return true;}",
  ".class{color:#fff;margin:0;}",
  "const data=await fetch(url);",
  "if(user.auth){login();}",
  "body{display:flex;}",
  "<button onClick={click}>",
  "let x=Math.random();",
  "export default App;",
  "console.log('Matrix');",
  "SELECT * FROM users;",
  "@RestController",
  "public class User{",
  "import React from 'react';",
  "Array.prototype.map",
  "public void run(){}",
  "background:radial-gradient",
  "const [val,setVal]=useState",
  "module.exports=config;"
];

const generateMatrixColumns = (numCols) => {
  const cols = [];
  for (let i = 0; i < numCols; i++) {
    const col = [];
    for(let j = 0; j < 8; j++){
      col.push(MATRIX_SNIPPETS[Math.floor(Math.random() * MATRIX_SNIPPETS.length)]);
    }
    cols.push(col);
  }
  return cols;
};

// Generate 50 columns to fill the screen horizontally densely
const codeColumns = generateMatrixColumns(50);

export default function LoginPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [particles, setParticles] = useState([]);

  // Login form state
  const [loginForm, setLoginForm] = useState({ usernameOrEmail: '', password: '' });
  // Register form state
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  // Generate floating particles for background animation
  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(generated);
  }, []);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.usernameOrEmail || !loginForm.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/login`, loginForm);
      const { token, username, email, message } = res.data;
      localStorage.setItem('easycode-jwt', token);
      localStorage.setItem('easycode-user', JSON.stringify({ username, email }));
      onAuthSuccess({ username, email, message, tip: getRandomTip() });
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = registerForm;
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/register`, { username, email, password });
      const { token, username: uname, email: uemail, message } = res.data;
      localStorage.setItem('easycode-jwt', token);
      localStorage.setItem('easycode-user', JSON.stringify({ username: uname, email: uemail }));
      onAuthSuccess({ username: uname, email: uemail, message, tip: getRandomTip() });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="login-bg-gradient" />
        <div className="login-grid" />
        
        {/* Scrolling Code-Line Columns */}
        <div className="login-code-bg">
          {codeColumns.map((col, colIdx) => (
            <div key={colIdx} className={`code-column ${colIdx % 2 === 0 ? 'up' : 'down'}`}>
              {[...col, ...col].map((snippet, idx) => (
                <div key={idx} className="code-line">
                  {snippet}
                </div>
              ))}
            </div>
          ))}
        </div>

        {particles.map((p) => (
          <div
            key={p.id}
            className="login-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="login-card-wrapper">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="login-logo"><Code size={28} /></div>
          <div>
            <div className="login-app-name">EASY CODE</div>
            <div className="login-tagline">Your cloud-powered code playground</div>
          </div>
        </div>

        {/* Glass Card */}
        <div className="login-glass-card">
          {/* Mode Tabs */}
          <div className="login-tabs">
            <button
              id="tab-login"
              className={`login-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
            >
              Sign In
            </button>
            <button
              id="tab-register"
              className={`login-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setError(''); }}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="login-error-banner">
              <AlertTriangle size={18} className="login-error-icon" />
              <span>{error}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form className="login-form" onSubmit={handleLogin} noValidate>
              <div className="login-field">
                <label htmlFor="usernameOrEmail">Username or Email</label>
                <div className="login-input-wrapper">
                  <User size={16} className="login-input-icon" />
                  <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    autoComplete="username"
                    placeholder="your_username or email@example.com"
                    value={loginForm.usernameOrEmail}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <div className="login-input-wrapper">
                  <Key size={16} className="login-input-icon" />
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </div>

              <button
                id="btn-login-submit"
                type="submit"
                className={`login-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="login-spinner" />
                ) : (
                  <>
                    <span>Sign In to IDE</span>
                    <ArrowRight size={16} className="login-btn-arrow" />
                  </>
                )}
              </button>

              <p className="login-switch-text">
                Don't have an account?{' '}
                <button type="button" className="login-link-btn" onClick={() => { setMode('register'); setError(''); }}>
                  Create one free
                </button>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form className="login-form" onSubmit={handleRegister} noValidate>
              <div className="login-field">
                <label htmlFor="reg-username">Username</label>
                <div className="login-input-wrapper">
                  <User size={16} className="login-input-icon" />
                  <input
                    id="reg-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Choose a unique username"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="reg-email">Email Address</label>
                <div className="login-input-wrapper">
                  <Mail size={16} className="login-input-icon" />
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="reg-password">Password</label>
                <div className="login-input-wrapper">
                  <Lock size={16} className="login-input-icon" />
                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Min. 6 characters"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="reg-confirm">Confirm Password</label>
                <div className="login-input-wrapper">
                  <CheckCircle size={16} className="login-input-icon" />
                  <input
                    id="reg-confirm"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <button
                id="btn-register-submit"
                type="submit"
                className={`login-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="login-spinner" />
                ) : (
                  <>
                    <span>Create My Account</span>
                    <ArrowRight size={16} className="login-btn-arrow" />
                  </>
                )}
              </button>

              <p className="login-switch-text">
                Already have an account?{' '}
                <button type="button" className="login-link-btn" onClick={() => { setMode('login'); setError(''); }}>
                  Sign in here
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="login-footer">
          Powered by React + Spring Boot · JWT Auth · H2 Database
        </p>
      </div>
    </div>
  );
}
