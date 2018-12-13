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

function is_number(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57) || document.querySelector('#numbersout').value) {
        return false;
    }
    return true;
}

function in_range(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    const nextval = `${document.querySelector('#delayout').value}${charCode - 48}`;
    if (charCode > 31 && (charCode < 48 || charCode > 57) || (nextval > 3000)) {
        return false;
    }
    return true;
}