# HTTP Request/Response Log

## Request 1 — Get All Posts

### Command

```bash
curl.exe -i https://jsonplaceholder.typicode.com/posts
```

### Request

```http
GET /posts HTTP/1.1
Host: jsonplaceholder.typicode.com
```

### Response

```http
HTTP/1.1 200 OK
Date: Sat, 15 Aug 2026 07:12:02 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
access-control-allow-credentials: true
Cache-Control: max-age=43200
Server: cloudflare
x-powered-by: Express
```

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  }

  ... remaining posts returned by the server ...

  {
    "userId": 10,
    "id": 100,
    "title": "at nam consequatur ea labore ea harum",
    "body": "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
  }
]
```

### Explanation

`200 OK` means the server successfully processed the request.

`Content-Type: application/json` means that the response body is JSON data.

The `/posts` endpoint returns a collection of posts. The response contains 100 posts, with each post containing a `userId`, `id`, `title`, and `body`.

---

## Request 2 — Get One Post

### Command

```bash
curl.exe -i https://jsonplaceholder.typicode.com/posts/1
```

### Request

```http
GET /posts/1 HTTP/1.1
Host: jsonplaceholder.typicode.com
```

### Response

```http
HTTP/1.1 200 OK
Date: Sat, 15 Aug 2026 07:12:53 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 292
Connection: keep-alive
access-control-allow-credentials: true
Cache-Control: max-age=43200
Server: cloudflare
x-powered-by: Express
```

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

### Explanation

`200 OK` means the server successfully processed the request.

The `/posts/1` endpoint returns the post whose ID is `1`.

The response is JSON because the `Content-Type` header is `application/json; charset=utf-8`.

The returned object contains the post's `userId`, `id`, `title`, and `body`.

---

## Request 3 — Get One User

### Command

```bash
curl.exe -i https://jsonplaceholder.typicode.com/users/1
```

### Request

```http
GET /users/1 HTTP/1.1
Host: jsonplaceholder.typicode.com
```

### Response

```http
HTTP/1.1 200 OK
Date: Sat, 15 Aug 2026 07:13:42 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 509
Connection: keep-alive
access-control-allow-credentials: true
Cache-Control: max-age=43200
Server: cloudflare
x-powered-by: Express
```

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### Explanation

`200 OK` means the server successfully processed the request.

The `/users/1` endpoint returns information about user `1`.

The response contains information such as the user's name, username, email, address, phone number, website, and company.

`Content-Type: application/json` indicates that the response body is JSON data.

---

## Request 4 — Get Comments for a Post

### Command

```bash
curl.exe -i https://jsonplaceholder.typicode.com/posts/1/comments
```

### Request

```http
GET /posts/1/comments HTTP/1.1
Host: jsonplaceholder.typicode.com
```

### Response

```http
HTTP/1.1 200 OK
Date: Sat, 15 Aug 2026 07:14:15 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
access-control-allow-credentials: true
Cache-Control: max-age=43200
Server: cloudflare
x-powered-by: Express
```

```json
[
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    "postId": 1,
    "id": 2,
    "name": "quo vero reiciendis velit similique earum",
    "email": "Jayne_Kuhic@sydney.com",
    "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    "postId": 1,
    "id": 3,
    "name": "odio adipisci rerum aut animi",
    "email": "Nikita@garfield.biz",
    "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  },
  {
    "postId": 1,
    "id": 4,
    "name": "alias odio sit",
    "email": "Lew@alysha.tv",
    "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
  },
  {
    "postId": 1,
    "id": 5,
    "name": "vero eaque aliquid doloribus et culpa",
    "email": "Hayden@althea.biz",
    "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
  }
]
```

### Explanation

`200 OK` means the server successfully processed the request.

The `/posts/1/comments` endpoint returns the comments associated with post `1`.

The response is a JSON array containing five comments.

Each comment contains a `postId`, `id`, `name`, `email`, and `body`.

---

## Request 5 — Request a Non-Existing Post

### Command

```bash
curl.exe -i https://jsonplaceholder.typicode.com/posts/999999
```

### Request

```http
GET /posts/999999 HTTP/1.1
Host: jsonplaceholder.typicode.com
```

### Response

```http
HTTP/1.1 404 Not Found
Date: Sat, 15 Aug 2026 07:14:53 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 2
Connection: keep-alive
access-control-allow-credentials: true
Cache-Control: max-age=43200
Server: cloudflare
x-powered-by: Express
```

```json
{}
```

### Explanation

`404 Not Found` means that the requested resource could not be found.

The request asks for post `999999`, but that post does not exist in the JSONPlaceholder data.

The server therefore returns the `404 Not Found` status code instead of a post object.

The response body is an empty JSON object `{}`.
