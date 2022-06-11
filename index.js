import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import { getAllContacts, getDetailContact, getAllPlatform, getContact } from './controllers/contacts.js';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/contacts', getAllContacts);
app.use('/api/contact/:id', getContact);
app.use('/api/platform', getAllPlatform);
app.use('/api/detail/:id', getDetailContact);

app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));