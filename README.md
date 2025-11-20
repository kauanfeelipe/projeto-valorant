# 🎮 Valorant Data Hub

Uma aplicação web moderna desenvolvida em React para visualização de dados do jogo Valorant, consumindo a API oficial do Valorant.

## 📋 Sobre o Projeto

Este projeto foi criado com o objetivo de fornecer uma interface intuitiva e visualmente atraente para explorar informações sobre o universo de Valorant. A aplicação consome dados em tempo real da [Valorant API](https://valorant-api.com) e apresenta de forma organizada e interativa.

### ✨ Funcionalidades

- **Agentes**: Visualize todos os agentes do jogo com suas habilidades, funções e informações detalhadas
- **Mapas**: Explore os mapas disponíveis com suas coordenadas e minimapas
- **Arsenal**: Consulte estatísticas completas de todas as armas do jogo
- **Skins**: Navegue por todas as skins de armas, organizadas por categoria
- **Sprays**: Descubra a coleção completa de sprays, categorizados por tipo (VCT/Esports, Agentes, Animados)
- **Player Cards**: Visualize todos os cards de jogador disponíveis no jogo

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca para animações
- **React Query** - Gerenciamento de estado e cache de dados
- **Axios** - Cliente HTTP para requisições à API
- **React Router** - Navegação entre páginas

## 🔌 Consumo da API

A aplicação utiliza a [Valorant API](https://valorant-api.com) para obter todos os dados do jogo. A API é gratuita e não requer autenticação.

### Endpoints Principais

```typescript
// Base URL
const API_BASE = 'https://valorant-api.com/v1'

// Exemplos de endpoints utilizados:
GET /agents          // Lista de agentes
GET /maps            // Lista de mapas
GET /weapons         // Lista de armas
GET /sprays          // Lista de sprays
GET /playercards     // Lista de player cards
```

### Estrutura de Requisição

Todas as requisições incluem o parâmetro de idioma para obter dados em português:

```typescript
const response = await axios.get(`${API_BASE}/agents`, {
  params: {
    language: 'pt-BR',
    isPlayableCharacter: true
  }
});
```

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/kauanfeelipe/projeto-valorant.git
cd projeto-valorant
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Deploy no GitHub Pages

```bash
npm run deploy
```

## 🎨 Características de Design

- Interface moderna com tema dark inspirado no visual do Valorant
- Animações suaves e interativas usando Framer Motion
- Efeitos 3D nos cards de jogador (tilt holográfico)
- Design responsivo para todos os dispositivos
- Sistema de categorização inteligente para organização de conteúdo

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional e pessoal.

## 👨‍💻 Desenvolvedor

Desenvolvido por **Kauan Felipe**

---

**Nota**: Este projeto não é afiliado ou endossado pela Riot Games. Valorant e todos os materiais relacionados são propriedade da Riot Games.
