const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let licenses = [];
let currentId = 1;

app.post('/api/licenses', (req, res) => {
    const license = {
        id: currentId++,
        ...req.body
    };
    licenses.push(license);
    res.json(license);
});

app.get('/api/licenses', (req, res) => {
    res.json(licenses);
});

app.put('/api/licenses/:id', (req, res) => {
    const { id } = req.params;
    const index = licenses.findIndex(license => license.id === parseInt(id));

    if (index !== -1) {
        licenses[index] = { id: parseInt(id), ...req.body };
        res.json(licenses[index]);
    } else {
        res.status(404).json({ error: 'License not found' });
    }
});

app.delete('/api/licenses/:id', (req, res) => {
    const { id } = req.params;
    const index = licenses.findIndex(license => license.id === parseInt(id));

    if (index !== -1) {
        licenses.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'License not found' });
    }
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
