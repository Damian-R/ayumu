console.log('Trying to cheat now, are we?');
const game = new Game();

document.addEventListener('keypress', (event) => {
    game.new_round();
});