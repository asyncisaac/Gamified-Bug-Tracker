# 🐛 Bug Tracker Gamificado

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

Sistema completo de tracking de bugs com gamificação - usuários ganham XP, sobem de nível e competem no leaderboard.

## 🚀 Demonstração

🔗 **Vídeo Demo:** [Em breve]  
📱 **Repositório:** [[GitHub Link](https://github.com/asyncisaac/Gamified-Bug-Tracker)]

<div align="center">

### 🎯 Dashboard Principal
<img src="./public/image4.png" width="800" alt="Dashboard do BugTracker">

### 🏆 Sistema de Gamificação
<img src="./public/image1.png" width="800" alt="Sistema de XP e Levels">

### 📊 Leaderboard Competitivo  
<img src="./public/image2.png" width="800" alt="Leaderboard dos Usuários">

### 📊 Demonstração de Bug
<img src="./public/image3.png" width="800" alt="Leaderboard dos Usuários">

</div>

## 🎮 Funcionalidades

### 🐛 Core Features
- ✅ **Reportar Bugs** - Crie e descreva bugs detalhadamente
- ✅ **Sistema de Status** - Open, In Progress, Closed
- ✅ **Busca e Filtros** - Encontre bugs rapidamente
- ✅ **Atribuição** - Associe bugs a usuários específicos

### 🏆 Gamificação
- ⭐ **Sistema de XP** - Ganhe experiência fechando bugs
- 📈 **Progressão de Nível** - Suba de nível ao acumular XP
- 🏅 **Leaderboard** - Compita com outros usuários
- 📊 **Barra de Progresso** - Acompanhe sua evolução visualmente

### 👥 Gestão de Usuários
- 👤 **Perfis Personalizados** - Avatar, nível e XP
- 📋 **Histórico de Bugs** - Todos os bugs resolvidos
- 🎯 **Métricas Individuais** - Desempenho por usuário

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 15** - React framework com App Router
- **TypeScript** - Tipagem estática avançada
- **Tailwind CSS** - Estilização utility-first
- **React Hooks** - Estado e efeitos colaterais

### Backend
- **Next.js API Routes** - API endpoints integrados
- **Prisma ORM** - Database toolkit type-safe
- **SQLite** - Banco de dados relacional

### Features Técnicas
- 🔒 **Type Safety** - TypeScript em todo o projeto
- 🚀 **Performance** - Otimizações com useMemo/useCallback
- 📱 **Responsive** - Design mobile-first
- 🛡️ **Error Handling** - Tratamento robusto de erros

## 📦 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/bugtracker-gamificado.git
cd bugtracker-gamificado

2. **Instale as dependências**
```bash
npm install

3. **Configure o banco de dados**
```bash 
npx prisma generate
npx prisma db push

4. **Popule com dados de exemplo**
```bash
npx prisma db seed

5. **Execute em desenvolvimento**
```bash
npm run dev

6. **Acesse a aplicação**
```text
http://localhost:3000


### 🗃️ Estrutura do Projeto

bugtracker-gamificado/
├── src/
│   ├── app/
│   │   ├── api/           # API Routes
│   │   │   ├── bugs/
│   │   │   └── users/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/        # Componentes React
│   │   ├── BugCard.tsx
│   │   ├── LeaderBoard.tsx
│   │   └── ...
│   ├── hooks/            # Custom Hooks
│   │   └── useGamification.ts
│   └── types/            # Definições TypeScript
│       ├── Bug.ts
│       └── User.ts
├── prisma/
│   ├── schema.prisma     # Schema do banco
│   └── seed.ts          # Dados iniciais
└── public/              # Assets estáticos

## 🎯 Como Usar

1. Criar Usuários - Use a API ou interface para criar usuários.

2. Reportar Bugs - Adicione bugs com título, descrição e pontos.

3. Fechar Bugs - Ganhe XP ao marcar bugs como resolvidos.

4. Subir de Nível - Acumule XP suficiente para evoluir.

5. Competir - Acompanhe sua posição no leaderboard.

## 🔧 API Endpoints

Bugs

GET /api/bugs - Lista todos os bugs

POST /api/bugs - Cria novo bug

GET /api/bugs/[id] - Busca bug específico

PUT /api/bugs/[id] - Atualiza bug

DELETE /api/bugs/[id] - Remove bug

Users

GET /api/users - Lista usuários (leaderboard)

POST /api/users - Cria novo usuário

GET /api/users/[id] - Busca usuário específico

🤝 Contribuindo

Fork o projeto

Crie uma branch: git checkout -b feature/nova-feature

Commit suas mudanças: git commit -m 'Add nova feature'

Push para a branch: git push origin feature/nova-feature

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👨‍💻 Autor

Seu Nome

GitHub: @asyncisaac

LinkedIn: 

🙏 Agradecimentos

Equipe da Vercel pelo Next.js.

Time do Prisma pelo ORM incrível.

Comunidade Tailwind CSS.