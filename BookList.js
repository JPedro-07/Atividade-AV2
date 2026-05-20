import React from 'react';

function BookList({ books, onSelectBook }) {
  return (
    <div className="row">
      {books.map((book) => (
        <div key={book.id} className="col-md-6 col-lg-4 mb-4">
          <div
            className="card h-100 book-card cursor-pointer"
            onClick={() => onSelectBook(book)}
          >
            {book.cover_url && (
              <img
                src={book.cover_url}
                className="card-img-top book-cover"
                alt={book.title}
                style={{ height: '300px', objectFit: 'cover' }}
              />
            )}
            {!book.cover_url && (
              <div
                className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                style={{ height: '300px' }}
              >
                <span className="text-white">Sem Capa</span>
              </div>
            )}
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text text-muted">{book.author}</p>
              <p className="card-text small">
                <strong>Ano:</strong> {book.year}
              </p>
              <button className="btn btn-sm btn-primary w-100">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
