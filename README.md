[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11150525&assignment_repo_type=AssignmentRepo)

# p2-cms-integration-server

CMS Integration - Server

# Perpustakaan API Dekomentation

## Cara Menjalankan Aplikasi

- jalankan docker.compose nya untuk buat config db nya jika tidak  langsung ke langkah nomer 2 
- buat database dengan dialect maria db
- buat database dengan nama "perpustakaan-test"
- sesuai kan file config.json dengan config databasenya
- setalah koneksi berhasil maka jalankan "npm i" di terminal
- kemudian "npm run migrate" untuk buat table
- kemudian "npm run seed" untuk masukan data dummy
- dan terakhir jalankan aplikasi dengan command ini "npm run seed"


## Endpoint :

### List of available endpoints:

- POST /api/register
- POST /api/login
- GET /api/books
- POST /api/books/:id
- GET /api/notes
- PATCH /api/notes/:id


## 1. POST /api/register

### Description

- register user

### Request:

- Body:

```json
{
  "email": "bejo@gmail.com",
  "password": "Bejo12345",
  "username": "bejo"
}
```

### Response

Response (201 - Created)

```json
[
  {
    "message": "User has been created successfully",
    "data": {
      "id": 3,
      "email": "bejo@hotmail.com",
      "username": "bejo",
      "role": "user",
      "createdAt": "2024-01-09T20:48:39.000Z",
      "updatedAt": "2024-01-09T20:48:39.000Z"
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
  "message": "Format Email Is Wrong"
}
OR
{
  "message": "Password Is Required"
}
OR
{
  "message": "Minimum character password is 8 characters"
}
OR
{
  "message": "The password must contain only letters and numbers.s"
}
OR
{
  "message": "The password must be a combination of numbers and letters."
}
OR
{
  "message": "The password must contain at least 1 capital letter."
}
OR
{
  "message": "The password must not contain special characters."
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
  "email": "bejo@gmail.com",
  "password": "Bejo12345"
}
```

### Response

Response (200 - log in)

