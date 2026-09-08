export function problem(res, status, title, detail, type = `https://campuseats.example.com/problems/${status}`) {
  const body = JSON.stringify({ type, title, status, detail });
  if (!res.headersSent) {
    res.writeHead(status, { 'content-type': 'application/problem+json; charset=utf-8' });
  }
  res.end(body);
}

export class HttpProblem extends Error {
  constructor(status, title, detail, type) {
    super(detail);
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.type = type;
  }
}
