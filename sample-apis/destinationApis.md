
### sample-apis/destinationApis.md
```markdown
# Destination APIs

## POST /api/destinations
Create a new destination for an account.

**Request:**
- **Method**: POST
- **URL**: `http://localhost:3000/api/destinations`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "accountId": 1,
    "url": "https://api.example.com/webhook",
    "httpMethod": "POST",
    "headers": {
      "APP_ID": "1234APPID1234",
      "APP_SECRET": "enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s",
      "ACTION": "user.update",
      "Content-Type": "application/json",
      "Accept": "*"
    }
  }