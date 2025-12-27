// const emojis = [
//     "😀", "😀",
//     "😡", "😡",
//     "😶‍🌫️", "😶‍🌫️",
//     "😂", "😂",
//     "😍", "😍",
//     "😎", "😎",
//     "😭", "😭",
//     "❤️", "❤️"
// ];

// let openCards = [];
// let matchedPairs = 0;

// // Embaralha as cartas
// let shuffleEmojis = [...emojis].sort(() => Math.random() - 0.5);

// // Cria o tabuleiro
// function createBoard() {
//     const gameContainer = document.querySelector(".game");
//     gameContainer.innerHTML = "";
    
//     shuffleEmojis.forEach((emoji, index) => {
//         let box = document.createElement("div");
//         box.className = "item";
//         box.innerHTML = emoji;
//         box.setAttribute("data-index", index);
//         box.onclick = handleClick;
//         gameContainer.appendChild(box);
//     });
// }

// function handleClick() {
//     // Não permite clicar se:
//     // 1. Já tem 2 cartas abertas
//     // 2. Esta carta já está virada
//     // 3. Esta carta já foi combinada
//     if (openCards.length >= 2 || 
//         this.classList.contains("boxOpen") || 
//         this.classList.contains("boxMatch")) {
//         return;
//     }
    
//     // Vira a carta
//     this.classList.add("boxOpen");
//     openCards.push(this);
    
//     // Se duas cartas estão abertas, verifica se combinam
//     if (openCards.length === 2) {
//         setTimeout(checkMatch, 500);
//     }
// }

// function checkMatch() {
//     const [card1, card2] = openCards;
    
//     if (card1.innerHTML === card2.innerHTML) {
//         // Cartas combinam
//         card1.classList.add("boxMatch");
//         card2.classList.add("boxMatch");
//         matchedPairs++;
        
//         // Verifica se o jogo acabou
//         if (matchedPairs === emojis.length / 2) {
//             setTimeout(() => {
//                 alert("🎉 Parabéns! Você encontrou todos os pares!");
//             }, 500);
//         }
//     } else {
//         // Cartas não combinam - vira de volta
//         setTimeout(() => {
//             card1.classList.remove("boxOpen");
//             card2.classList.remove("boxOpen");
//         }, 500);
//     }
    
//     // Limpa o array de cartas abertas
//     openCards = [];
// }

// // Função para resetar o jogo
// function resetGame() {
//     openCards = [];
//     matchedPairs = 0;
//     shuffleEmojis = [...emojis].sort(() => Math.random() - 0.5);
//     createBoard();
// }

// // Inicializa o jogo
// createBoard();

// // Adiciona evento ao botão reset
// document.querySelector(".reset").addEventListener("click", resetGame);
