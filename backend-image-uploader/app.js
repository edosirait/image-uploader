require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors( { origin: 'http://localhost:4200' }));

mongoose.connect(process.env.MONGO_URI);
const conn = mongoose.connection;

let gfs;
conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// === API UPLOAD ===
app.post('/upload', upload.single('image'), (req, res) => {
    if (!gfs) return res.status(503).json({ error: 'GridFS Not Ready' });
    if (!req.file) return res.status(400).json({ error: 'File not found' });

    const readableStream = Readable.from(req.file.buffer);
    const uploadStream = gfs.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
        metadata: {
            uploadDate: new Date(),
            uploader: 'API',
            fileSize: req.file.size,
            filename: req.file.originalname,
        }
    });

    readableStream.pipe(uploadStream)
        .on('error', (err) => res.status(500).json({ error: err.message }))
        .on('finish', () => { res.status(201).json({
            message: 'Upload complete',
            file: {
                _id: uploadStream.id,
                filename: req.file.originalname,
                contentType: req.file.mimetype,
                metadata: uploadStream.options.metadata
            }
        });
     });
});

// === API DOWNLOAD ===
app.get('/files/:filename', (req, res) => {
    if (!gfs) return res.status(503).json( {error: 'GridFS not Ready'} );

    const downloadStream = gfs.openDownloadStreamByName(req.params.filename);
    downloadStream
        .on('error', () => res.status(404).json({ error: 'File not found' }))
        .pipe(res);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
