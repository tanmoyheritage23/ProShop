/* import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

export default router;
*/

import express from 'express';
import multer from 'multer';
import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const router = express.Router();

// Configure Multer to store in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadSingleImage = upload.single('image');

// Azure Blob Storage setup
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME;

if (!AZURE_STORAGE_CONNECTION_STRING || !CONTAINER_NAME) {
  throw new Error('Azure storage environment variables are missing.');
}

// Create BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

router.post('/', uploadSingleImage, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    const fileName = `uploads/${uuidv4()}-${req.file.originalname}`;

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Upload the file
    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    // Get public URL
    const imageUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER_NAME}/${fileName}`;

    res.status(200).send({
      message: 'Image uploaded successfully',
      image:imageUrl, // Public URL of uploaded image
    });
  } catch (error) {
    console.error('Error uploading to Azure:', error.message);
    res.status(500).send({ message: 'Failed to upload image' });
  }
});

export default router;