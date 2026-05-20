# Catálogo de Livros - MVP

Um aplicativo web moderno para catalogação e busca de livros utilizando **Docker**, **React**, **Bootstrap** e **API pública Open Library**.

## Arquitetura (3 Camadas)

```
┌─────────────────────────────────────────────────────┐
│        CAMADA DE APRESENTAÇÃO (Frontend)            │
│  React + Bootstrap + Nginx (Porta 3000)             │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│        CAMADA DE LÓGICA (Backend API)               │
│  Express.js + Node.js (Porta 5000)                  │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│      CAMADA DE DADOS (Serviço Externo)              │
│  Open Library API (Pública)                         │
└─────────────────────────────────────────────────────┘
```

## Características do MVP

✅ **Busca por Título** - Encontre livros por título
✅ **Busca por Autor** - Encontre livros por autor
✅ **Detalhes do Livro** - Visualize informações completas
✅ **Capas de Livros** - Exibição de capas quando disponível
✅ **Interface Responsiva** - Design mobile-friendly com Bootstrap
✅ **Containerização** - Aplicação pronta para Docker

## Pré-requisitos

- Docker e Docker Compose instalados
- Git

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/JPedro-07/Atividade-AV2.git
cd Atividade-AV2
```

### 2. Inicie os containers com Docker Compose

```bash
docker-compose up --build
```

Ou sem build (se as imagens já estiverem prontas):

```bash
docker-compose up
```

### 3. Acesse a aplicação

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Endpoints da API

### GET `/api/books/search?query=termo&limit=10`
Busca livros por título

**Exemplo:**
```bash
curl "http://localhost:5000/api/books/search?query=Harry+Potter&limit=10"
```

### GET `/api/books/author?author=nome&limit=10`
Busca livros por autor

**Exemplo:**
```bash
curl "http://localhost:5000/api/books/author?author=J.K.+Rowling&limit=10"
```

### GET `/api/books/:bookId`
Obtém detalhes completos de um livro

## Estrutura do Projeto

```
Atividade-AV2/
├── backend/                      # API (Express.js)
│   ├── src/
│   │   ├── server.js            # Servidor principal
│   │   ├── routes/              # Definição de rotas
│   │   ├── controllers/         # Lógica dos endpoints
│   │   └── services/            # Comunicação com API externa
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
├── frontend/                     # Aplicação React
│   ├── public/                  # Arquivos estáticos
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── App.js              # Componente principal
│   │   └── index.js            # Entry point
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf              # Configuração Nginx
│   └── .gitignore
├── docker-compose.yml           # Orquestração de containers
└── README.md                    # Este arquivo
```

## Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **Bootstrap 5** - Framework CSS
- **Axios** - Cliente HTTP

### Backend
- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web
- **Axios** - Cliente HTTP
- **CORS** - Compartilhamento de recursos entre domínios
- **Dotenv** - Variáveis de ambiente

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Nginx** - Servidor web para o frontend

### API Externa
- **Open Library API** - Base de dados pública de livros (https://openlibrary.org)

## Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend`:

```env
PORT=5000
NODE_ENV=development
```

## Desenvolvimento Local

### Executar Backend localmente

```bash
cd backend
npm install
npm run dev
```

### Executar Frontend localmente

```bash
cd frontend
npm install
npm start
```

## Como Usar a Aplicação

1. **Abra o navegador** em `http://localhost:3000`
2. **Escolha um tipo de busca**: "Por Título" ou "Por Autor"
3. **Digite um termo de busca**
4. **Clique em "Buscar"**
5. **Clique em um livro** para ver detalhes completos
6. **Volte à lista** clicando no botão "Voltar"

## Exemplos de Buscas

### Por Título
- "The Great Gatsby"
- "1984"
- "Harry Potter"

### Por Autor
- "George Orwell"
- "J.K. Rowling"
- "F. Scott Fitzgerald"

## Melhorias Futuras (Roadmap)

- 📚 Adicionar favoritos/wishlist
- 💾 Salvar histórico de buscas
- 🌟 Sistema de avaliações
- 👤 Autenticação de usuários
- 📊 Dashboard com estatísticas
- 🔍 Filtros avançados (ano, idioma, etc)
- 📱 App mobile nativo
- 🌙 Modo escuro

## Troubleshooting

### Erro: "Cannot find module"
```bash
docker-compose down
docker-compose up --build
```

### Porta já em uso
```bash
# Mude as portas no docker-compose.yml
# Exemplo: "8080:3000" para usar porta 8080
```

### API não responde
Verifique se o backend está rodando:
```bash
curl http://localhost:5000/api/health
```

## Licença

MIT

## Autor

João Pedro - GitHub: [@JPedro-07](https://github.com/JPedro-07)
