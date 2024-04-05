const express = require('express');
const app = express();
const port = 3000;
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const koneksi = mariadb.createPool({
    host:'localhost', 
    user: 'root',
    password: '',
    database: 'latihan',
});

app.get('/users', async(req,res) =>{
    try {
      const konek = await koneksi.getConnection();
      const data = await konek.query('select * from users');
      res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/users', async(req,res) =>{
    try {
      const konek = await koneksi.getConnection();
      const {username,password,nama} = req.body;
      const [{insertId}] = await konek.query(`insert into users (username,password,nama)values(?,?,?)`,[username,password,nama]);
      res.status(200).json({
        message:"user creat",
      });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});

app.get('/',(_req,res) =>{
    res.send('hello word!')
});

app.post('/',(_req,res) =>{
    res.send('hello word!')
});

app.listen(port, () => {
console.log(`server is running at http://localhost:${port}`)
});