const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected:', socket.remoteAddress);

    socket.on('data', (data) => {
        console.log('Received:', data.toString());
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});