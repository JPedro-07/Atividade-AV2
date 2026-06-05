# Arquitetura do Sistema

## Visão Geral - 3 Camadas

```
┌────────────────────────────────────────────────────────────────┐
│                     CAMADA DE APRESENTAÇÃO                     │
│                     (Presentation Layer)                       │
│                                                                │
│  Frontend: React + Bootstrap + Nginx                           │
│  Porta: 3000                                                   │
│  ├── SearchBar Component (Busca)                               │
│  ├── BookList Component (Lista)                                │
│  └── BookDetail Component (Detalhes)                           │
└────────────────────────────────────────────────────────────────┘
                              │
                          (HTTP/JSON)
                              │
┌────────────────────────────────────────────────────────────────┐
│                  CAMADA DE LÓGICA DE NEGÓCIO                   │
│              (Business Logic / Application Layer)              │
│                                                                │
│  Backend: Express.js + Node.js                                 │
│  Porta: 5000                                                   │
│  ├── Routes (Rotas HTTP)                                       │
│  ├── Controllers (Lógica de negócio)                           │
│  └── Services (Integração com API externa)                     │
└────────────────────────────────────────────────────────────────┘
                              │
                          (HTTP/JSON)
                              │
┌────────────────────────────────────────────────────────────────┐
│                     CAMADA DE DADOS                            │
│                    (Data Access Layer)                         │
│                                                                │
│  Open Library API (Serviço Externo)                            │
│  https://openlibrary.org/api                                   │
│  - Busca de livros por título                                  │
│  - Busca de livros por autor                                   │
│  - Detalhes do livro                                           │
│  - Capas de livros                                             │
└────────────────────────────────────────────────────────────────┘
```

## Fluxo de Dados - Exemplo: Buscar Livro

```
Usuário digita "Harry Potter" na interface
        │
        ▼
[Frontend - SearchBar Component]
  - Captura a entrada do usuário
  - Envia POST para o backend via Axios
        │
        ▼ GET /api/books/search?query=Harry+Potter
[Backend - Express Router]
  - Recebe a requisição
  - Valida os parâmetros
        │
        ▼
[Backend - BookController]
  - Chama bookService.searchBooks()
        │
        ▼
[Backend - BookService]
  - Faz requisição HTTP à Open Library API
  - Formata resposta
  - Retorna resultado
        │
        ▼
[Open Library API]
  - Processa busca
  - Retorna dados de livros
        │
        ▼
[Backend - BookController]
  - Adiciona URLs de capas
  - Retorna JSON formatado
        │
        ▼ JSON com lista de livros
[Frontend - BookList Component]
  - Renderiza os livros como cards
  - Permite clicar em um livro
        │
        ▼
[Frontend - BookDetail Component]
  - Exibe detalhes completos do livro
```

## Estrutura de Pastas

```
Atividade-AV2/
│
├── Backend (Camada de Lógica)
│   ├── src/
│   │   ├── server.js                 # Entry point do servidor
│   │   ├── routes/
│   │   │   └── bookRoutes.js         # Definição de rotas
│   │   ├── controllers/
│   │   │   └── bookController.js     # Handlers dos endpoints
│   │   └── services/
│   │       └── bookService.js        # Integração com API externa
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── Frontend (Camada de Apresentação)
│   ├── public/
│   │   └── index.html                # HTML principal
│   ├── src/
│   │   ├── index.js                  # Entry point React
│   │   ├── App.js                    # Componente raiz
│   │   ├── components/
│   │   │   ├── SearchBar.js          # Barra de busca
│   │   │   ├── BookList.js           # Lista de livros
│   │   │   └── BookDetail.js         # Detalhes do livro
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── Dockerfile                    # Build multi-stage para produção
│   ├── Dockerfile.dev               # Dev server
│   ├── nginx.conf                   # Config nginx para produção
│   └── .gitignore
│
├── Docker
│   ├── docker-compose.yml            # Prod
│   └── docker-compose.dev.yml        # Dev
│
├── Documentação
│   ├── README.md                     # Principal
│   ├── DEVELOPMENT.md                # Guia de desenvolvimento
│   └── ARCHITECTURE.md               # Este arquivo
│
└── Configurações
    └── .gitignore
```

## Endpoints da API

