const bookService = require('../services/bookService');

class BookController {
  async searchBooks(req, res) {
    try {
      const { query, limit = 10 } = req.query;

      if (!query) {
        return res.status(400).json({ error: 'Query é obrigatório' });
      }

      const books = await bookService.searchBooks(query, parseInt(limit));
      
    
      const booksWithCovers = books.map((book) => ({
        ...book,
        cover_url: book.cover_id
          ? bookService.getCoverUrl(book.cover_id)
          : null,
      }));

      res.json(booksWithCovers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchByAuthor(req, res) {
    try {
      const { author, limit = 10 } = req.query;

      if (!author) {
        return res
          .status(400)
          .json({ error: 'Parâmetro author é obrigatório' });
      }

      const books = await bookService.searchByAuthor(author, parseInt(limit));
      
      
      const booksWithCovers = books.map((book) => ({
        ...book,
        cover_url: book.cover_id
          ? bookService.getCoverUrl(book.cover_id)
          : null,
      }));

      res.json(booksWithCovers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBookDetails(req, res) {
    try {
      const { bookId } = req.params;

      const bookDetails = await bookService.getBookDetails(bookId);
      bookDetails.cover_url = bookDetails.cover_id
        ? bookService.getCoverUrl(bookDetails.cover_id, 'L')
        : null;

      res.json(bookDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BookController();

