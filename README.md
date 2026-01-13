# 🔴 Pokedex

Uma aplicação web interativa para explorar e descobrir Pokémons! Carregue a lista de Pokémons sob demanda e visualize informações detalhadas sobre cada um.

## 🎮 Demonstração

Uma Pokedex moderna e responsiva, desenvolvida com HTML, CSS e JavaScript vanilla, sem dependências externas.

## ✨ Funcionalidades

- 📱 **Design Responsivo** - Funciona perfeitamente em dispositivos móveis, tablets e desktops
- ⚡ **Carregamento Dinâmico** - Carregue mais Pokémons sob demanda com o botão "Load More"
- 🎨 **Interface Limpa** - Design moderno e intuitivo
- 🔗 **Integração com PokéAPI** - Dados em tempo real da PokéAPI oficial
- 📊 **Informações Completas** - Visualize nome, imagem, tipo e número do Pokémon

## 🚀 Como Começar

### Pré-requisitos
- Um navegador web moderno (Chrome, Firefox, Safari, Edge)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/FelipeDev30/pokedex.git
cd pokedex
```

2. Abra o arquivo `index.html` no seu navegador:
```bash
open index.html
# ou apenas clique duas vezes no arquivo
```

# 🔴 Pokedex

Uma aplicação web interativa para explorar e descobrir Pokémons. Carrega a lista sob demanda e exibe uma página de detalhes simples para cada Pokémon.

## 🎮 Sobre

Projeto leve e responsivo feito com HTML, CSS e JavaScript (vanilla). Integra com a PokéAPI para obter dados em tempo real.

## ✨ Funcionalidades

- 📱 Design responsivo
- ⚡ Carregamento dinâmico com `Load More`
- 🔗 Clique em um Pokémon para ver a página de detalhes
- 🎨 Interface simples e limpa

## 🚀 Como executar (recomendado)

Alguns navegadores bloqueiam requisições à PokéAPI quando a página é aberta via `file://`. Recomenda-se rodar um servidor HTTP simples:

Usando Python (se instalado):
```powershell
cd 'c:\Users\felipe\OneDrive\Documentos\Github\pokedex'
python -m http.server 8000
```

Depois abra no navegador: http://localhost:8000

Alternativas: usar a extensão Live Server do VSCode ou outro servidor HTTP estático.

## 📁 Estrutura do projeto

```
pokedex/
├── index.html
├── pages/
│   └── pokemon.html           # Página de detalhes do Pokémon
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   └── pokedex.css
│   └── js/
│       ├── main.js
│       ├── poke-api.js
│       ├── pokemon-model.js
│       └── pokemon-detail.js  # Script da página de detalhes
└── README.md
```

## 📖 Como usar

1. Abra a aplicação (recomendado via servidor local)
2. A lista inicial de Pokémons é carregada automaticamente
3. Clique em um cartão de Pokémon para abrir a página de detalhes
4. Use "Load More" para carregar mais Pokémons

## ✅ Status

- Página de detalhes implementada: ✅ (`pages/pokemon.html` + `assets/js/pokemon-detail.js`)
- Busca por nome e filtros: planejado
- Favoritos e modo escuro: planejado

## 🛠️ Tecnologias

- HTML5, CSS3, JavaScript (Vanilla)
- PokéAPI
- Normalize.css

## 🤝 Contribuindo

Contribuições são bem-vindas — crie um fork, branch com sua feature, e abra um pull request.

## 👨‍💻 Autor

Felipe — https://github.com/FelipeDev30

---

OBS: Projeto criado Durante a Formação JavaScript Developer - Digital Innovation One.