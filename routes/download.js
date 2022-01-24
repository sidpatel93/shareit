const router = require('express').Router();
const File = require('../models/file')


router.get('/:uuid', async (req, res) => {
  const file = await File.findOne({uuid: req.params.uuid})
  if(!file) {
    return res.render('download', {error: 'Link is not valid' })
  }

  // If the file exist in the database then, get a path for the file and download the file
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);

})

module.exports = router;