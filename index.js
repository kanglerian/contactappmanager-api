import express from 'express';
import axios from 'axios';
import cors from 'cors';
import expressLayouts from 'express-ejs-layouts';
import { getAllContacts, getDetailContact, getAllPlatforms, getContact, addContact, deleteContact, getPlatform, addPlatform } from './controllers/apiContacts.js';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

import methodOverride from 'method-override';
app.use(methodOverride('_method'));

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
    axios.all([
        axios.get(`http://localhost:3000/api/contact/${req.params.id}}`),
        axios.get(`http://localhost:3000/api/detail/${req.params.id}`),
    ])
    .then(axios.spread((biodata, detail) => {
        res.render('detail',{
            layout: 'layouts/dashboard',
            biodata: biodata.data,
            platforms: detail.data,
        });
    }));
});

app.delete('/deletecontact', (req, res) => {
    axios.get(`http://localhost:3000/api/deletecontact/${req.body.id}`)
    .then(() => {
        res.redirect('/');
    })
    .catch((error) => {
        res.send(error);
    });
});

app.post('/addcontact', (req, res) => {
    axios.post(`http://localhost:3000/api/addcontact`,{
        nama_lengkap: req.body.nama_lengkap,
        email: req.body.email,
        nohp: req.body.nohp
    })
    .then(() => {
        res.redirect('/');
    });
});

app.use('/api/contacts', getAllContacts);
app.use('/api/addcontact', addContact);
app.use('/api/deletecontact/:id', deleteContact);
app.use('/api/contact/:id', getContact);

app.use('/api/platforms', getAllPlatforms);
app.use('/api/platform/:id', getPlatform);
app.use('/api/addplatform', addPlatform);

app.use('/api/detail/:id', getDetailContact);

app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));