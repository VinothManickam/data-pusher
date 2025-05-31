# Account APIs

## POST /api/accounts
Create a new account.

**Request:**
- **Method**: POST
- **URL**: `http://localhost:3000/api/accounts`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "accountName": "User Account",
    "website": "https://example.com"
  }