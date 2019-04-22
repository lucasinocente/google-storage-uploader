const express = require('express')
const app = express()
const api = require('./api/storage')

var multer  = require('multer')
var Multer = multer()

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', async function (req, res) {
  const buckets = await api.listBuckets()
  res.render('pages/index', { buckets })
})

app.get('/files/:bucket', async function (req, res) {
  const { bucket } = req.params
  const files = await api.getBucketFiles(bucket)
  res.render('pages/files', { files, bucket })
})

app.get('/upload/', async function (req, res) {
  const buckets = await api.listBuckets()
  res.render('pages/upload', { buckets })
})

app.post('/uploadfiles', Multer.array('file', 12), api.upload)

app.listen(process.env.POST || 8080)
console.log(`http://localhost:${process.env.POST || 8080}`)