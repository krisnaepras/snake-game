let canvas, ctx, snake, food, score, level, interval, direction, gameSpeed;
let highScores = {
    easy: [],
    medium: [],
    hard: [],
};

function showGameMenu() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-menu').classList.remove('hidden');
}

function showMainMenu() {
    clearInterval(interval);
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('score-container').classList.add('hidden');
    document.getElementById('high-score-menu').classList.add('hidden');
    document.getElementById('high-score-mode').classList.add('hidden');
    document.getElementById('game-menu').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}

function drawChessboard() {
    for (let row = 0; row < canvas.height / 40; row++) {
        for (let col = 0; col < canvas.width / 40; col++) {
            if ((row + col) % 2 === 0) {
                ctx.fillStyle = '#C1F2B0';
            } else {
                ctx.fillStyle = '#65B741';
            }
            ctx.fillRect(col * 40, row * 40, 40, 40);
        }
    }
}

function drawSnake() {
    snake.forEach((segment, i) => {
        if (i == 0) {
            ctx.fillStyle = '#EE4266';
            ctx.fillRect(segment.x * 40, segment.y * 40, 40, 40);
            const headImage = new Image();
            headImage.src = 'assets/image/mata.png';
            ctx.drawImage(headImage, segment.x * 40, segment.y * 40, 40, 40);
        } else {
            ctx.fillStyle = '#FFD23F';
            ctx.fillRect(segment.x * 40, segment.y * 40, 40, 40);
        }
    });
}

function drawFood() {
    const foodImage = new Image();
    foodImage.src = 'assets/image/food.png';
    ctx.drawImage(foodImage, food.x * 40, food.y * 40, 40, 40);
}

function getRank(score, mode) {
    const highScoresList = highScores[mode];
    let rank = highScoresList.length + 1;

    for (let i = 0; i < highScoresList.length; i++) {
        if (score > highScoresList[i]) {
            rank = i + 1;
            break;
        }
    }

    return rank;
}

function moveSnake() {
    const head = {
        x:
            snake[0].x +
            (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
        y:
            snake[0].y +
            (direction === 'up' ? -1 : direction === 'down' ? 1 : 0),
    };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        document.getElementById('score').innerText = 'Score: ' + score;
        document.getElementById('eatSound').play();
        food = getRandomFoodPosition();

        const mode = getGameMode();
        const rank = getRank(score, mode);
        document.getElementById('peringkat').innerText = 'Peringkat: ' + rank;
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    if ((key === 37 || key === 65) && direction !== 'right') direction = 'left';
    else if ((key === 38 || key === 87) && direction !== 'down')
        direction = 'up';
    else if ((key === 39 || key === 68) && direction !== 'left')
        direction = 'right';
    else if ((key === 40 || key === 83) && direction !== 'up')
        direction = 'down';
}

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 40)),
        y: Math.floor(Math.random() * (canvas.height / 40)),
    };
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width / 40 ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height / 40 ||
        isSnakeCollision()
    ) {
        clearInterval(interval);
        document.getElementById('gameOverSound').play();
        updateHighScores(score);

        const mode = getGameMode();

        showHighScore(mode);

        document.getElementById('game-container').classList.add('hidden');
        document.getElementById('score-container').classList.add('hidden');
    }
}

function isSnakeCollision() {
    return snake
        .slice(1)
        .some(
            (segment) => segment.x === snake[0].x && segment.y === snake[0].y
        );
}

function getGameMode() {
    if (gameSpeed === 150) return 'easy';
    else if (gameSpeed === 100) return 'medium';
    else return 'hard';
}

function getSpeed(mode) {
    if (mode === 'easy') return 150;
    else if (mode === 'medium') return 100;
    else return 50;
}

function countdownSound(count) {
    document.getElementById('countdownSound').play();
}

function initGame(mode) {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    snake = [
        { x: 9, y: 10 },
        { x: 10, y: 10 },
    ];
    food = getRandomFoodPosition();
    score = 0;
    level = 1;
    gameSpeed = getSpeed(mode);
    direction = 'right';

    interval = setInterval(updateGame, gameSpeed);
    document.addEventListener('keydown', changeDirection);

    drawChessboard();

    updateGame();
}

function startGame(mode) {
    document.getElementById('game-menu').classList.add('hidden');
    document.getElementById('high-score-mode').classList.add('hidden');
    document.getElementById('countdown').classList.remove('hidden');

    let timer = 3;
    const countdownInterval = setInterval(() => {
        document.getElementById('timer').innerText = timer;
        countdownSound(timer);
        timer--;
        if (timer < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').classList.add('hidden');
            document
                .getElementById('game-container')
                .classList.remove('hidden');
            document
                .getElementById('score-container')
                .classList.remove('hidden');
            initGame(mode);
        }
    }, 1000);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawChessboard();
    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
}

function updateHighScores(currentScore) {
    const mode = getGameMode();
    highScores[mode].push(currentScore);
    highScores[mode].sort((a, b) => b - a);
    highScores[mode] = highScores[mode].slice(0, 5);

    const currentRank = highScores[mode].indexOf(currentScore) + 1;
    document.getElementById('peringkat').innerText =
        'Peringkat: ' + currentRank;
}

function showAllHighScores() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('high-score-menu').classList.remove('hidden');
    displayAllHighScores();
}

function displayAllHighScores() {
    const easyScores = highScores.easy.slice(0, 5);
    const mediumScores = highScores.medium.slice(0, 5);
    const hardScores = highScores.hard.slice(0, 5);

    let tableHTML = `
        <h1>High Scores</h1>
        <table>
            <thead>
                <tr>
                    <th>Easy</th>
                    <th>Medium</th>
                    <th>Hard</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < 5; i++) {
        tableHTML += `
            <tr>
                <td>${easyScores[i] || ''}</td>
                <td>${mediumScores[i] || ''}</td>
                <td>${hardScores[i] || ''}</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
        <button onclick="showMainMenu()">Back to Main Menu</button>
    `;

    document.getElementById('high-score-menu').innerHTML = tableHTML;
    document.getElementById('high-score-menu').classList.remove('hidden');
}

function showHighScore(mode) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('high-score-mode').classList.remove('hidden');
    displayHighScores(mode);
}

function displayHighScores(mode) {
    let scores;
    if (mode === 'easy') {
        scores = highScores.easy.slice(0, 5);
    } else if (mode === 'medium') {
        scores = highScores.medium.slice(0, 5);
    } else if (mode === 'hard') {
        scores = highScores.hard.slice(0, 5);
    } else {
        return; // Invalid mode
    }

    let tableHTML = `
        <h1 style="font-size: 100px"; line-height: 1;>GAME OVER!</h1>
        <h1 style="font-size: 64px"; line-height: 1;>High Scores</h1>
        <table>
            <thead>
                <tr>
                    <th>${mode.charAt(0).toUpperCase() + mode.slice(1)}</th>
                </tr>
            </thead>
            <tbody>
    `;

    scores.forEach((score) => {
        tableHTML += `
            <tr>
                <td>${score || ''}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
        <button onclick="startGame('${mode}')">Main Lagi</button>
        <button onclick="showMainMenu()">Back to Main Menu</button>

    `;
    document.getElementById('high-score-mode').innerHTML = tableHTML;
    document.getElementById('high-score-mode').classList.remove('hidden');
}
