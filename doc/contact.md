# Contact API Spec

### yaitu dukumentasi API yang telah disetujui oleh tim frontend, backend, dan mobile.

### Memberitahukan endpoint API nya apa, resquestnya apa, dan response nya apa.

## Create Contact

Endpoint : POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Mohammad Nabil",
  "last_name": "Fadilah",
  "email": "nabil@gmail.com",
  "phone": "085772828119"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Mohammad Nabil",
    "last_name": "Fadilah",
    "email": "nabil@gmail.com",
    "phone": "085772828119"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Firstnama must not blank,..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Mohammad Nabil",
    "last_name": "Fadilah",
    "email": "nabil@gmail.com",
    "phone": "085772828119"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Contact is not found,..."
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Mohammad Nabil",
  "last_name": "Fadilah",
  "email": "nabil@gmail.com",
  "phone": "089772828119"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Mohammad Nabil",
    "last_name": "Fadilah",
    "email": "nabil@gmail.com",
    "phone": "089772828119"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Firstnama must not blank,..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

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
  "errors": "Contact is not found,..."
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :

- name : string, contact first name or contact last name, optional
- phone : string, contct phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Mohammad Nabil",
      "last_name": "Fadilah",
      "email": "nabil@gmail.com",
      "phone": "085772828119"
    },
    {
      "id": 2,
      "first_name": "Mohammad Nabil",
      "last_name": "Fadilah",
      "email": "nabil@gmail.com",
      "phone": "085772828119"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized,..."
}
```
