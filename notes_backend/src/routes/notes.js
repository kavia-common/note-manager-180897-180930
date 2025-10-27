const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../store/memoryStore');

const router = express.Router();

/**
 * Validate payload for creating/updating a note.
 * Requires title (non-empty string). content is optional string.
 */
function validateNotePayload(body) {
  const errors = [];
  if (body.title === undefined || body.title === null || String(body.title).trim() === '') {
    errors.push('title is required');
  }
  if (body.content !== undefined && body.content !== null && typeof body.content !== 'string') {
    errors.push('content must be a string');
  }
  return errors;
}

/**
 * POST /notes
 * Create a new note with UUID.
 */
router.post('/', (req, res, next) => {
  try {
    const errors = validateNotePayload(req.body || {});
    if (errors.length) {
      return res.status(400).json({ error: `Validation error: ${errors.join(', ')}` });
    }
    const now = new Date().toISOString();
    const note = {
      id: uuidv4(),
      title: String(req.body.title).trim(),
      content: req.body.content ?? '',
      createdAt: now,
      updatedAt: now,
    };
    store.create(note);
    return res.status(201).json(note);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /notes
 * Return all notes.
 */
router.get('/', (req, res, next) => {
  try {
    return res.json(store.getAll());
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /notes/:id
 * Return note by id.
 */
router.get('/:id', (req, res, next) => {
  try {
    const note = store.getById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.json(note);
  } catch (err) {
    return next(err);
  }
});

/**
 * PUT /notes/:id
 * Update note title/content.
 */
router.put('/:id', (req, res, next) => {
  try {
    const errors = validateNotePayload(req.body || {});
    if (errors.length) {
      return res.status(400).json({ error: `Validation error: ${errors.join(', ')}` });
    }
    const updated = store.update(req.params.id, {
      title: String(req.body.title).trim(),
      content: req.body.content ?? '',
    });
    if (!updated) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /notes/:id
 * Remove note by id.
 */
router.delete('/:id', (req, res, next) => {
  try {
    const ok = store.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
