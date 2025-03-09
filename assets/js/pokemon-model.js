class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;

    async fetchDetails() {
        // Fetch Pokémon details from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.number}`);
        const data = await response.json();
        
        // Set the Pokémon properties with the fetched data
        this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        this.photo = data.sprites.other['official-artwork'].front_default;
        this.height = data.height;
        this.weight = data.weight;
        this.abilities = data.abilities.map(ability => ability.ability.name);
        this.types = data.types.map(typeSlot => typeSlot.type.name);
        this.type = this.types[0]; // Set the primary type
    }
}
