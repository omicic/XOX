let container = document.querySelector('.container')

//niz za ispis i pracenje polja
let resenja = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//pomocni niz za selektovanje boxova za bojenje
let zaboxove = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let zarandom = [];
let wins = false;
let brojpoteza=0;

//create table
createTable()
let boxes = document.querySelectorAll('.box');
boxes.forEach(box => box.addEventListener('click', igrasTi))


let usersymbol = prompt("Izaberite X ili O");
if (usersymbol === "O") {
    compsymbol = "X"
    igraKomp();
} else {
    compsymbol = "O"
}


//korisnik
function igrasTi() {
    brojpoteza++;
    this.removeEventListener('click', igrasTi);
    this.innerHTML = usersymbol
    upisiuresenja(this.id, usersymbol);

    if (!wins) {
        igraKomp()
    }
}

function igraKomp() {

    zarandom = [];
    brojpoteza++;
    let i = 0;
    while (i < resenja.length) {
        for (j = 0; j < 3; j++) {
            if (resenja[i][j] != "X" && resenja[i][j] != "O") {
                zarandom.push(resenja[i][j]);
            }
        }
        i++
    }

    let random = zarandom[Math.floor(Math.random() * zarandom.length)];

    if (zarandom.length !== 0) {
        boxes[random].innerHTML = compsymbol;
        boxes[random].removeEventListener('click', igrasTi);
        upisiuresenja(random, compsymbol);
    }
}

//upis izbora u niz resenja: X ili O, i provera da li je nasao tri pogodka
function upisiuresenja(r, s) {
    resenja.forEach((el, index) => {

        console.log(index)
        for (let i = 0; i < 3; i++) {
            if (el[i] == r) {
                el[i] = s;
            }
            //ako ima tri pogodnka
            if (i === 2 && el[0] === el[1] && el[1] === el[2]) {
                wins = true;
                //oznaci pogodjene boksove sa cadetblue
                zaboxove.forEach((e, i) => {
                    if (index == i) {
                        for (let i = 0; i < e.length; i++) {
                            boxes.forEach(box => {
                                if (box.id == e[i]) {
                                    box.style.background = "cadetblue"
                                }
                            })
                        }
                    }
                }); 
                winner(s)
            } 
        }
    });
}


function winner(s) {

    if (wins) {
        (s === compsymbol) ? console.log("winner is " + "COMPUTER"): console.log("winner is " + "YOU");
    } else {
        console.log("winner is " + "NOONE")
    }

    boxes.forEach(e => e.removeEventListener('click', igrasTi))

}

function createTable() {
    let text = '';
    for (let i = 0; i < 9; i++) {
        text += `<div class='box' id=${i}></div>`
    }
    container.innerHTML = text;

}