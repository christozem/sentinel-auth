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


## Missing Security Event Logging

The application initially blocked unauthorized access attempts
without recording them.

This meant attackers could repeatedly attempt access without
detection or investigation capability.

### Impact
- No trace of attack attempts
- Harder incident investigation
- Attack patterns cannot be analyzed

### Fix Implemented
Security event logging was added for:
- Invalid token usage
- Unauthorized admin access attempts
- Successful admin access

### OWASP Reference
A09:2021 – Security Logging and Monitoring Failures


## JWT Privilege Escalation via Role Trust

The server previously trusted role information stored
inside JWT tokens.

An attacker could modify the token payload and escalate
privileges to administrator level.

### Impact
- Unauthorized admin access
- Sensitive data exposure
- Full system control possible

### Fix Implemented
Server now validates user roles using server-side data
instead of trusting token contents.

Role is verified against stored user records before
granting admin access.

### OWASP Reference
A01:2021 – Broken Access Control



## Brute Force Login Vulnerability

The login endpoint originally allowed unlimited authentication
attempts, enabling brute-force password attacks.

### Impact
- Attackers could guess passwords automatically
- User accounts could be compromised
- No restriction on login attempts

### Fix Implemented
Rate limiting was added to restrict repeated login attempts
within a short time window.

### OWASP Reference
A07:2021 – Identification and Authentication Failures

