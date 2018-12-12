let game;
const NUM_NUMBERS = 7; // get this from DOM element in future

class Game {
    constructor() {
        this.new_round();
    }

    clicked(i, j) {
        const box = document.querySelectorAll('#game div')[8*i + j]
        if (!this.enable_clicking || !box.className.match(/box-number/)) return;
        if (this.map[i][j] == this.arr[this.index]) {
            const box = document.querySelectorAll('#game div')[8*i + j]
            box.style.backgroundColor = 'transparent'
            this.index++;
            if (this.index == this.n) return this.correct();
        } else {
            this.incorrect();
        }
    }

    new_round() {
        if(this.hide) clearTimeout(this.hide);
        this.n = document.querySelector('#numbers').value;
        if (this.n > 9 || this.n < 1) {
            this.n = 5;
            document.querySelector('#numbers').value = 5
        }
        this.delay = document.querySelector('#delay').value;
        this.used_coords = [];
        this.enable_clicking = false;
        this.clear_canvas();
        this.map = [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']
        ];

        this.arr = get_random(this.n);
        this.place_numbers();
        this.paint_canvas();
        this.index = 0;
        this.hide = setTimeout(() => {
            document.querySelectorAll('.box-number').forEach((e) => {
                e.style.backgroundColor = '#AAAAAA';
                e.style.color = 'transparent';
                e.innerText = ''
                e.classList.add('hidden');
                this.enable_clicking = true;
            });
        }, this.delay);
    }

    place_numbers() {
        this.arr.forEach(e => {
            const [yind, xind] = this.gen_coords();
            const current = this.map[yind][xind];
            if (current == '') {
                this.map[yind][xind] = e
            }
        });
    }

    gen_coords() {
        const yind = Math.floor(Math.random() * this.map.length);
        const xind = Math.floor(Math.random() * this.map[0].length);
        const coords = [yind, xind];
        if (this.coord_exists(coords)) return this.gen_coords();
        this.used_coords.push(coords);
        return coords;
    }

    coord_exists(coords) {
        let seen = false;
        this.used_coords.forEach(e => {
            if (e[0] == coords[0] && e[1] == coords[1]) seen = true
        });
        return seen;
    }

    clear_canvas() {
        const canvas = document.querySelector('#game');
        canvas.innerHTML = '';
    }

    paint_canvas() {
        const canvas = document.querySelector('#game');
        this.map.forEach((row, i) => {
            row.forEach((box, j) => {
                const box_element = document.createElement('div');
                box_element.className = 'box';
                box_element.innerText = this.map[i][j];
                if (this.map[i][j] != '')
                    box_element.className = 'box-number';
                box_element.addEventListener('click', () => {
                    this.clicked(i, j);
                });
                canvas.appendChild(box_element);
            });
        });
    }

    incorrect() {
        document.querySelector('body').style.backgroundColor = '#a5322e'
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = '#222222'
            this.new_round(this.n);
        }, 200);
    }

    correct() {
        document.querySelector('body').style.backgroundColor = '#31a52e'
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = '#222222'
            this.new_round(this.n);
        }, 200);
    }

}

const get_random = n => {
    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result.sort();
}

game = new Game(NUM_NUMBERS);

document.addEventListener('keypress', (event) => {
    game.new_round(NUM_NUMBERS);
});