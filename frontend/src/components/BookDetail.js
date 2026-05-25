import React from 'react';

function BookDetail({ book, onBack }) {
  return (
    <div className="card">
      <div className="card-body">
        <button className="btn btn-secondary mb-3" onClick={onBack}>
          ← Voltar
        </button>

        <div className="row">
          <div className="col-md-4">
            {book.cover_url && (
              <img
                src={book.cover_url}
                alt={book.title}
                className="img-fluid rounded"
              />
            )}
            {!book.cover_url && (
              <div
                className="bg-secondary d-flex align-items-center justify-content-center rounded"
                style={{ height: '400px' }}
              >
                <span className="text-white">Sem Capa</span>
              </div>
            )}
          </div>

          <div className="col-md-8">
            <h2>{book.title}</h2>
            <p className="text-muted">
              <strong>Autor:</strong> {book.author}
            </p>
            <p>
              <strong>Ano de Publicação:</strong> {book.year || 'N/A'}
            </p>
            <p>
              <strong>Número de Páginas:</strong> {book.pages || 'N/A'}
            </p>
            {book.isbn && (
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
            )}
            <hr />
            <h5>Descrição</h5>
            <p>{book.description || 'Descrição não disponível'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
