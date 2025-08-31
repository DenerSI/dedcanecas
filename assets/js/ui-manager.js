class UIManager {
    constructor() {
        this.pokemonList = document.getElementById('pokemonList')
        this.searchInput = document.getElementById('searchInput')
        this.loadMoreButton = document.getElementById('loadMoreButton')
        this.modal = document.getElementById('pokemonModal')
        this.modalContent = document.getElementById('modalContent')
        this.closeModal = document.getElementById('closeModal')
        this.loadingSpinner = document.getElementById('loadingSpinner')
        
        this.setupEventListeners()
    }

    setupEventListeners() {
        if (this.closeModal && this.modal) {
            this.closeModal.addEventListener('click', () => this.hideModal())
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.hideModal()
            })
        }
    }

    createPokemonCard(pokemon) {
        const li = document.createElement('li')
        li.className = `pokemon ${pokemon.type}`
        li.dataset.pokemonId = pokemon.number
        
        li.innerHTML = `
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}"
                     loading="lazy"
                     onerror="this.src='${pokemon.animatedPhoto}'">
            </div>
        `
        
        li.addEventListener('click', () => this.showPokemonDetails(pokemon))
        
        return li
    }

    renderPokemonList(pokemons) {
        if (!this.pokemonList) {
            console.error('pokemonList não foi inicializado')
            return
        }
        this.pokemonList.innerHTML = ''
        pokemons.forEach(pokemon => {
            const card = this.createPokemonCard(pokemon)
            this.pokemonList.appendChild(card)
        })
    }

    appendPokemonCards(pokemons) {
        if (!this.pokemonList) {
            console.error('pokemonList não foi inicializado')
            return
        }
        pokemons.forEach(pokemon => {
            const card = this.createPokemonCard(pokemon)
            this.pokemonList.appendChild(card)
        })
    }

    async showPokemonDetails(pokemon) {
        try {
            this.showLoading()
            
            const description = await pokeApi.getPokemonSpecies(pokemon.number)
            pokemon.description = description
            
            if (this.modalContent) {
                this.modalContent.innerHTML = this.createModalContent(pokemon)
                
                // Adicionar event listener ao botão de fechar
                const closeBtn = this.modalContent.querySelector('.close')
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.hideModal())
                }
            }
            
            this.showModal()
        } catch (error) {
            console.error('Erro ao carregar detalhes:', error)
            this.showError('Erro ao carregar detalhes do Pokémon')
        } finally {
            this.hideLoading()
        }
    }

    createModalContent(pokemon) {
        const statsHTML = pokemon.stats.map(stat => `
            <div class="stat-item">
                <span class="stat-name">${this.formatStatName(stat.name)}</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${(stat.value / 255) * 100}%"></div>
                </div>
                <span class="stat-value">${stat.value}</span>
            </div>
        `).join('')

        const abilitiesHTML = pokemon.abilities.map(ability => `
            <span class="ability ${ability.isHidden ? 'hidden' : ''}">
                ${ability.name}${ability.isHidden ? ' (Habilidade Oculta)' : ''}
            </span>
        `).join('')

        return `
            <div class="modal-header ${pokemon.type}">
                <span class="close">&times;</span>
                <h2>${pokemon.name}</h2>
                <span class="modal-number">#${pokemon.number}</span>
            </div>
            
            <div class="modal-body">
                <div class="pokemon-image">
                    <img src="${pokemon.animatedPhoto || pokemon.photo}" alt="${pokemon.name}">
                </div>
                
                <div class="pokemon-info">
                    <div class="types-section">
                        <h3>Tipos</h3>
                        <div class="types">
                            ${pokemon.types.map(type => `<span class="type ${type}">${type}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="physical-info">
                        <div class="info-item">
                            <span class="label">Altura:</span>
                            <span class="value">${pokemon.height}m</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Peso:</span>
                            <span class="value">${pokemon.weight}kg</span>
                        </div>
                    </div>
                    
                    <div class="abilities-section">
                        <h3>Habilidades</h3>
                        <div class="abilities">
                            ${abilitiesHTML}
                        </div>
                    </div>
                    
                    <div class="stats-section">
                        <h3>Atributos de Batalha</h3>
                        <div class="stats">
                            ${statsHTML}
                        </div>
                    </div>
                    
                    ${pokemon.description ? `
                        <div class="description-section">
                            <h3>Descrição</h3>
                            <p>${pokemon.description}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `
    }

    formatStatName(statName) {
        const statNames = {
            'hp': 'HP',
            'attack': 'Ataque',
            'defense': 'Defesa',
            'special-attack': 'Ataque Especial',
            'special-defense': 'Defesa Especial',
            'speed': 'Velocidade'
        }
        return statNames[statName] || statName
    }

    showModal() {
        if (this.modal) {
            this.modal.style.display = 'flex'
            document.body.style.overflow = 'hidden'
        }
    }

    hideModal() {
        if (this.modal) {
            this.modal.style.display = 'none'
            document.body.style.overflow = 'auto'
        }
    }

    showLoading() {
        if (this.loadingSpinner) {
            this.loadingSpinner.style.display = 'block'
        }
    }

    hideLoading() {
        if (this.loadingSpinner) {
            this.loadingSpinner.style.display = 'none'
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div')
        errorDiv.className = 'error-message'
        errorDiv.textContent = message
        document.body.appendChild(errorDiv)
        
        setTimeout(() => {
            errorDiv.remove()
        }, 3000)
    }

    updateLoadMoreButton(hasMore) {
        if (this.loadMoreButton) {
            this.loadMoreButton.style.display = hasMore ? 'block' : 'none'
        }
    }

    setSearchPlaceholder(text) {
        if (this.searchInput) {
            this.searchInput.placeholder = text
        }
    }
}

const uiManager = new UIManager()
