const multer=require('multer')

const storage=multer.memoryStorage();

// for single upload

const singleUpload=multer({storage}).single("file")

//multiple Upload

const multipleUpload=multer({storage}).array("file",5)//this 5 deside how many image you wnat to upload

module.exports={singleUpload,multipleUpload}