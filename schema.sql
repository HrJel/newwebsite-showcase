CREATE TABLE IF NOT EXISTS app_users(id TEXT PRIMARY KEY,app TEXT NOT NULL,username TEXT NOT NULL,name TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'user',password_salt TEXT NOT NULL,password_hash TEXT NOT NULL,iterations INTEGER NOT NULL,disabled INTEGER NOT NULL DEFAULT 0,created_at TEXT DEFAULT CURRENT_TIMESTAMP,UNIQUE(app,username));
CREATE TABLE IF NOT EXISTS auth_sessions(token_hash TEXT PRIMARY KEY,app TEXT NOT NULL,username TEXT NOT NULL,role TEXT NOT NULL,created_at INTEGER NOT NULL,expires_at INTEGER NOT NULL,revoked_at INTEGER);
CREATE INDEX IF NOT EXISTS auth_sessions_exp ON auth_sessions(app,expires_at);
CREATE TABLE IF NOT EXISTS auth_attempts(id INTEGER PRIMARY KEY AUTOINCREMENT,app TEXT NOT NULL,user_key TEXT NOT NULL,attempted_at INTEGER NOT NULL,outcome TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS attempts_window ON auth_attempts(app,user_key,attempted_at);
CREATE TABLE IF NOT EXISTS app_workspace(app TEXT NOT NULL,username TEXT NOT NULL,content TEXT NOT NULL,updated_at TEXT DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(app,username));
