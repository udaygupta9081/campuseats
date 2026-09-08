import http from 'node:http';

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/payments') {
    let body = '';
    for await (const chunk of req) body += chunk;
    console.log('Payment Service received:', body);
    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ transactionId: 'txn-local-001', status: 'APPROVED' }));
    return;
  }
  res.writeHead(404); res.end();
});

server.listen(4001, () => console.log('Mock CampusEats Payment Service on http://localhost:4001'));
