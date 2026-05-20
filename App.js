import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('title'); // 'title' ou 'author'

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError('Por favor, insira uma palavra-chave');
      return;
    }

    setLoading(true);
    setError('');
    setSelectedBook(null);

    try {
      const endpoint =
        searchType === 'title' ? '/api/books/search' : '/api/books/author';
      const response = await axios.get(endpoint, {
        params: {
          [searchType === 'title' ? 'query' : 'author']: query,
          limit: 20,
        },
      });

      if (response.data.length === 0) {
        setError('Nenhum livro encontrado. Tente outra busca.');
        setBooks([]);
      } else {
        setBooks(response.data);
      }
    } catch (err) {
      setError('Erro ao buscar livros. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleBackToList = () => {
    setSelectedBook(null);
  };

  return (
    <div className="app">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">📚 Catálogo de Livros</span>
        </div>
      </nav>

      <div className="container">
        {!selectedBook ? (
          <>
            <SearchBar
              onSearch={handleSearch}
              onSearchTypeChange={setSearchType}
              searchType={searchType}
              loading={loading}
            />

            {error && (
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError('')}
                ></button>
              </div>
            )}

            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            )}

            {!loading && books.length > 0 && (
              <BookList books={books} onSelectBook={handleSelectBook} />
            )}

            {!loading && books.length === 0 && !error && (
              <div className="alert alert-info text-center">
                Faça uma busca para começar
              </div>
            )}
          </>
        ) : (
          <BookDetail book={selectedBook} onBack={handleBackToList} />
        )}
      </div>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>&copy; 2024 Catálogo de Livros. Powered by Open Library API</p>
      </footer>
    </div>
  );
}

export default App;
