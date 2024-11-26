const express = require("express");
const multer = require("multer");
const z = require("zod");
const { Resume } = require("../db.js");
const { authMiddleware } = require("../middleware/middleware.js");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios")
const router = express.Router();


const resumeBody = z.object({
    title: z.string(),
	pdf: z.string()
});


// Set up Multer for file upload handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); // Set the destination for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '_' + file.originalname); // Ensuring the filename ends with .pdf
    },
});
const upload = multer({ storage: storage });

// Route for uploading the resume (PDF)
router.post('/upload', authMiddleware, upload.single('resume'),async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const userId = req.userId;
    const title = req.file.originalname;
    const fileName = req.file.filename;
    try{
        const newResume = new Resume({
            userID : userId,
            title : title,
            resume : fileName
        });
        await newResume.save();
        res.send({status:"ok"});
    } catch(error){
    res.status(200).send({
      message: 'File uploaded successfully',
      file: req.file,
    })
  }
});



router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
  
    gfs.files.findOne({ filename: filename }, (err, file) => {
      if (err || !file) {
        return res.status(404).send('File not found.');
      }
  
      // Set the content-type and stream the file to the response
      res.set('Content-Type', file.contentType);
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    });
  });




// Route for uploading resume (with upload middleware)
router.post("/upload-resume", authMiddleware, upload.single("resume"), async (req, res) => {
    if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        // Read the PDF file
        const pdfBuffer = fs.readFileSync(req.file.path);

        // Create a FormData object
        const formData = new FormData();
        formData.append('resume', pdfBuffer, {
            filename: req.file.originalname, // Use the original filename
            contentType: 'application/pdf', // Set the content type
        });

        // Configure the request
        const config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/parse_resume', // Replace with your microservice URL
            headers: {
                ...formData.getHeaders(), // Include FormData headers
            },
            data: formData,
        };

        // Send the request
        const response = await axios.request(config);
        console.log('Response from microservice:', response.data);
        console.log('doneeeeeeeeee')
        return res.status(200).json(response.data); 
    } catch (error) {
        console.error('Error sending PDF file:', error.response ? error.response.data : error.message);
    }
});

module.exports = router;
