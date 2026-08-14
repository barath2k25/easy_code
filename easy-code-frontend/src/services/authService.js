/**
 * authService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised HTTP service for the Easy Code App authentication API.
 * All network calls that touch the Spring Boot backend live here so the UI
 * components stay clean and API details can be changed in one place.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/auth';

// Shared axios instance with default headers
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request automatically if one exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('easycode-jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Register a new user account.
 * @param {{ username: string, email: string, password: string }} payload
 * @returns {Promise<{ token: string, username: string, email: string, message: string }>}
 */
export async function register(payload) {
  const res = await api.post('/register', payload);
  return res.data;
}

/**
 * Login with username/email + password.
 * @param {{ usernameOrEmail: string, password: string }} payload
 * @returns {Promise<{ token: string, username: string, email: string, message: string }>}
 */
export async function login(payload) {
  const res = await api.post('/login', payload);
  return res.data;
}

/**
 * Get the current authenticated user's profile (requires stored JWT).
 * @returns {Promise<{ id: number, username: string, email: string }>}
 */
export async function getMe() {
  const res = await api.get('/me');
  return res.data;
}

/**
 * Health-check ping to the backend.
 * @returns {Promise<{ status: string, service: string }>}
 */
export async function healthCheck() {
  const res = await api.get('/health');
  return res.data;
}

/** Persist auth session to localStorage */
export function persistSession(token, username, email) {
  localStorage.setItem('easycode-jwt', token);
  localStorage.setItem('easycode-user', JSON.stringify({ username, email }));
}

/** Clear auth session from localStorage */
export function clearSession() {
  localStorage.removeItem('easycode-jwt');
  localStorage.removeItem('easycode-user');
}

/** Read persisted session (returns null if none) */
export function readSession() {
  const token = localStorage.getItem('easycode-jwt');
  const userStr = localStorage.getItem('easycode-user');
  if (!token || !userStr) return null;
  try {
    return { token, user: JSON.parse(userStr) };
  } catch {
    return null;
  }
}
