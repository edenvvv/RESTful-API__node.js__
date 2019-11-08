const express = require('express');
const app = express();
// Creates a variable using Express
app.use(express.json());

data = [];

app.get('/hello', (req, res) => {
    res.sendFile( __dirname + "/" + "hello.html" );
    // Returns the information in the file hello.html
});

app.get('/Welcome/:name', (req, res) => { // get data
    res.send( `Welcome ${req.params.name}` );
    // Returns Welcome + name received in input
});

app.get('/api', (req, res) => { // get data
    res.send(data);
    // Returns users
});

app.post('/api/add', (req, res) => { // Create data
    if (!req.body.name) {
        // Checks if a name is received else 400 error (Bad Request) is returned
        return res.status(400).send('name is required!');
    }
    // Creating a new user
    const new_api = {
        id: data.length +1,
        name: req.body.name
    };
    // Adds it to data
    data.push(new_api);
    // Returns the information
    res.send(new_api);
});

app.put('/api/update/:id', (req, res) => { // Update data
    // Checks if the user exists else 404 error (Not Found) is returned
    const user = data.find(Single => Single.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User does not exist');
    }

    if (!req.body.name) {
        // Checks if a name is received else 400 error (Bad Request) is returned
        return res.status(400).send('name is required!');
    }
    user.name = req.body.name;
    res.send(user);
});

app.delete('/api/delete/:id', (req, res) => { // delete data
    // Checks if the user exists else 404 error (Not Found) is returned
    const user = data.find(Single => Single.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User does not exist');
    }

    const index = data.indexOf(user);
    data.splice(index, 1);

    res.send(`The deleted section ${user}`);

});
const port = process.env.PORT || 1234;
// Creating a port
app.listen(port, () => console.log(`listening on port ${port}`));
