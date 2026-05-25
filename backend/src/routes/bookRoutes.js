const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Rotas
router.get('/search', (req, res) => bookController.searchBooks(req, res));
router.get('/author', (req, res) => bookController.searchByAuthor(req, res));
router.get('/:bookId', (req, res) => bookController.getBookDetails(req, res));

module.exports = router;

