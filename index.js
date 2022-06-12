import express from 'express';
import cors from 'cors';
import axios from 'axios';
import expressLayouts from 'express-ejs-layouts';
import { getAllContacts, getDetailContact, getAllPlatform, getContact } from './controllers/contacts.js';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    axios.get('http://localhost:3000/api/contacts/')
    .then((response) => {
        res.render('index',{
            layout: 'layouts/dashboard',
            contacts: response.data
        });
    });
});

app.get('/detail/:id', (req, res) => {
    axios.get(`http://localhost:3000/api/detail/${req.params.id}`)
    .then((response) => {
        res.render('detail',{
            layout: 'layouts/dashboard',
            platforms: response.data
        });
    });
});

app.use('/api/contacts', getAllContacts);
app.use('/api/contact/:id', getContact);
app.use('/api/platform', getAllPlatform);
app.use('/api/detail/:id', getDetailContact);

app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));