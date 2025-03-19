const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

const conn = mongoose.connection;

let gfs;
conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     description: Upload an image to the server
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       500:
 *         description: Internal server error
 */
router.post('/upload', multer().single('image'), (req, res) => {
    res.status(201).json({ message: 'Image uploaded successfully' });
});

/**
 * @swagger
 * /files/{filename}:
 *   get:
 *     summary: Download a file by filename
 *     description: Download a file from the server using its filename
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The filename of the file to download
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       503:
 *         description: GridFS not ready
 */
router.get('/files/:filename', (req, res) => {
    if (!gfs) return res.status(503).json({ error: 'GridFS not Ready' });

    const downloadStream = gfs.openDownloadStreamByName(req.params.filename);
    downloadStream
        .on('error', () => res.status(404).json({ error: 'File not found' }))
        .pipe(res);
});

module.exports = router;
