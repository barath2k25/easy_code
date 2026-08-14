/**
 * LoginPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen login / registration page with animated code-rain background,
 * glassmorphic card, and JWT auth via the Spring Boot backend.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect } from 'react';
import { User, Key, Mail, Lock, ArrowRight, AlertTriangle, CheckCircle, Code } from 'lucide-react';
import { login, register, persistSession } from '../services/authService';
import { getRandomTip } from '../data/welcomeTips';
import { generateMatrixColumns } from '../data/matrixSnippets';

// Pre-generate 50 matrix rain columns
const codeColumns = generateMatrixColumns(50);

export default function LoginPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [particles, setParticles] = useState([]);

  const [loginForm, setLoginForm] = useState({ usernameOrEmail: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '', email: '', password: '', confirmPassword: '',
  });

  // Floating particles for background animation
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
      const res = await login(loginForm);
      persistSession(res.token, res.username, res.email);
      onAuthSuccess({ username: res.username, email: res.email, message: res.message, tip: getRandomTip() });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
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
      const res = await register({ username, email, password });
      persistSession(res.token, res.username, res.email);
      onAuthSuccess({ username: res.username, email: res.email, message: res.message, tip: getRandomTip() });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                <div key={idx} className="code-line">{snippet}</div>
              ))}
            </div>
          ))}
        </div>

        {particles.map((p) => (
          <div
            key={p.id}
            className="login-particle"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="login-card-wrapper">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo"><Code size={28} /></div>
          <div>
            <div className="login-app-name">EASY CODE</div>
            <div className="login-tagline">Your cloud-powered code playground</div>
          </div>
        </div>

        {/* Glass Card */}
        <div className="login-glass-card">
          {/* Tabs */}
          <div className="login-tabs">
            <button id="tab-login" className={`login-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError(''); }}>Sign In</button>
            <button id="tab-register" className={`login-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setError(''); }}>Create Account</button>
          </div>

          {/* Error */}
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
                  <input id="usernameOrEmail" name="usernameOrEmail" type="text"
                    autoComplete="username" placeholder="your_username or email@example.com"
                    value={loginForm.usernameOrEmail} onChange={handleLoginChange} required />
                </div>
              </div>
              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <div className="login-input-wrapper">
                  <Key size={16} className="login-input-icon" />
                  <input id="login-password" name="password" type="password"
                    autoComplete="current-password" placeholder="Enter your password"
                    value={loginForm.password} onChange={handleLoginChange} required />
                </div>
              </div>
              <button id="btn-login-submit" type="submit"
                className={`login-submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? <span className="login-spinner" /> : (
                  <><span>Sign In to IDE</span><ArrowRight size={16} className="login-btn-arrow" /></>
                )}
              </button>
              <p className="login-switch-text">
                Don't have an account?{' '}
                <button type="button" className="login-link-btn"
                  onClick={() => { setMode('register'); setError(''); }}>Create one free</button>
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
                  <input id="reg-username" name="username" type="text"
                    autoComplete="username" placeholder="Choose a unique username"
                    value={registerForm.username} onChange={handleRegisterChange} required />
                </div>
              </div>
              <div className="login-field">
                <label htmlFor="reg-email">Email Address</label>
                <div className="login-input-wrapper">
                  <Mail size={16} className="login-input-icon" />
                  <input id="reg-email" name="email" type="email"
                    autoComplete="email" placeholder="you@example.com"
                    value={registerForm.email} onChange={handleRegisterChange} required />
                </div>
              </div>
              <div className="login-field">
                <label htmlFor="reg-password">Password</label>
                <div className="login-input-wrapper">
                  <Lock size={16} className="login-input-icon" />
                  <input id="reg-password" name="password" type="password"
                    autoComplete="new-password" placeholder="Min. 6 characters"
                    value={registerForm.password} onChange={handleRegisterChange} required />
                </div>
              </div>
              <div className="login-field">
                <label htmlFor="reg-confirm">Confirm Password</label>
                <div className="login-input-wrapper">
                  <CheckCircle size={16} className="login-input-icon" />
                  <input id="reg-confirm" name="confirmPassword" type="password"
                    autoComplete="new-password" placeholder="Repeat your password"
                    value={registerForm.confirmPassword} onChange={handleRegisterChange} required />
                </div>
              </div>
              <button id="btn-register-submit" type="submit"
                className={`login-submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? <span className="login-spinner" /> : (
                  <><span>Create My Account</span><ArrowRight size={16} className="login-btn-arrow" /></>
                )}
              </button>
              <p className="login-switch-text">
                Already have an account?{' '}
                <button type="button" className="login-link-btn"
                  onClick={() => { setMode('login'); setError(''); }}>Sign in here</button>
              </p>
            </form>
          )}
        </div>

        <p className="login-footer">
          Powered by React + Spring Boot · JWT Auth · H2 Database
        </p>
      </div>
    </div>
  );
}
