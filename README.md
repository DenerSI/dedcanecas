# 🎮 Pokédex - Sua Enciclopédia Pokémon Completa

Uma aplicação web moderna e responsiva que permite explorar o mundo Pokémon através da API oficial do Pokémon.

## ✨ Funcionalidades

- **Lista Completa**: Visualize todos os 151 Pokémon da primeira geração
- **Busca Inteligente**: Encontre Pokémon por nome ou número
- **Detalhes Completos**: Modal com informações detalhadas de cada Pokémon
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Cache Local**: Performance otimizada com armazenamento local
- **Scroll Infinito**: Carregamento automático de mais Pokémon
- **Cores por Tipo**: Cada tipo de Pokémon tem sua cor característica

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno com animações e gradientes
- **JavaScript ES6+**: Lógica da aplicação com classes e async/await
- **PokeAPI**: API oficial do Pokémon para dados
- **LocalStorage**: Cache local para melhor performance

## 📱 Como Usar

1. **Abra o projeto**: Execute o arquivo `index.html` em seu navegador
2. **Navegue**: Use o scroll para ver mais Pokémon
3. **Busque**: Digite o nome ou número do Pokémon na barra de busca
4. **Clique**: Toque em um Pokémon para ver seus detalhes completos
5. **Explore**: Visualize estatísticas, habilidades e descrições

## 🎨 Características do Design

- **Interface Moderna**: Design limpo e intuitivo
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Cores Dinâmicas**: Cada tipo de Pokémon tem sua paleta de cores
- **Responsividade**: Adapta-se a qualquer tamanho de tela
- **Acessibilidade**: Foco visual e navegação por teclado

## 🔧 Estrutura do Projeto

```
js-developer-pokedex/
├── assets/
│   ├── css/
│   │   ├── global.css          # Estilos globais
│   │   └── pokedex.css         # Estilos específicos da Pokédex
│   └── js/
│       ├── app-state.js        # Gerenciamento de estado
│       ├── cache-manager.js    # Sistema de cache
│       ├── main.js             # Aplicação principal
│       ├── poke-api.js         # Integração com a API
│       ├── pokemon-model.js    # Modelo de dados
│       └── ui-manager.js       # Gerenciamento da interface
├── index.html                  # Página principal
└── README.md                   # Documentação
```

## 🌐 API Utilizada

- **PokeAPI**: https://pokeapi.co/
- **Endpoint Principal**: `/api/v2/pokemon`
- **Dados Incluídos**: Nome, número, tipos, imagens, estatísticas, habilidades
- **Descrições**: Textos em português quando disponível

## 📊 Dados dos Pokémon

Cada Pokémon inclui:
- **Informações Básicas**: Nome, número, tipos
- **Características Físicas**: Altura e peso
- **Estatísticas de Batalha**: HP, Ataque, Defesa, etc.
- **Habilidades**: Normais e ocultas
- **Imagens**: Versões estáticas e animadas
- **Descrição**: Texto explicativo sobre o Pokémon

## 🎯 Recursos Técnicos

- **Paginação Inteligente**: Carregamento sob demanda
- **Sistema de Cache**: Reduz chamadas à API
- **Tratamento de Erros**: Mensagens amigáveis ao usuário
- **Performance Otimizada**: Lazy loading de imagens
- **SEO Friendly**: Meta tags e estrutura semântica

## 🚀 Como Executar

1. Clone ou baixe o projeto
2. Abra o arquivo `index.html` em seu navegador
3. Não é necessário servidor local - funciona diretamente do arquivo

## 🌟 Recursos Futuros

- [ ] Suporte a mais gerações de Pokémon
- [ ] Sistema de favoritos
- [ ] Comparação entre Pokémon
- [ ] Modo escuro/claro
- [ ] Sons e efeitos sonoros
- [ ] PWA (Progressive Web App)

## 📝 Licença

Este projeto é de uso livre e educacional. A API do Pokémon é fornecida pela PokeAPI.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar o design
- Otimizar o código

---

**Desenvolvido com ❤️ para a comunidade Pokémon!**
