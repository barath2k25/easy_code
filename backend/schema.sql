-- PostgreSQL Schema Migration: Initial foundation

-- We'll add Users, Sessions, Projects, and VS Code Pairings in future phases.
-- This file exists to document our intended migrations.

-- Example future schema (DO NOT RUN YET unless instructed in Phase 3B/C)
/*
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/
