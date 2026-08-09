
# Pre-Production Security Checklist

Do a complete security and production-readiness audit of this app before it goes live. Work through every section below in order, fix what's broken, and at the end give me one consolidated report: what you checked, what failed, and exactly what you changed.
APP CONTEXT


1. Secret Leak Prevention
Move all secrets to environment variables. No API key, password, token, database URL, or credential should exist as a string literal anywhere — not in config files, utility functions, or comments.
Supabase: anon key is fine client-side only if Row Level Security is enabled on every table. The service role key must never appear in client-side code.
Stripe: only the publishable key goes client-side; the secret key stays server-side only.
Database connection strings (Postgres/Mongo URI): env vars only, never hardcoded.
OAuth client secrets and JWT signing secrets: server-side only.
Any third-party key (OpenAI, SendGrid, Twilio, Firebase, AWS): env vars only.
Check frontend exposure: in React/Next.js, any env var prefixed NEXT_PUBLIC_ or REACT_APP_ is exposed to the browser — make sure no sensitive key uses these prefixes.
Confirm .env is in .gitignore. Create a .env.example with placeholder values only.
Check console.log, error handlers, and API responses for accidentally leaked secrets or tokens.
If any secret was previously hardcoded, add a README warning to rotate it — the old value is still in git history.
2. Personal Data Flow Audit
Map every place the app collects user data (emails, phone numbers, passwords, names, addresses, DOB, payment info, IP/device info) and trace where each piece goes after collection.
Clean all logs: remove or redact any user PII, passwords, tokens, or personal data printed by console.log, loggers, or error handlers.
Audit every third-party integration (analytics, error tracking, payment processors, email services, AI APIs) — list exactly what user data is sent to each, and strip unnecessary fields.
Passwords must be hashed (bcrypt, argon2, or scrypt — never MD5/SHA256 alone). Never store, log, return, or transmit plaintext passwords anywhere except the hashing function.
Cookies storing sensitive data must have httpOnly, secure, and sameSite flags. Never put PII in localStorage.
Implement field-level filtering on every API response — no password hashes, internal IDs, or other users' data leaking through.
If there's no way for users to delete their data, add a basic account deletion/anonymization flow.
3. Pre-Deploy Production Checklist
Every required env var (DB URL, API keys, auth secret) must be validated on startup — the app should refuse to start if a critical one is missing.
Remove debug code: leftover console.logs, commented-out blocks, TODO/FIXME comments about incomplete security, hardcoded test credentials, and test-only endpoints (/test, /debug, /admin-backdoor, /seed-data). Debug mode must default to OFF.
No client-facing error should include stack traces, DB query details, file paths, or internal server info — return a generic message + correlation ID; log details server-side only.
Add security headers to every response: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security (1 year), and a Content-Security-Policy restricting scripts to your domain. Use helmet if on Express.
Rate-limit auth endpoints: minimum 5 login attempts/minute/IP, 3 password-reset requests/hour.
CORS must not allow * unless the API is genuinely public — restrict to your specific frontend domain.
Database connections must use TLS/SSL in production, no default credentials, no open DB port exposed without auth.
4. Deep Audit — Auth, Payments, and Complex Logic
Authentication & Authorization

Every protected route/API endpoint needs proper auth middleware.
Check for IDOR: no endpoint should accept a client-supplied user ID and return that user's data without verifying ownership.
Password reset tokens must be random, single-use, time-limited (15 min max), and tied to a specific user.
JWTs need a strong signing secret, expiry, and token blacklist on logout.

Payment Logic

Never trust client-side price calculations — server must independently compute totals, taxes, and discounts.
Check whether an attacker could modify price/quantity/discount in the request body.
Verify webhook signatures from payment providers (Stripe, Razorpay, etc.).
Confirm payment status is verified server-side before unlocking paid features.

Input Handling

