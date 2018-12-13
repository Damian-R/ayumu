class Game {
    constructor() {
        this.new_round();
    }

    clicked(i, j, map, arr) {
        const box = document.querySelectorAll('#game div')[8*i + j]
        if (!this.enable_clicking || !box.className.match(/box-number/)) return;
        if (map[i][j] == arr[this.index]) {
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
        this.delay = document.querySelector('#delay').value;
        this.enable_clicking = false;
        this.clear_canvas();
        const map = [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']
        ];

        const used_coords = [];
        const arr = get_random(this.n);

        this.place_numbers(map, used_coords, arr);
        this.paint_canvas(map, arr);
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

    place_numbers(map, used_coords, arr) {
        arr.forEach(e => {
            const [yind, xind] = this.gen_coords(map, used_coords);
            const current = map[yind][xind];
            if (current == '') {
                map[yind][xind] = e
            }
        });
    }

    gen_coords(map, used_coords) {
        const yind = Math.floor(Math.random() * map.length);
        const xind = Math.floor(Math.random() * map[0].length);
        const coords = [yind, xind];
        if (this.coord_exists(coords, used_coords)) return this.gen_coords(map, used_coords);
        used_coords.push(coords);
        return coords;
    }

    coord_exists(coords, used_coords) {
        let seen = false;
        used_coords.forEach(e => {
            if (e[0] == coords[0] && e[1] == coords[1]) seen = true
        });
        return seen;
    }

    clear_canvas() {
        const canvas = document.querySelector('#game');
        canvas.innerHTML = '';
    }

    paint_canvas(map, arr) {
        const canvas = document.querySelector('#game');
        map.forEach((row, i) => {
            row.forEach((box, j) => {
                const box_element = document.createElement('div');
                box_element.className = 'box';
                box_element.innerText = map[i][j];
                if (map[i][j] != '')
                    box_element.className = 'box-number';
                box_element.addEventListener('click', () => {
                    this.clicked(i, j, map, arr);
                });
                canvas.appendChild(box_element);
            });
        });
    }

    incorrect() {
        document.querySelector('body').style.backgroundColor = '#a5322e'
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = '#222222'
            this.new_round();
        }, 200);
    }

    correct() {
        document.querySelector('body').style.backgroundColor = '#31a52e'
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = '#222222'
            this.new_round();
        }, 200);
    }
}