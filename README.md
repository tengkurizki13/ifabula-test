[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11150525&assignment_repo_type=AssignmentRepo)

# p2-cms-integration-server

CMS Integration - Server

# Restaurant API Dekomentation

## Endpoint :

### List of available endpoints:

- POST /api/register
- POST /api/login
- POST /api/createProfile
- GET /api/getProfile
- PUT /api/updateProfile


## 1. POST /api/register

### Description

- register user

### Request:

- Body:

```json
{
  "email": "rizki@gmail.com",
  "password": "12345",
  "username": "rizki"
}
```

### Response

Response (201 - Created)

```json
[
  {
    "massage": "User has been created successfully",
    "data": {
      "id": 1,
      "email": "rizki@gmail.com",
      "username": "rizki",
      "createdAt": "2024-01-01T14:13:53.000Z",
      "updatedAt": "2024-01-01T14:13:53.000Z"
    }
  }
]
```

Response (400 - Bad Request)

```json
{
  "message": "Email Is Required"
}
OR
{
  "message": "Email Must Be Unique"
}
OR
{
  "message": "Password Is Required"
}
OR
{
  "message": "Username Is Required"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

## 2. POST /api/login

### Description

- user login

### Request:

- Body:

```json
{
  "email": "rizki@gmail.com",
  "password": "12345"
}
```

### Response

Response (200 - Created)

```json
[
  {
    "massage": "User has been logged in",
    "data": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA0MTE4NTEyfQ.W47WxkIC7jvCehQ9KLOdrxoKYNOJkBj8WP9m2RIxUVQ",
      "id": 1,
      "email": "rizki@gmail.com"
    }
  }
]
```

Response (400 - Bad Request)

```json
{
  "message": "email / password is required"
}
```

Response (401 - authentication)

```json
{
  "message": "you are not authentication"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

## 3. POST /api/createProfile

### Description

- create profile user

### Request:

- Body:

```json
{
  "name": "iki",
  "birthday": "18-02-2001",
  "height": 150,
  "weight": 20,
  "interests": ["bola","mancing"],
}
```

### Response

Response (200 - Created)

```json
[
  {
    "message": "Profile has been created",
    "data": {
      "id": 1,
      "email": "rizki@gmail.com",
      "username": "rizki",
      "name": "iki",
      "birthday": "18-02-2001",
      "height": 150,
      "weight": 20,
      "interests": "[\"bola\",\"mancing\"]",
      "createdAt": "2024-01-01T14:13:53.000Z",
      "updatedAt": "2024-01-01T14:29:56.000Z"
    }
  }
]
```

Response (400 - Bad Request)

```json
{
  "message": "Name Is Required"
}
OR
{
  "message": "Birthday Is Required"
}
OR
{
  "message": "Height Is Required"
}
OR
{
  "message": "Weight Is Required"
}
OR
{
  "message": "Interests Is Required"
}
```

Response (401 - authentication)

```json
{
  "message": "you are not authentication"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

## 4. GET /api/getProfile

### Description

- get porfile

### Response

Response (200 - get)

```json
[
  {
    "message": "Profile has been found",
    "data": {
      "id": 1,
      "email": "rizki@gmail.com",
      "username": "rizki",
      "name": "iki",
      "birthday": "18-02-2001",
      "height": 150,
      "weight": 20,
      "interests": "[\"bola\",\"mancing\"]",
      "createdAt": "2024-01-01T14:13:53.000Z",
      "updatedAt": "2024-01-01T14:32:37.000Z"
    }
  }
]
```

Response (401 - authentication)

```json
{
  "message": "you are not authentication"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

## 5. PUT /api/createProfile

### Description

- updated profile user

### Request:

- Body:

```json
{
  "name": "ura",
  "birthday": "18-02-2001",
  "height": 150,
  "weight": 20,
  "interests": ["bola","mancing"],
}
```

### Response

Response (200 - updated)

```json
  {
    "message": "Profile has been updated",
    "data": {
      "id": 1,
      "email": "rizki@gmail.com",
      "username": "rizki",
      "name": "ura",
      "birthday": "18-02-2001",
      "height": 150,
      "weight": 20,
      "interests": "[\"bola\",\"mancing\"]",
      "createdAt": "2024-01-01T14:13:53.000Z",
      "updatedAt": "2024-01-01T14:41:45.000Z"
    }
  }
]
```

Response (400 - Bad Request)

```json
{
  "message": "Name Is Required"
}
OR
{
  "message": "Birthday Is Required"
}
OR
{
  "message": "Height Is Required"
}
OR
{
  "message": "Weight Is Required"
}
OR
{
  "message": "Interests Is Required"
}
```

Response (401 - authentication)

```json
{
  "message": "you are not authentication"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```