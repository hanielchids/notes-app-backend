const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const { createNote, uploadAudio } = require('../controllers/noteController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, createNote);
router.post('/:noteId/audio', authMiddleware, upload.single('audio'), uploadAudio);

module.exports = router;
