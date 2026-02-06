# Application Architecture – SentinelAuth

## Overview
SentinelAuth is a Node.js backend application designed to
demonstrate common web application security vulnerabilities
and their remediation.

The system provides authentication, authorization,
and administrative access controls.

---

## Core Components

### Backend API
Built using Node.js and Express.

Handles:
- User registration
- User login
- Token generation
- Protected routes
- Admin functionality

---

### Authentication
Users authenticate using username and password.

Passwords are hashed using bcrypt.

Successful login generates a JWT token used for
subsequent requests.

---

### Authorization
Protected routes require token verification.

Admin routes additionally validate user roles using
server-side data instead of trusting token payloads.

---

### Security Controls Implemented
The system currently includes:

- JWT authentication
- Token verification middleware
- Role-based access control
- Privilege escalation prevention
- Security event logging
- Login rate limiting (brute-force protection)

---

## Security Flow
1. User registers an account.
2. User logs in and receives JWT token.
3. Token is sent with protected requests.
4. Server validates token.
5. Server verifies user role.
6. Access is granted or denied.
7. Security events are logged.

---

## Current Limitations
- Users stored in memory (not persistent)
- No database integration yet
- Basic logging only
- No monitoring dashboard

Future improvements will address these limitations.
