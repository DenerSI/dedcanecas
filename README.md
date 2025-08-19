# Pokedex - js-developer-pokedex

## Overview

The Pokedex is a web-based application that serves as a central hub for Pokémon information. It allows users to explore essential details about various Pokémon, providing everything a trainer needs for an exciting adventure!

## Features

* Fetches real-time Pokémon data from the PokéAPI v2 (**[Documentation](https://pokeapi.co/docs/v2#pokemon-section)**).

* Displays Pokémon details, including name, ID, type, and image.

* Interactive modal window that shows additional information when clicking on a Pokémon.

* Provides insights into a Pokémon's abilities, stats, and available moves.

## Technologies Used

* HTML → Structuring the web page.

* CSS → Styling for a clean and minimalistic design.

* JavaScript (ES6+) → Handling API requests and dynamic content updates.

* PokéAPI v2 → Fetching real-time Pokémon data.

## How to Run

1. Clone this repository:

  git clone https://github.com/arthurgpchagas/js-developer-pokedex.git

2. Navigate to the project folder:

  cd js-developer-pokedex

3. Start a local server:

  * Using Live Server (VS Code Extension) or:

  * Using Python:

    python -m http.server 5500

  * Using Node.js:

    npm run dev or npm run preview

4. Open the browser and visit:

  http://127.0.0.1:5500/index.html

## API Reference

The application retrieves Pokémon data from the PokéAPI v2. Example request:
  
    fetch('https://pokeapi.co/api/v2/pokemon/charizard')
    .then(response => response.json())
    .then(data => console.log(data));

For more details, visit the PokéAPI **[documentation](https://pokeapi.co/docs/v2#pokemon-section)**.

## Future Improvements

* Implement a search feature for quick Pokémon lookup.

* Add pagination for better browsing experience.

* Improve UI/UX with animations and responsiveness.
