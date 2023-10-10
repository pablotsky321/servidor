const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cuban'
});

db.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos: ' + err.message);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });


  app.get('/api/productos', (req, res) => {
    const sql = 'SELECT * FROM producto'; 
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener registros:', err);
        res.status(500).json({ error: 'Error al obtener registros' });
      } else {
        res.json(result);
      }
    });
  });

  app.get('/api/productos/:id_producto', (req, res) => {
    const id_producto = `'`+req.params.id_producto+`'`;
    const sql=`select * from producto where id=`+id_producto;
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener registros:', err);
        res.status(500).json({ error: 'Error al obtener registros' });
      } else {
        res.json(result);
      }
    });
  });

  app.get('/api/clientes/login', (req, res) => {

    const DATA= {correo,clave};
    const sql='select * from cliente where correo = ? and clave = ?'

    db.query(sql, DATA ,(err, result) => {
      if (err) {
        console.error('Error al obtener registros:', err);
        res.status(500).json({ error: 'Error al obtener registros' });
      } else {
        res.json(result);
        console.log(res.json(result));
      }
    });
  });

  app.post('/registro_cliente', (req, res) => {
    const { correo,nombres,apellidos,telefono,clave} = req.body; 
  
    const sql = 'INSERT INTO cliente (correo,nombres,apellidos,telefono,clave ) VALUES (?,?,?,?,?)';
  
    db.query(sql, [correo,nombres,apellidos,telefono,clave], (err, result) => {
      if (err) {
        console.error('Error al insertar datos:', err);
        res.status(500).json({ message: 'Error al insertar datos en la base de datos' });
      } else {
        console.log('Datos insertados correctamente');
        res.status(200).json({ message: 'Datos insertados correctamente' });
      }
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});