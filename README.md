


Data Pusher is an Express.js web application that receives JSON data for an account and forwards it to multiple destinations (webhooks) associated with that account. It uses SQLite as the database and provides CRUD operations for accounts and destinations, along with a data handler endpoint.
```
---

## Features

- **Account Module**: Create and manage accounts with unique email, account ID, account name, app secret token, and optional website.
- **Destination Module**: Manage webhook destinations with URL, HTTP method (GET/POST/PUT), and headers.
- **Data Handler Module**: Accepts JSON via POST, authenticates using a secret token, and pushes data to associated destinations.
- **Database**: Uses SQLite with foreign key support and cascading deletes.
- **API**: RESTful endpoints for accounts, destinations, and data handling.
- **Error Handling**: Comprehensive validation and structured error responses.

---

## Project Structure
```

```
data-pusher/
├── src/
│   ├── config/
│   │   └── database.js           
│   ├── controllers/
│   │   ├── accountController.js   
│   │   ├── destinationController.js 
│   │   └── dataHandlerController.js 
│   ├── models/
│   │   ├── account.js            
│   │   └── destination.js        
│   ├── routes/
│   │   ├── accountRoutes.js     
│   │   ├── destinationRoutes.js  
│   │   └── dataHandlerRoutes.js  
│   ├── middleware/
│   │   └── validate.js           
│   ├── utils/
│   │   └── tokenGenerator.js     
│   └── app.js                   
├── sample-apis/
│   ├── accountApis.md            
│   ├── destinationApis.md        
│   └── dataHandlerApis.md        
├── package.json                  
├── database.db                 
└── README.md                   


```

````

---

## Prerequisites

- **Node.js**: v20.x or later (tested with 20.11.0)
- **npm**: v10.x or later
- **Git**: For cloning and version control

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/[your-username]/data-pusher.git
cd data-pusher
````

### 2. Install Dependencies

```bash
npm install
```

### Core Dependencies

* `express`: Web server
* `axios`: HTTP requests to destinations
* `sqlite3`: SQLite DB driver
* `sqlite`: Promise wrapper for SQLite
* `nodemon`: Dev auto-reloader (optional)

---

## Running the App

### Production

```bash
npm start
```

### Development

```bash
npm run dev
```

* Server runs on: `http://localhost:3000`

---

## Database

* **Type**: SQLite
* **File**: `database.db` (auto-generated)
* **Tables**:

  * `accounts`: Stores account metadata
  * `destinations`: Stores webhook destinations (linked to accounts)

---

## API Usage

See detailed API documentation in `sample-apis/`:

* `accountApis.md`
* `destinationApis.md`
* `dataHandlerApis.md`

---

## Example API Requests

### Create an Account

```bash
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","accountName":"User Account","website":"https://example.com"}'
```

**Response**

```json
{
  "id": 1,
  "email": "user@example.com",
  "accountId": "ACC_1626786979523_abc123",
  "accountName": "User Account",
  "appSecretToken": "generated_token_here",
  "website": "https://example.com"
}
```

---

### Create a Destination

```bash
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Response**

```json
{
  "id": 1,
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
```

---

### Send Data to Destinations

```bash
curl -X POST http://localhost:3000/server/incoming_data \
  -H "Content-Type: application/json" \
  -H "CL-X-TOKEN: generated_token_here" \
  -d '{"key":"value"}'
```

**Response**

```json
{ "message": "Data processed successfully" }
```

---

## Error Handling

* **400 Bad Request**: Missing/invalid fields
* **401 Unauthorized**: Invalid/missing `CL-X-TOKEN`
* **404 Not Found**: Account or destination not found
* **500 Internal Server Error**: Server or database issue

---

## Notes

* The `appSecretToken` is required to authenticate `/server/incoming_data` requests.
* GET destinations append data as query params; POST/PUT send as JSON.
* Deleting an account automatically deletes its destinations.

---

## GitHub Repository

**URL**: [https://github.com/VinothManickam/data-pusher](https://github.com/VinothManickam/data-pusher)


---


```
