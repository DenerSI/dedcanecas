class PokemonApp {
    constructor() {
        this.debounceTimer = null
        this.intersectionObserver = null
        this.loadMoreButton = null
        this.uiManager = new UIManager()
        this.setupEventListeners()
        this.initializeApp()
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput')
        this.loadMoreButton = document.getElementById('loadMoreButton')

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value)
            })
        }

        if (this.loadMoreButton) {
            this.loadMoreButton.addEventListener('click', () => {
                this.loadMorePokemons()
            })
        }

        this.setupInfiniteScroll()
    }

    setupInfiniteScroll() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        }

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && appState.canLoadMore()) {
                    this.loadMorePokemons()
                }
            })
        }, options)

        if (this.loadMoreButton) {
            this.intersectionObserver.observe(this.loadMoreButton)
        }
    }

    handleSearch(searchTerm) {
        clearTimeout(this.debounceTimer)
        
        this.debounceTimer = setTimeout(() => {
            appState.setSearchTerm(searchTerm)
            this.renderPokemonList()
        }, 300)
    }

    async initializeApp() {
        try {
            this.uiManager.showLoading()
            
            const cachedPokemons = cacheManager.getPokemons()
            if (cachedPokemons && cachedPokemons.length > 0) {
                appState.addPokemons(cachedPokemons)
                this.renderPokemonList()
                this.uiManager.hideLoading()
            } else {
                await this.loadMorePokemons()
            }
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error)
            this.uiManager.showError('Erro ao carregar Pokémon')
            this.uiManager.hideLoading()
        }
    }

    async loadMorePokemons() {
        if (!appState.canLoadMore()) return

        try {
            appState.setLoading(true)
            this.uiManager.showLoading()

            const offset = appState.getCurrentOffset()
            const limit = appState.limit
            
            const newPokemons = await pokeApi.getPokemons(offset, limit)
            
            if (newPokemons.length === 0) {
                appState.setHasMore(false)
                this.uiManager.updateLoadMoreButton(false)
                return
            }

            appState.addPokemons(newPokemons)
            appState.incrementPage()

            if (appState.currentPage === 1) {
                this.renderPokemonList()
                cacheManager.setPokemons(appState.pokemons)
            } else {
                this.appendPokemonCards(newPokemons)
            }

            const hasMore = (offset + limit) < appState.maxRecords
            appState.setHasMore(hasMore)
            this.uiManager.updateLoadMoreButton(hasMore)

        } catch (error) {
            console.error('Erro ao carregar mais Pokémon:', error)
            this.uiManager.showError('Erro ao carregar mais Pokémon')
        } finally {
            appState.setLoading(false)
            this.uiManager.hideLoading()
        }
    }

    renderPokemonList() {
        const pokemonsToShow = appState.searchTerm ? appState.filteredPokemons : appState.pokemons
        this.uiManager.renderPokemonList(pokemonsToShow)
    }

    appendPokemonCards(pokemons) {
        this.uiManager.appendPokemonCards(pokemons)
    }
}

function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PokemonApp()
})