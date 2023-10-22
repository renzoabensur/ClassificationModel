const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:3001' // Only allow requests from this origin
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.post('/data', (req, res) => {
    console.log(req.body);  // Log the received data
    res.json({ message: "Data received!" });
});

// Create an HTTP server by hand for both Express app and WebSocket server
const server = http.createServer(app);

// Create a WebSocket server by passing the created HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Received message:', message);
    });
    ws.send('Hello from WebSocket server!');
});

// Use server (not app) to listen on PORT
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});