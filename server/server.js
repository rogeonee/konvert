const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 3001;

// GET "Hello World"
app.get('/', (req, res) => {
    console.log('GET / aaa')
  res.send('<h1>Hello Konvert! Image Conversion Server is running.</h1>');
});

// POST Basic Image Conversion
app.post('/convert', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file uploaded.');
  }

  const quality = req.body.quality || 'medium';
  const targetFormat = req.body.format || 'png';

  try {
    const image = sharp(req.file.path);
    const info = await image.metadata();

    console.log('image metadata:', info)

    let sharpImage = image.toFormat(targetFormat);

    // Quality settings
    switch (quality) {
      case 'low':
        sharpImage = sharpImage.jpeg({ quality: 60 }).png({ quality: 60 });
        break;
      case 'medium':
        sharpImage = sharpImage.jpeg({ quality: 80 }).png({ quality: 80 });
        break;
      case 'high':
        sharpImage = sharpImage.jpeg({ quality: 100 }).png({ quality: 100 });
        break;
      default:
        sharpImage = sharpImage.jpeg({ quality: 80 }).png({ quality: 80 });
    }

    const outputFilename = `converted_${req.file.filename}.${targetFormat}`;
    await sharpImage.toFile(path.join('uploads', outputFilename));

    res.send({
      message: 'Image converted successfully',
      originalFormat: info.format,
      convertedFormat: targetFormat,
      quality: quality,
      outputFilename: outputFilename
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
