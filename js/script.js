console.log('Trying to cheat now, are we? :(');
const game = new Game();

document.addEventListener('keypress', (event) => {
    if (event.keyCode == 114) {
        game.new_round();
    }
});