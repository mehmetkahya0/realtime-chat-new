const socket = io('https://realtime-chat-new.vercel.app/');


// if socket connection was succes, print succes
socket.on('connect', function () {
    console.log('Connected to server');
});

// if socket connection was failed, print failed
socket.on('connect_error', function () {
    console.log('Failed to connect to server');
});

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

socket.on('chat message', function (msg) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageElement.classList.add('chat-message');
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();

    if (message) {
        console.log('Sending message:', message);
        socket.emit('chat message', message);
        messageInput.value = '';

    }
}
