# User API Spec

### yaitu dukumentasi API yang telah disetujui oleh tim frontend, backend, dan mobile.

### Memberitahukan endpoint API nya apa, resquestnya apa, dan response nya apa.

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "nabil",
  "password": "rahasia",
  "name": "Mohammad Nabil"
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "nabil",
    "name": "Mohammad Nabil"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Usernama must not blank,..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "nabil",
  "password": "rahasia"
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "nabil",
    "name": "Mohammad Nabil",
    "token": "token1313232324463455"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Usernama or password wrong,..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "username": "nabil",
    "name": "Mohammad Nabil"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized,..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "password": "rahasia", // tidak wajib
  "name": "nabil" // tidak wajib
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "nabil",
    "name": "Mohammad Nabil"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized,..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized,..."
}
```
