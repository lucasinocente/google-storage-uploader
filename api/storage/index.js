if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const { Storage } = require('@google-cloud/storage')
const storage = new Storage()

const upload = async (req, res) => {
  const { files } = req
  const { bucketName } = req.body
  if (!files || !bucketName)
    return res.sendStatus(500)

  await uploadToGPS(files, bucketName)
  res.sendStatus(200)
}

const uploadToGPS = async (files, bucketName) => {
  bucket = storage.bucket(bucketName)
  files.forEach(file => {
    const upload = bucket.file( `${Date.now()}.${file.originalname}` )
    const stream = upload.createWriteStream({
      metadata: { contentType: file.mimetype },
      resumable: false
    })
    stream.on('error', (error) => {
      console.log(error)
      return error
    })
    stream.on('finish', () => {
      upload.makePublic().then(() => {
      })
    })
    stream.end(file.buffer)
  })
}

const listBuckets = async () => {
  const [ buckets ] = await storage.getBuckets()
  return buckets
}

const getBucketFiles = async (bucket) => {
  const [ files ] = await storage.bucket(bucket).getFiles();
  return files
}

module.exports = {
  upload,
  listBuckets,
  getBucketFiles
}