### Buscar por Título
```
GET /api/books/search?query=termo&limit=10

Query Parameters:
  - query (obrigatório): Termo de busca
  - limit (opcional): Número máximo de resultados (padrão: 10)

Response:
[
  {
    "id": "/works/OL45883W",
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "J. K. Rowling",
    "year": 1997,
    "isbn": "0747532699",
    "cover_id": 6379786,
    "cover_url": "https://covers.openlibrary.org/b/id/6379786-M.jpg"
  }
  ...
]
```

### Buscar por Autor
```
GET /api/books/author?author=nome&limit=10

Query Parameters:
  - author (obrigatório): Nome do autor
  - limit (opcional): Número máximo de resultados (padrão: 10)

Response: [mesmo formato da busca por título]
```

### Detalhes do Livro
```
GET /api/books/:bookId

Path Parameters:
  - bookId: ID do livro (ex: /works/OL45883W)

Response:
{
  "id": "/works/OL45883W",
  "title": "Harry Potter and the Philosopher's Stone",
  "author": "J. K. Rowling",
  "description": "...",
  "pages": 309,
  "isbn": "0747532699",
  "cover_id": 6379786,
  "cover_url": "https://covers.openlibrary.org/b/id/6379786-L.jpg"
}
```

### Health Check
```
GET /api/health

Response:
{
  "status": "Server is running"
}
```

## Tecnologias por Camada

### Camada de Apresentação
- **React 18** - Biblioteca de UI declarativa
- **Bootstrap 5** - Framework CSS responsivo
- **Axios** - Cliente HTTP para requisições
- **CSS3** - Estilização adicional
- **Nginx** - Servidor web estático (produção)

### Camada de Lógica de Negócio
- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **CORS** - Middleware para compartilhamento de recursos
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Axios** - Cliente HTTP para consumir API externa

### Camada de Dados
- **Open Library API** - Base de dados pública de livros
  - Livre e sem autenticação
  - Mais de 1 milhão de livros
  - Documentação em: https://openlibrary.org/developers/api

### Infraestrutura
- **Docker** - Containerização de aplicações
- **Docker Compose** - Orquestração de múltiplos containers
- **Networking** - Comunicação entre containers

## Padrões de Design

### Arquitetura em Camadas
- Separação clara de responsabilidades
- Fácil manutenção e escalabilidade
- Testabilidade melhorada

### MVC (Model-View-Controller) no Backend
- Routes: Mapeiam requisições HTTP
- Controllers: Processam a lógica
- Services: Comunicam com fonte de dados

### Component-Based no Frontend
- Componentes reutilizáveis
- Estado gerenciado localmente
- Fácil composição

## Segurança

### Implementado
- CORS configurado para proteger requisições cross-origin
- Validação de parâmetros de entrada
- Tratamento de erros

### Recomendações Futuras
- Adicionar rate limiting
- Implementar autenticação
- Adicionar sanitização de entrada
- HTTPS em produção
- JWT tokens para autorização

## Performance

### Otimizações Presentes
- Build multi-stage do Docker (frontend)
- Nginx para servir arquivos estáticos
- Hot module reload em desenvolvimento
- Node.js Alpine para imagem menor

### Melhorias Futuras
- Cache de resultados
- Paginação de resultados
- Lazy loading de imagens
- Compressão gzip
- CDN para capas de livros

## Escalabilidade

Para aumentar a capacidade:

1. **Horizontal Scaling**
   ```yaml
   # Múltiplas instâncias do backend
   backend-1:
     ...
   backend-2:
     ...
   # Usar load balancer (nginx, HAProxy)
   ```

2. **Database**
   - Adicionar cache (Redis)
   - Persistência local (SQLite/PostgreSQL)
   - Sincronizar com Open Library periodicamente

3. **Frontend**
   - Static site generation
   - Service workers para PWA
   - Lazy loading de componentes

## Deployment

### Docker Production
```bash
# Build das imagens
docker-compose build

# Deploy
docker-compose up -d

# Verificar status
docker-compose ps
```

### Alternativas Cloud
- Heroku: Docker support direto
- AWS ECS: Orquestração de containers
- DigitalOcean App Platform: Simplificado
- Vercel/Netlify: Frontend apenas
