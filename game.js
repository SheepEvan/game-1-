const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreElement = document.getElementById('score-value');

let score = 0;

function createTarget() {
    const target = document.createElement('div');
    target.classList.add('target');
    target.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
    target.style.top = '0px';
    gameContainer.appendChild(target);

    const speed = 1 + Math.random() * 3;

    function moveTarget() {
        const currentTop = parseInt(target.style.top);
        if (currentTop > gameContainer.offsetHeight) {
            gameContainer.removeChild(target);
        } else {
            target.style.top = `${currentTop + speed}px`;
            requestAnimationFrame(moveTarget);
        }
    }

    moveTarget();

    target.addEventListener('click', () => {
        gameContainer.removeChild(target);
        score += 1;
        scoreElement.textContent = score;
    });
}

setInterval(createTarget, 1000);

document.addEventListener('mousemove', (e) => {
    const containerRect = gameContainer.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const playerCenter = playerRect.width / 2;
    
    let newX = e.clientX - containerRect.left - playerCenter;
    newX = Math.max(0, Math.min(newX, containerRect.width - playerRect.width));
    
    player.style.left = `${newX}px`;
}) ;

