# Quick Start

## Iniciar em 30 segundos

### Com Docker Compose (Recomendado)

```bash
# 1. Clonar/entrar no repositório
cd Atividade-AV2

# 2. Iniciar containers
docker-compose up --build

# 3. Abrir no navegador
# Frontend:  http://localhost:3000
# API:       http://localhost:5000/api/health
```

### Localmente (Sem Docker)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## Usar a Aplicação

1. Abra http://localhost:3000
2. Digite um termo (ex: "Harry Potter")
3. Escolha buscar por "Título" ou "Autor"
4. Clique em um livro para ver detalhes

## Exemplos de Busca

| Tipo | Termo |
|------|-------|
| Título | "Harry Potter" |
| Título | "The Great Gatsby" |
| Autor | "J.K. Rowling" |
| Autor | "George Orwell" |

## Parar a Aplicação

```bash
# Com Docker
docker-compose down

# Localmente
# Ctrl+C em ambos os terminais
```

## Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Porta 3000 ocupada | `lsof -i :3000` depois `kill -9 <PID>` |
| Porta 5000 ocupada | `lsof -i :5000` depois `kill -9 <PID>` |
| API não responde | `curl http://localhost:5000/api/health` |
| Erro npm | `rm -rf node_modules && npm install` |

## Próximos Passos

- Leia [README.md](README.md) para detalhes completos
- Leia [ARCHITECTURE.md](ARCHITECTURE.md) para entender a arquitetura
- Leia [DEVELOPMENT.md](DEVELOPMENT.md) para guia de desenvolvimento
