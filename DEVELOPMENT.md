# Guia de Desenvolvimento

## Setup Inicial

### 1. Instalar Dependências Localmente

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Executar em Desenvolvimento

#### Opção A: Com Docker Compose (Recomendado)
```bash
docker-compose -f docker-compose.dev.yml up
```

#### Opção B: Localmente (sem Docker)

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

## Estrutura de Código

### Backend

**Arquitetura MVC:**
- `routes/` - Define endpoints HTTP
- `controllers/` - Lógica dos endpoints
- `services/` - Comunicação com APIs externas

**Exemplo de Fluxo:**
```
GET /api/books/search?query=term
  ↓
bookRoutes.js (router)
  ↓
bookController.searchBooks()
  ↓
bookService.searchBooks()
  ↓
Open Library API
```

### Frontend

**Estrutura de Componentes:**
- `App.js` - Componente raiz
- `components/SearchBar.js` - Barra de busca
- `components/BookList.js` - Lista de livros
- `components/BookDetail.js` - Detalhes do livro

## Exemplos de Desenvolvimento

### Adicionar novo endpoint

1. Crie o método no `services/bookService.js`
2. Crie o handler no `controllers/bookController.js`
3. Adicione a rota em `routes/bookRoutes.js`

### Adicionar novo componente React

1. Crie o arquivo em `src/components/NomeComponente.js`
2. Importe em `App.js`
3. Use o componente

## Testando a API

```bash
# Buscar por título
curl "http://localhost:5000/api/books/search?query=Harry+Potter"

# Buscar por autor
curl "http://localhost:5000/api/books/author?author=J.K.+Rowling"

# Health check
curl "http://localhost:5000/api/health"
```

## Variáveis de Ambiente

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## Dicas de Desenvolvimento

- **Hot Reload**: Ambos backend (nodemon) e frontend (React) têm hot reload
- **Debug**: Use `console.log()` ou debugger do Node/Browser
- **Prettier**: Formate código antes de commitar
- **Linting**: Execute linter antes de submeter PR

## Build para Produção

```bash
# Build da imagem Docker
docker build -t book-catalog-api ./backend
docker build -t book-catalog-web ./frontend

# Ou com Docker Compose
docker-compose build
docker-compose up
```

## Troubleshooting

### Porta ocupada
```bash
# Encontrar processo usando porta
lsof -i :3000
lsof -i :5000

# Matar processo
kill -9 <PID>
```

### Cache do npm
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Reconstruir imagens Docker
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```
