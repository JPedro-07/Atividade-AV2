const axios = require('axios');

const OPEN_LIBRARY_API = 'https://openlibrary.org';

class BookService {
  // Buscar livros por palavra-chave
  async searchBooks(query, limit = 10) {
    try {
      const response = await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
        params: {
          title: query,
          limit: limit,
        },
      });

      return response.data.docs.map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Desconhecido',
        year: book.first_publish_year || 'N/A',
        isbn: book.isbn ? book.isbn[0] : null,
        cover_id: book.cover_i || null,
      }));
    } catch (error) {
      console.error('Erro ao buscar livros:', error.message);
      throw new Error('Erro ao buscar livros na API externa');
    }
  }

  // Buscar por autor
  async searchByAuthor(author, limit = 10) {
    try {
      const response = await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
        params: {
          author: author,
          limit: limit,
        },
      });

      return response.data.docs.map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Desconhecido',
        year: book.first_publish_year || 'N/A',
        isbn: book.isbn ? book.isbn[0] : null,
        cover_id: book.cover_i || null,
      }));
    } catch (error) {
      console.error('Erro ao buscar por autor:', error.message);
      throw new Error('Erro ao buscar livros por autor');
    }
  }

  // Obter detalhes do livro
  async getBookDetails(bookId) {
    try {
      const path = bookId.startsWith('/') ? bookId : `/works/${bookId}`;
      const response = await axios.get(`${OPEN_LIBRARY_API}${path}.json`);

      const book = response.data;
      return {
        id: bookId,
        title: book.title,
        author: book.authors
          ? book.authors.map((a) => a.name || a.author?.name).join(', ')
          : 'Desconhecido',
        description:
          book.description && typeof book.description === 'string'
            ? book.description
            : book.description?.value || 'Sem descrição',
        pages: book.number_of_pages || book.pagination || 'N/A',
        isbn: book.isbn_13 ? book.isbn_13[0] : book.isbn_10 ? book.isbn_10[0] : null,
        cover_id: book.covers ? book.covers[0] : null,
      };
    } catch (error) {
      console.error('Erro ao obter detalhes do livro:', error.message);
      throw new Error('Erro ao obter detalhes do livro');
    }
  }

  // Gerar URL da capa do livro
  getCoverUrl(coverId, size = 'M') {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
}

module.exports = new BookService();
