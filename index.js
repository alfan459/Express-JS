const express = require('express')
const app = express()
const port = 3000
// variable untuk parsing data post
const bodyParser = require('body-parser')

// format parsing
app.use(bodyParser.json())

// file koneksi ke connection.js
const db = require('./connection')

// mengambil hasil parsingan database yang telah disimpan di file response.js
const response = require('./response')

// routes / URL / endpoint utama kita method GET
app.get('/', (req, res) => {
  const sql = "SELECT * FROM mahasiswa" 
  db.query(sql, (error, result) => {
    // hasil data dari mysql
    //res.send(result)
    response(200, result, "get all data from mahasiswa", res)
  })
})

// coba get
app.get('/mahasiswa', (req, res) =>{
  const sql = 'SELECT * FROM mahasiswa'
  db.query(sql, (error, result) => {
    if(error) throw error
    response(200, result, "get all data from mahasiswa", res)
    console.log(result)
  })
})

// coba parser get
app.get('/find', (req, res) => {
  const nim = req.query.nim
  const sql = 'SELECT nama_lengkap FROM mahasiswa WHERE nim = ' + nim
  console.log("find nim: ", nim)

  db.query(sql, (error, result) =>{
    response(200, result, "get data mahasiswa from nim", res)
  })
})

// coba post
app.post('/mahasiswa',(req, res)=> {
  const {nim, namaLengkap, kelas, alamat} = req.body
  console.log(req.body)
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`
 
  db.query(sql, (error, result)=>{
    if(error) {
      res.send("data gagal masuk")
      throw error
    }
    if(result?.affectedRows) {
      console.log("data masuk")
      response(200, req.body, "data berhasil ditambahkan", res)
    }
    else{
      console.log("data gagal masuk")
    }
    console.log(result)
  })
})

// coba put
app.put('/mahasiswa', (req, res) => {
  const {nim, namaLengkap, kelas, alamat} = req.body
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`
  
  db.query(sql, (error, result)=>{
    if(error) {
      res.send("data gagal diupdate")
      throw error
      // response(500, "invalid error", "error", res)
    }
    if(result.affectedRows) {
      res.send("data berhasil diupdate")
      // response(200, "update done", "data berhasil diupdate", res)
    }
    else{
      console.log("data gagal update")
    }
    // response(200, "update done", "data diupdate", res)
  })
})

// coba delete
app.delete('/mahasiswa', (req, res) => {
  const {nim} = req.body
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
  
  db.query(sql, (error, result)=>{
    if(error) {
      res.send("data gagal dihapus")
      throw error
      // response(500, "invalid error", "error", res)
    }
    if(result.affectedRows) {
      res.send("data berhasil dihapus")
      // response(200, "update done", "data berhasil diupdate", res)
    }
    else{
      console.log("data gagal hapus")
    }
    // response(200, "update done", "data diupdate", res)
  })
})

app.get('/hello', (req, res) => {
  console.log({urlParam: req.query.pass})
  res.send('Hello World! ini adalah percobaan PosStr')
})

app.get('/route', (req, res) => {
    res.send('api baru!')
})

// mencoba post
app.post('/login', (req, res) => {
  console.log({ requestFromOutside: req.body})
  const username = req.body.username
  const password = req.body.password
  if(username === "alfan risqi wahyudi" && password === "admin123"){
    res.send('login berhasil')
    console.log("Berhasil login")
  }
  else{
    res.send('username atau password yang anda masukan salah')
    console.log("username atau password yang anda masukan salah")
  }
})


// mencoba put, mengubah sesuatu / update
app.put('/username', (req, res) => {
  console.log({updateData: req.body})
  res.send("update berhasil")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})