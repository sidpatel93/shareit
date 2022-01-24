const router = require('express').Router();
const multer = require('multer')
const path = require('path')
const File = require('../models/file')
const {v4: uuid4 } = require('uuid')


// Configure the disk storage
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${(Math.random() * 1E9)}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

let upload = multer({
  storage: storage,
  limit: {fileSize: 1000000 * 100},
}).single('myfile')

router.post('/', (req, res) => {
  

  // Store the file
    upload(req, res, async (err) => {

      // Validate the request
      if(!req.file) {
        return res.json({
          error: 'All fields are required'
        })
      }

      if(err) {
        return res.status(500).send({error: err.message})
      }
        // Store info in DB
        const file = new File({
          fileName: req.file.filename,
          uuid: uuid4(),
          path: req.file.path,
          fileSize: req.file.size
        });

        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});

    })
})

router.post('/send', async (req, res) => {
  const { uuid, emailTo, emailFrom }  = req.body
    // Validating the request 
  if (!uuid || !emailFrom || !emailTo) {
    return res.status(422).send({error: 'All fields are required'});
  }

  // Get the data from DB
  const file = await File.findOne({uuid: uuid});
  // If we already send the email to sender then, return error
  if(file.sender) {
    return res.status(422).send({error: 'Email already sent.'});
  }
  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();

  // Send email
  const sendMail = require('../helpers/emailService')
  sendMail({
    from: emailFrom,
    to: emailTo,
    subject: "shareIt fileshare",
    text: `${emailFrom} share a file with you`,
    html: require('../helpers/emailTemplate')({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.fileSize/1000) + 'KB',
      expires: '24 Hours'
    })
  })

  return res.send({success: true})

})

module.exports = router