Check every form input, URL param, and API field for SQL injection — use parameterized queries, never raw SQL.
Check for XSS: is any user input rendered in HTML without sanitization?
Validate file uploads server-side (type, size); never serve uploads from a domain with executable permissions.

For every issue found here: state the vulnerability, its location, how it could be exploited, and the exact fix applied.
5. Attacker's-Perspective Review
ID manipulation: try changing user/order/document IDs in the URL or request body on every relevant endpoint — confirm ownership is verified before returning data.
Login bypass: check for endpoints that work without a valid token, improper handling of expired/malformed tokens, and default admin accounts.
Privilege escalation: if roles exist (user/admin/moderator), confirm a regular user can't reach admin endpoints by guessing URLs or tampering with role claims in a JWT/session — role checks must be server-side.
Feature abuse: check rate limits on signup, messaging, file uploads, API calls, and promo/referral codes for abuse potential.
Content injection: try injecting JavaScript into every text field (usernames, bios, comments, search, filenames); check for SQL injection through search/filter/login forms.
Internal exposure: confirm none of these are publicly reachable — DB admin panel, env vars via error messages, .env via direct URL, .git directory, internal Swagger/OpenAPI docs, health-check endpoints leaking system info.
Business logic abuse: if payments exist, check for negative amounts, infinite discount stacking, free-trial resets, and self-referrals.

For every vulnerability found: explain what an attacker would do, the potential damage, and fix it immediately. Prioritize data theft and unauthorized access first, abuse/logic flaws second.


FINAL REPORT
Give me one summary covering all five sections above:

What was checked
What passed / failed
Exactly what was changed, and where



Note: this audit catches the mistakes behind most real-world breaches in vibe-coded apps, but it isn't a substitute for professional security testing. If this app handles real money or sensitive data at scale, follow up with a human security review before launch.

Based on: Gitleaks, Bearer, ECC Production Audit, Trail of Bits Skills, and ECC Security Review.


Pre-Production Security Checklist — 6 Prompts
Six prompts to run before shipping your app to production. Paste them into Claude one at a time, in order, and review what it changes before moving to the next.

How to use this file
Run the prompts in order — each targets a different risk area, so there's no dependency, but this order goes from access control outward to infrastructure-level checks.
Paste one prompt, let Claude finish, review the diff/summary.
Move to the next prompt.
Re-run all 6 after any major feature addition — new code means new attack surface.

1. Rate Limiting
Add rate limiting appropriate to each endpoint type: stricter limits on authentication routes (e.g. login, signup, password reset), moderate limits on public endpoints, and looser limits on authenticated user actions. For auth routes, use a combination of per-IP and per-account limits with exponential backoff rather than a hard lockout. Make all thresholds configurable, not hardcoded.

2. Input Validation
Validate every input against a strict schema (type, length, format) and reject anything that doesn't match — don't just sanitize/escape.

3. Secrets
Scan the complete codebase for any hardcoded API keys, tokens, or passwords. Use environment variables and verify that nothing sensitive is shipped into the frontend or pushed to git.

4. Dependency Vulnerabilities
Run a dependency audit across the project. Identify any packages with known vulnerabilities, list their severity, and update or replace them where safe to do so.

5. Error Handling & Information Leakage
Review all error handling across the app. Ensure users never see stack traces, internal file paths, or raw database errors — return generic messages instead, while still logging full error details server-side for debugging.

6. File Upload Safety
Review any file upload functionality. Confirm file type, size, and content are validated (not just the extension), uploads are stored outside the web root or in isolated storage, and uploaded files can never be executed as code.

Quick reference
#
Prompt
Risk it closes
1
Rate limiting
Brute force, credential stuffing, abuse
2
Input validation
Injection, malformed data, type confusion
3
Secrets
Key/credential leaks in code or git history
4
Dependency vulnerabilities
Known CVEs in third-party packages
5
Error handling
Info leakage that helps attackers map your system
6
File upload safety
Malicious file execution, storage abuse


