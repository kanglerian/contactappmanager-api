import express from 'express';
import axios from 'axios';
import cors from 'cors';
import expressLayouts from 'express-ejs-layouts';
import { getAllContacts, getContact, addContact, deleteContact } from './controllers/apiContacts.js';
import { getDetailContact, addDetailContact, deleteDetailContact } from './controllers/apiDetailContact.js';
import { addPlatform, deletePlatform, getAllPlatforms, getPlatform } from './controllers/apiPlatforms.js';

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
            contacts: response.data,
            url: req.url
        });
    });
});

app.get('/detail/:id', (req, res) => {
    axios.all([
        axios.get(`http://localhost:3000/api/contact/${req.params.id}}`),
        axios.get(`http://localhost:3000/api/detail/${req.params.id}`),
        axios.get(`http://localhost:3000/api/platforms`),
    ])
    .then(axios.spread((biodata, detail, platform) => {
        res.render('detail',{
            layout: 'layouts/dashboard',
            biodata: biodata.data,
            details: detail.data,
            platforms: platform.data,
            url: req.url
        });
    }));
});

app.delete('/deletecontact', async (req, res) => {
    await axios.delete(`http://localhost:3000/api/deletecontact`,{
        data: {
            id: req.body.id
        }
    })
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

app.get('/platforms', (req, res) => {
    axios.get('http://localhost:3000/api/platforms')
    .then((response) => {
        res.render('platforms',{
            layout: 'layouts/dashboard',
            platforms: response.data,
            url: req.url
        });
    });
});

app.post('/addplatform', (req, res) => {
    axios.post(`http://localhost:3000/api/addplatform`,{
        nama: req.body.nama
    })
    .then(() => {
        res.redirect('/platforms');
    });
});

app.delete('/deleteplatform', (req, res) => {
    axios.delete(`http://localhost:3000/api/deleteplatform`,{
        data: {
            id: req.body.id
        }
    })
    .then(() => {
        res.redirect('/platforms');
    })
    .catch((error) => {
        res.send(error);
    });
});

app.post('/addcontactdetail', (req, res) => {
    axios.post(`http://localhost:3000/api/addcontactdetail`, {
        id_biodata: req.body.id_biodata,
        id_sosial_media: req.body.id_sosial_media,
        url: req.body.url,
        status: req.body.status
    })
    .then(() => {
        res.redirect('back');
    });
});

app.delete('/deletecontactdetail', (req, res) => {
    axios.delete('http://localhost:3000/api/deletecontactdetail',{
        data: {
            id: req.body.id
        }
    })
    .then(() => {
        res.redirect('back');
    });
});

app.use('/api/contacts', getAllContacts);
app.use('/api/contact/:id', getContact);
app.use('/api/addcontact', addContact);
app.use('/api/deletecontact', deleteContact);

app.use('/api/platforms', getAllPlatforms);
app.use('/api/platform/:id', getPlatform);
app.use('/api/addplatform', addPlatform);
app.use('/api/deleteplatform', deletePlatform);

app.use('/api/detail/:id', getDetailContact);
app.use('/api/addcontactdetail', addDetailContact);
app.use('/api/deletecontactdetail', deleteDetailContact);

app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));