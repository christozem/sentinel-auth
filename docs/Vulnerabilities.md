# Known Vulnerabilities (Intentional)

This application intentionally contains security weaknesses
for educational and demonstration purposes.

## Authentication
- Weak password hashing
- Long-lived JWT tokens
- No rate limiting

## Access Control
- Missing server-side role checks

## Notes
These issues will be exploited and fixed in later phases.

User data is stored in memory, so restarting the server clears all accounts.



## Broken Authentication – JWT Misuse

The application issues long-lived JWT tokens (30 days)
with sensitive authorization data embedded in the payload.

### Impact
- Stolen tokens remain valid for long periods
- No server-side session invalidation
- Privilege escalation possible if token is modified or reused

### OWASP Reference
- A07:2021 – Identification and Authentication Failures



## Broken Access Control

The admin endpoint does not verify user privileges.
Any unauthenticated user can access sensitive data.

### Impact
- Unauthorized access to admin functions
- Sensitive data exposure

### OWASP Reference
- A01:2021 – Broken Access Control
