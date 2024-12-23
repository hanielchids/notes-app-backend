const Note = require('../models/Note');

exports.createNote = async (req, res) => {
    const { title, description } = req.body;
    try {
        const note = await Note.create({ title, description, userId: req.user.id });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create note' });
    }
};

exports.uploadAudio = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const noteId = req.params.noteId;

    try {
        const note = await Note.findByPk(noteId);
        if (!note || note.userId !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        note.audioPath = `/uploads/${req.file.filename}`;
        await note.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Failed to upload audio' });
    }
};
