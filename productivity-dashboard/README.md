# ⚡ Productivity Dashboard

Um dashboard de produtividade completo e moderno construído com React, apresentando timer Pomodoro, gerenciamento de tarefas, calendário e estatísticas de produtividade.

![Dashboard Preview](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Funcionalidades

### 🍅 Timer Pomodoro
- Timer configurável com diferentes durações por modo
- Controles de Play, Pause, Reset e Skip
- **Continua rodando em background** mesmo ao trocar de aba
- **Título da página atualiza** com o tempo restante
- Notificações sonoras e do navegador ao completar sessões
- Contador de sessões completadas
- Indicador visual de progresso circular
- Alternância automática entre trabalho e pausas

### 🎯 Modos de Produtividade
Quatro modos pré-configurados com tempos otimizados:

- **💻 Dev Mode** (25min trabalho / 5min pausa)
  - Ideal para desenvolvimento de software
  - Links padrão: GitHub, Stack Overflow, MDN Docs, VS Code

- **🎨 Design Mode** (30min trabalho / 10min pausa)
  - Perfeito para trabalho criativo
  - Links padrão: Figma, Dribbble, Behance, Adobe

- **👥 Meeting Mode** (45min trabalho / 15min pausa)
  - Otimizado para reuniões e colaboração
  - Links padrão: Zoom, Google Meet, Google Calendar, Slack

- **🧠 Deep Work** (90min trabalho / 20min pausa)
  - Para trabalho focado e intenso
  - Links padrão: Notion, Google Scholar, Spotify, Obsidian

### 🔗 Quick Links
- Links configuráveis por modo
- Adicionar, editar e remover links personalizados
- **Ícones reais dos sites/apps** usando Simple Icons
- Suporte para URLs de ícones customizados
- Adaptação automática ao tema (claro/escuro)
- Abertura em nova aba

### ✅ Lista To-Do
- Adicionar e remover tarefas
- Marcar tarefas como completas
- Filtros: Todas, Ativas, Completas
- Contador de tarefas pendentes
- Persistência local de dados

### 📅 Calendário
- Visualização mensal interativa
- Adicionar eventos com título e horário
- Indicadores visuais para dias com eventos
- Navegação entre meses
- Modal para gerenciar eventos do dia

### 📊 Estatísticas de Produtividade
- Total de sessões completadas
- Tempo total de trabalho
- Breakdown por modo de produtividade
- Atividade diária dos últimos 7 dias
- Gráficos visuais de progresso
- Exportação de dados em JSON

### 🎨 Temas Customizáveis
- Tema Dark (padrão)
- Tema Light
- Alternância fácil entre temas
- Cores dinâmicas por modo

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd productivity-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra seu navegador em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **React Icons** - Biblioteca de ícones
- **Simple Icons** - Ícones de marcas e serviços
- **date-fns** - Manipulação de datas
- **Context API** - Gerenciamento de estado global
- **LocalStorage** - Persistência de dados local
- **CSS3** - Estilização moderna com variáveis CSS
- **requestAnimationFrame** - Timer em background

## 📁 Estrutura do Projeto

```
productivity-dashboard/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Calendar.jsx
│   │   ├── PomodoroTimer.jsx
│   │   ├── QuickLinks.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Statistics.jsx
│   │   └── TodoList.jsx
│   ├── context/            # Context API
│   │   └── AppContext.jsx
│   ├── hooks/              # Custom hooks
│   │   └── useLocalStorage.js
│   ├── styles/             # Estilos CSS
│   │   └── components/
│   ├── utils/              # Utilitários
│   │   └── constants.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

## 🎯 Como Usar

### Iniciando uma Sessão Pomodoro

1. Selecione um modo de produtividade na barra lateral
2. O timer será configurado automaticamente
3. Clique em "Start" para iniciar
4. Trabalhe até o timer terminar
5. Aproveite sua pausa quando notificado

### Gerenciando Links

1. Clique no ícone de edição no card "Quick Links"
2. Adicione novos links com:
   - **Icon URL**: Use `https://cdn.simpleicons.org/[brand]/[color]`
   - **Nome**: Nome do link
   - **URL**: Endereço do site
3. Exemplos de Icon URLs:
   - GitHub: `https://cdn.simpleicons.org/github/white`
   - Figma: `https://cdn.simpleicons.org/figma/F24E1E`
   - Notion: `https://cdn.simpleicons.org/notion/000000`
4. Edite ou remova links existentes
5. Clique em "Save" para salvar as alterações

**Dica**: Visite [simpleicons.org](https://simpleicons.org) para encontrar ícones de milhares de marcas!

### Adicionando Tarefas

1. Digite sua tarefa no campo "Add a new task"
2. Pressione Enter ou clique no botão "+"
3. Marque como completa clicando no checkbox
4. Use os filtros para visualizar diferentes estados

### Usando o Calendário

1. Clique em qualquer dia do calendário
2. Adicione eventos com título e horário
3. Visualize eventos existentes no modal
4. Navegue entre meses usando as setas

### Visualizando Estatísticas

- Veja suas estatísticas em tempo real
- Exporte seus dados clicando no ícone de download
- Acompanhe seu progresso por modo e por dia

## 🎨 Personalização

### Alterando Temas

Clique no ícone de sol/lua na barra lateral para alternar entre temas claro e escuro.

### Configurando Modos

Os modos podem ser personalizados editando o arquivo `src/utils/constants.js`:

```javascript
export const MODES = {
  custom: {
    id: 'custom',
    name: 'Custom Mode',
    icon: '⚙️',
    pomodoroTime: 45,
    breakTime: 10,
    longBreakTime: 25,
    color: '#ff6b6b',
    defaultLinks: [...]
  }
};
```

## 💾 Armazenamento de Dados

Todos os dados são armazenados localmente no navegador usando LocalStorage:

- Modo atual selecionado
- Links personalizados por modo
- Lista de tarefas
- Eventos do calendário
- Estatísticas de produtividade
- Preferência de tema

**Nota:** Os dados são específicos do navegador e não sincronizam entre dispositivos.

## 🔔 Notificações

A aplicação solicita permissão para enviar notificações do navegador. Aceite para receber alertas quando:
- Uma sessão Pomodoro terminar
- Uma pausa terminar

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- 💻 Desktop (1920px+)
- 💻 Laptop (1400px+)
- 📱 Tablet (768px+)
- 📱 Mobile (320px+)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Técnica Pomodoro por Francesco Cirillo
- React Icons pela biblioteca de ícones
- date-fns pela manipulação de datas
- Comunidade React pelo suporte

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Feito com ❤️ e ☕ para aumentar sua produtividade!
