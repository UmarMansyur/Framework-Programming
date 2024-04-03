const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const mariadb = require('mariadb');
app.use(bodyParser.json());

const connection = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coba'
});

app.get('/' ,(req, res) =>{
    res.send('Halo Dunia');
});

app.post('/', (req, res) =>{
    res.send('Ini post');
});

app.get('/siswa', async(req, res) =>{
    try {
        conn = await connection.getConnection();
        const data = await conn.query('SELECT * FROM siswa');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/siswa', async(req, res) =>{
    try {
        conn = await connection.getConnection();
        const{nama, alamat, umur} = req.body;
        if (!nama||!alamat||!umur) {
            res.status(404).send('Data tidak boleh ada yang kosong');
        } else {
            conn.query(`INSERT INTO siswa (nama, alamat, umur) VALUES (?,?,?)`,[nama,alamat,umur]);
            res.status(200).send('Data berhasil di tambah'); 
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log('example app listening on port : ' + port);
});