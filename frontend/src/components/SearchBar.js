import React from 'react';

function SearchBar({ onSearch, onSearchTypeChange, searchType, loading }) {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Buscar Livros</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-3">
              <select
                className="form-select"
                value={searchType}
                onChange={(e) => onSearchTypeChange(e.target.value)}
              >
                <option value="title">Por Título</option>
                <option value="author">Por Autor</option>
              </select>
            </div>
            <div className="col-md-9">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={
                    searchType === 'title'
                      ? 'Digite o título do livro...'
                      : 'Digite o nome do autor...'
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loading}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
