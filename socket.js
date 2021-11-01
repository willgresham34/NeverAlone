const express = require("express");
const socket = io(PORT);

socket.on('chat-message', data => {
    console.log(data);
});