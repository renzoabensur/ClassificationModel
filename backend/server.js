const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
