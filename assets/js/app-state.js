class AppState {
    constructor() {
        this.currentPage = 0;
        this.limit = 20;
        this.maxRecords = 151;
        this.searchTerm = '';
        this.pokemons = [];
        this.filteredPokemons = [];
        this.isLoading = false;
        this.hasMore = true;
    }

    setSearchTerm(term) {
        this.searchTerm = term;
        this.filterPokemons();
    }

    filterPokemons() {
        if (!this.searchTerm.trim()) {
            this.filteredPokemons = [...this.pokemons];
        } else {
            this.filteredPokemons = this.pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                pokemon.number.toString().includes(this.searchTerm)
            );
        }
    }

    addPokemons(newPokemons) {
        this.pokemons.push(...newPokemons);
        this.filterPokemons();
    }

    canLoadMore() {
        return this.hasMore && !this.isLoading;
    }

    setLoading(loading) {
        this.isLoading = loading;
    }

    setHasMore(hasMore) {
        this.hasMore = hasMore;
    }

    getCurrentOffset() {
        return this.currentPage * this.limit;
    }

    incrementPage() {
        this.currentPage++;
    }

    resetPagination() {
        this.currentPage = 0;
        this.hasMore = true;
    }
}

const appState = new AppState();
