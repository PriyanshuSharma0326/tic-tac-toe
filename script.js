const box1 = document.getElementById('box-1');
const box2 = document.getElementById('box-2');
const box3 = document.getElementById('box-3');
const box4 = document.getElementById('box-4');
const box5 = document.getElementById('box-5');
const box6 = document.getElementById('box-6');
const box7 = document.getElementById('box-7');
const box8 = document.getElementById('box-8');
const box9 = document.getElementById('box-9');

const matchUpdate = document.getElementById('match-update');
const resetButton = document.getElementById('reset-button');

let boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let playerBoxes;
let computerBoxes;
const choices = ['circle', 'cross'];
const players = ['computer', 'player'];
let computerChoice;
let playerChoice;
let turn;
let winnerFlag;

let pattern;
let computerInputs;
let playerInputs;
const winningPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

const init = () => {
    box1.innerHTML = '';
    box2.innerHTML = '';
    box3.innerHTML = '';
    box4.innerHTML = '';
    box5.innerHTML = '';
    box6.innerHTML = '';
    box7.innerHTML = '';
    box8.innerHTML = '';
    box9.innerHTML = '';

    playerBoxes = [];
    computerBoxes = [];

    computerInputs = [];
    playerInputs = [];
    pattern = [];
    boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    winnerFlag = false;

    let choice = Math.floor(Math.random()*2);
    computerChoice = choices[choice];
    playerChoice = choices[choice === 0 ? 1 : 0];

    turn = players[Math.floor(Math.random()*2)];
    if(turn === 'player') {
        matchUpdate.innerText = 'Start!';
    }
    else {
        matchUpdate.innerText = 'Computer starts!';
        computerAdds();
    }
}

const updateBoxArray = (boxNumber) => {
    if(boxNumber) {
        let index = boxes.indexOf(boxNumber);
        if(index !== -1) {
            boxes.splice(index, 1);
        }
    }
}

const checkPattern = () => {
    let winner = '';
    playerInputs = pattern.filter(element => element.turn === 'player');
    computerInputs = pattern.filter(element => element.turn === 'computer');

    if(pattern.length > 4) {
        for(let i = 0; i < winningPatterns.length; i++) {
            const aPattern = winningPatterns[i];

            if(aPattern.every(number => playerBoxes.includes(number))) {
                winnerFlag = true;
                winner = 'player';
                break;
            }
            if(aPattern.every(number => computerBoxes.includes(number))) {
                winnerFlag = true;
                winner = 'computer';
                break;
            }
        }
    }
    
    if(winnerFlag) {
        matchUpdate.innerText = `${winner === 'player' ? 'You won!' : 'Computer won!'}`;
    }
    if(pattern.length > 1 && !winnerFlag) {
        matchUpdate.innerText = '...';
    }
    if(!winnerFlag && pattern.length === 9) {
        matchUpdate.innerText = 'That\'s a draw!';
    }
}

const addElement = (boxNumber, boxElement, turn) => {
    const image = document.createElement('img');
    image.src = `./media/${turn === 'player' ? `${playerChoice}` : `${computerChoice}`}.png`;
    image.alt = '';

    if(boxElement.innerHTML === '') {
        boxElement.appendChild(image);
    }

    pattern.push({
        turn: turn,
        pattern: `${turn === 'player' ? `${playerChoice}` : `${computerChoice}`}`,
        position: boxNumber
    });

    if(turn === 'player') {
        playerBoxes.push(boxNumber);
    }
    else if(turn === 'computer') {
        computerBoxes.push(boxNumber);
    }

    checkPattern();
    updateBoxArray(boxNumber);
}

const computerAdds = () => {
    let randomBoxNumber = boxes[Math.floor(Math.random()*(boxes.length))];
    let randomBox = document.getElementById(`box-${randomBoxNumber}`);
    addElement(randomBoxNumber, randomBox, turn);
    turn = 'player';
}

const buttontask = (num, ele) => {
    if(boxes.includes(num) && !winnerFlag) {
        addElement(num, ele, turn);

        if(boxes.length && !winnerFlag) {
            turn = 'computer';
            setTimeout(computerAdds, 1000);
        }
    }
}

box1.addEventListener('click', () => {
    buttontask(1, box1);
});

box2.addEventListener('click', () => {
    buttontask(2, box2);
});

box3.addEventListener('click', () => {
    buttontask(3, box3);
});

box4.addEventListener('click', () => {
    buttontask(4, box4);
});

box5.addEventListener('click', () => {
    buttontask(5, box5);
});

box6.addEventListener('click', () => {
    buttontask(6, box6);
});

box7.addEventListener('click', () => {
    buttontask(7, box7);
});

box8.addEventListener('click', () => {
    buttontask(8, box8);
});

box9.addEventListener('click', () => {
    buttontask(9, box9);
});

resetButton.addEventListener('click', () => {
    init();
});

init();