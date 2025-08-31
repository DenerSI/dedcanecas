class CacheManager {
    constructor() {
        this.cacheKey = 'pokemon_cache';
        this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 horas
    }

    setPokemons(pokemons) {
        const cacheData = {
            data: pokemons,
            timestamp: Date.now()
        };
        localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    }

    getPokemons() {
        const cached = localStorage.getItem(this.cacheKey);
        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const isExpired = Date.now() - cacheData.timestamp > this.cacheExpiry;

        if (isExpired) {
            localStorage.removeItem(this.cacheKey);
            return null;
        }

        return cacheData.data;
    }

    clearCache() {
        localStorage.removeItem(this.cacheKey);
    }

    setPokemonDetail(id, details) {
        const key = `pokemon_${id}`;
        const cacheData = {
            data: details,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    }

    getPokemonDetail(id) {
        const key = `pokemon_${id}`;
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const isExpired = Date.now() - cacheData.timestamp > this.cacheExpiry;

        if (isExpired) {
            localStorage.removeItem(key);
            return null;
        }

        return cacheData.data;
    }
}

const cacheManager = new CacheManager();
