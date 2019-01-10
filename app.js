/**
HTTP Methods & Routing
*/


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// JSON Middleware used to parse incoming JSON objects (i.e when using POST).
app.use(express.json());


/* Simulates database with 2 JSON objects.*/
let messages = [
    {
        id: 1,
        message: "My message 1",
    },
    {
        id: 2,
        message: "My message 2"
    }
];

/* FULL CRUD IMPLEMENTATION WITH HTTP METHODS*/

/* GET METHOD (Read) - responds to get requests @ /messages by returning objects within messages Array above. */
app.get('/messages', (request, response) => {
    // Sends messages to browser. Testable via running GET in POSTMAN or refreshing browser with /messages endpoint 
    response.send(messages);
});

/* POST METHOD (Create) - utilizes request.body(check req.body in Express documentation) to create new messages.*/
app.post('/messages', (request, response) => {
    // Add new message to messages array. Increments the id one more than the length of the array. Reads the message that is passed on the request body(req.body) and adds it to the new message.
    let newMessage = {
        id: messages.length + 1,
        message: request.body.message
    };

    // Array.push adds a new element at the end of the given Array.
    messages.push(newMessage);

    // Sends the new message to the user. Testable via running POST in POSTMAN or refreshing browser with /messages endpoint.
    response.send(newMessage);
});


/* PUT METHOD (Update) - Utilizes request.params (check req.params in Express documentation) to find the matching id. Also uses request.body(check req.body in Express documentation) to update messages. */
app.put('/messages/:id', (request, response) => {
    // Check if ID exists in Array/database by comparing an ID found in messages array with the ID parameter passed in the URL(:id).
    let existingMessage = messages.find((existing) => existing.id === parseInt(request.params.id));

    // Updates message. Reads the message that is passed on the request body(req.body) and updates it to the new message.
    existingMessage.type = request.body.type;

    // Sends the new message to the user. Testable via running PUT in POSTMAN or refreshing browser with /messages endpoint.
    response.send(existingMessage);
});


/* DELETE METHOD (Delete) - Utilizes request.params (check req.params in Express documentation) to find the matching id. */
app.delete('/messages/:id', (request, response) => {
    // Check if ID exists in Array/database by comparing an ID found in messages array with the ID parameter passed in the URL(:id).
    let existingMessage = messages.find((existing) => existing.id === parseInt(request.params.id));


    // Validate if message exists, otherwise return message to browser.
    if (!existingMessage) {
        response.send('This message does not exist')
    }

    // Add variable to store the deleted message from messages
    let deletedMessage = messages.indexOf(existingMessage);

    // Delete the existing message from array using Array.splice
    messages.splice(deletedMessage, 1);

    // Sends the new message to the user. Testable via running DELETE in POSTMAN or refreshing browser with /messages endpoint.
    response.send(existingMessage);

});

// LISTEN TO APP.
app.listen(port, () => console.log(`Got ears on ${port}`));
