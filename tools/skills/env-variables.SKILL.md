# ENV variables structure — guidance for automated tools/AI

Purpose: describe the intended environment variables for the ranking-docentes project. Tools or AI assistants can use this file to understand what values are expected, their types, and where they are used.

Format: KEY (type) — description — example

- MYSQL_ROOT_PASSWORD (string) — Root password for MySQL server used in dev docker-compose. Example: `root`
- MYSQL_DATABASE (string) — Database name to create on container startup. Example: `ranking_db`
- MYSQL_USER (string) — Non-root DB user for the application. Example: `admin`
- MYSQL_PASSWORD (string) — Password for the non-root DB user. Example: `admin`
- DB_HOST (string) — Hostname the application should use to reach the DB when running inside Docker. In compose use `db`. Example: `db`
- DB_PORT (number) — Port the DB listens on inside the container. Example: `3306`
- API_HOST (string) — Host interface the API binds to (usually `0.0.0.0` in containers). Example: `0.0.0.0`
- API_PORT (number) — Port the API listens on. Example: `3000`
- NODE_ENV (string) — Node environment value. Example: `development`
- JWT_SECRET (string) — Secret for signing JWTs in dev. Use non-sensitive placeholder in dev. Example: `changeme_dev`
- LOG_LEVEL (string) — Logging verbosity. Example: `debug` or `info`

Guidelines for AI/tooling:
- Do not output or commit actual `.env` values to public repositories. Prefer `.env.example` with placeholders.
- When scaffolding services or configuration files, reference `DB_HOST`/`DB_PORT` for internal container networking, and `localhost:3307` for host-side connections (because compose maps 3307:3306).
- Use `env_file: ../../../.env` in `docker-compose.dev.yml` to load these variables for local development services.
- If offering to generate secure values (e.g., `JWT_SECRET`), mention they are dev placeholders and recommend rotating/securing in production.

Notes:
- This SKILL file is for development onboarding and automated assistants; it is not a secret store.
- Keep `.env` excluded via `.gitignore`.
