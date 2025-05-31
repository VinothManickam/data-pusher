
### sample-apis/dataHandlerApis.md
```markdown
# Data Handler API

## POST /server/incoming_data
Receives JSON data and forwards it to all destinations associated with the account identified by the app secret token.

**Request:**
- **Method**: POST
- **URL**: `http://localhost:3000/server/incoming_data`
- **Headers**:
  - `Content-Type: application/json`
  - `CL-X-TOKEN: <appSecretToken>`
- **Body**:
  ```json
  {
    "key": "value"
  }