```json
[
  {
    "message": "User has been logged in",
    "data": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA0ODMzNTQwfQ.voYyrn0doLfb048E9u_kKq9qYF3fsDraAkVv1W_zCGA",
      "id": 3,
      "email": "bejo@gmail.com",
      "role": "user"
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

## 3. GET /api/books

### Description

- get all books and dont forget token

### Response

Response (200 - get all book)

```json
[
  {
    "message": "Books has been found",
    "data": [
      {
        "id": 1,
        "title": "Entrok",
        "author": "Okky Madasari",
        "published": "2024-01-09T20:51:25.000Z",
        "createdAt": "2024-01-09T20:51:25.000Z",
        "updatedAt": "2024-01-09T20:51:25.000Z"
      },
      {
        "id": 2,
        "title": "Hilang dalam Dekapan Semeru",
        "author": "Fajar Raditya",
        "published": "2024-01-09T20:51:25.000Z",
        "createdAt": "2024-01-09T20:51:25.000Z",
        "updatedAt": "2024-01-09T20:51:25.000Z"
      },
      {
        "id": 3,
        "title": "Sihir Mesir di Tanah Jawa",
        "author": "Om Hao",
        "published": "2024-01-09T20:51:25.000Z",
        "createdAt": "2024-01-09T20:51:25.000Z",
        "updatedAt": "2024-01-09T20:51:25.000Z"
      },
      {
        "id": 4,
        "title": "Misteri Patung Garam",
        "author": "Ruwi Meita",
        "published": "2024-01-09T20:51:25.000Z",
        "createdAt": "2024-01-09T20:51:25.000Z",
        "updatedAt": "2024-01-09T20:51:25.000Z"
      },
      {
        "id": 5,
        "title": "Narik Sukma",
        "author": "Dewie Yulliantika Sofia",
        "published": "2024-01-09T20:51:25.000Z",
        "createdAt": "2024-01-09T20:51:25.000Z",
        "updatedAt": "2024-01-09T20:51:25.000Z"
      },
      {
        "id": 6,
        "title": "Pesta Bunuh Diri",
        "author": "Daniel Ahmad",
        "published": "2024-01-09T20:51:25.000Z",
        "createdAt": "2024-01-09T20:51:25.000Z",
        "updatedAt": "2024-01-09T20:51:25.000Z"
      },
      {
        "id": 7,
        "title": "Surat dari Kematian",
        "author": "Adham T. Fusama",
        "published": "2024-01-09T20:51:25.000Z",
        "createdAt": "2024-01-09T20:51:25.000Z",
        "updatedAt": "2024-01-09T20:51:25.000Z"
      }
    ]
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

## 4. POST /api/books/1

### Description

- make note to borrow book

### Request:

- Body:

```json
{
  "borrowingDate": "2024-01-09",
  "dateOfReturn": "2024-01-11",
}
```

### Response

Response (201 - craeted)

```json
 [
  {
    "message": "the book was successfully borrowed",
    "data": {
      "id": 1,
      "borrowingDate": "2024-01-09T17:00:00.000Z",
      "dateOfReturn": "2024-01-10T17:00:00.000Z",
      "status": "Dipinjam",
      "userId": 2,
      "bookId": 1,
      "createdAt": "2024-01-09T21:10:07.000Z",
      "updatedAt": "2024-01-09T21:10:07.000Z",
      "User": {
        "id": 2,
        "email": "rina@gmail.com",
        "username": "rina",
        "role": "admin",
        "createdAt": "2024-01-09T21:09:47.000Z",
        "updatedAt": "2024-01-09T21:09:47.000Z"
      },
      "Book": {
        "id": 1,
        "title": "Entrok",
        "author": "Okky Madasari",
        "published": "2024-01-09T21:09:47.000Z",
        "createdAt": "2024-01-09T21:09:47.000Z",
        "updatedAt": "2024-01-09T21:09:47.000Z"
      }
    }
  }
]
```

Response (400 - Bad Request)

```json
{
  "message": "BorrowingDate Is Required"
}
OR
{
  "message": "dateOfReturn Is Required"
}
OR
{
  "message": "You have borrowed a book and have not returned it"
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

## 5. GET /api/notes

### Description

- get all notes and dont forget token 
- authorization for admin 

### Response

Response (200 - get all notes)

```json
[
  {
    "message": "Notes has been found",
    "data": [
      {
        "id": 1,
        "borrowingDate": "2024-01-08T17:00:00.000Z",
        "dateOfReturn": "2024-01-10T17:00:00.000Z",
        "status": "Dipinjam",
        "userId": 2,
        "bookId": 1,
        "createdAt": "2024-01-09T21:10:07.000Z",
        "updatedAt": "2024-01-09T21:10:07.000Z",
        "User": {
          "id": 2,
          "email": "rina@gmail.com",
          "username": "rina",
          "role": "admin",
          "createdAt": "2024-01-09T21:09:47.000Z",
          "updatedAt": "2024-01-09T21:09:47.000Z"
        },
        "Book": {
          "id": 1,
          "title": "Entrok",
          "author": "Okky Madasari",
          "published": "2024-01-09T21:09:47.000Z",
          "createdAt": "2024-01-09T21:09:47.000Z",
          "updatedAt": "2024-01-09T21:09:47.000Z"
        }
      }
    ]
  }
]
```


Response (401 - authentication)

```json
{
  "message": "you are not authentication"
}
```

Response (403 - authorization)

```json
{
  "message": "forbidden"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

## 6. PATCH /api/notes/:id

### Description

- change status note

### Request:

- Body:

```json
{
  "status": "Dikembalikan",
}
```

### Response

Response (200 - updated)

```json
 [
  {
    "message": "Status has been updated",
    "data": {
      "id": 1,
      "borrowingDate": "2024-01-08T17:00:00.000Z",
      "dateOfReturn": "2024-01-10T17:00:00.000Z",
      "status": "Dikembalikan",
      "userId": 2,
      "bookId": 1,
      "createdAt": "2024-01-09T21:10:07.000Z",
      "updatedAt": "2024-01-09T21:17:42.000Z",
      "User": {
        "id": 2,
        "email": "rina@gmail.com",
        "username": "rina",
        "role": "admin",
        "createdAt": "2024-01-09T21:09:47.000Z",
        "updatedAt": "2024-01-09T21:09:47.000Z"
      },
      "Book": {
        "id": 1,
        "title": "Entrok",
        "author": "Okky Madasari",
        "published": "2024-01-09T21:09:47.000Z",
        "createdAt": "2024-01-09T21:09:47.000Z",
        "updatedAt": "2024-01-09T21:09:47.000Z"
      }
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

Response (403 - authorization)

```json
{
  "message": "forbidden"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```