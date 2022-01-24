const router = require('express').Router();
const File = require('../models/file')

router.get('/:uuid', async (req, res) => {
  // use the uuid received from the req to find it in the db
  try {
    const file = await File.findOne({ uuid: req.params.uuid })
    // if the file does not found,  then show the error.
    if(!file) {
      return res.render('download', {error: 'Link is expired' })
    }
    return res.render('download', {
      uuid: file.uuid,
      fileName: file.fileName,
      fileSize: file.fileSize,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
    })
  } catch(err) { 
    return res.render('download', {error: 'Something went wrong' })
  }
  
})


module.exports = router;
