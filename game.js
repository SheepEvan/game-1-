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

document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const player = document.getElementById("player");
    let score = 0;

    gameContainer.addEventListener("click", (event) => {
        shootBullet();
    });

    function shootBullet() {
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2 - 2.5}px`;
        bullet.style.top = `${player.offsetTop}px`;
        gameContainer.appendChild(bullet);

        const bulletInterval = setInterval(() => {
            const currentTop = parseInt(bullet.style.top);
            bullet.style.top = `${currentTop - 10}px`;

            // Check for collisions with crafts
            document.querySelectorAll('.target').forEach(craft => {
                if (isCollision(bullet, craft)) {
                    craft.remove();
                    bullet.remove();
                    clearInterval(bulletInterval);
                    increaseScore();
                }
            });

            if (currentTop < 0) {
                bullet.remove();
                clearInterval(bulletInterval);
            }
        }, 30);
    }

    function isCollision(bullet, craft) {
        const bulletRect = bullet.getBoundingClientRect();
        const craftRect = craft.getBoundingClientRect();

        return !(bulletRect.right < craftRect.left ||
                 bulletRect.left > craftRect.right ||
                 bulletRect.bottom < craftRect.top ||
                 bulletRect.top > craftRect.bottom);
    }

    function increaseScore() {
        score++;
        document.getElementById("score-value").innerText = score;
    }

    // Add some targets for testing
    function createTarget() {
        const target = document.createElement("div");
        target.classList.add("target");
        target.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
        target.style.top = `${Math.random() * (gameContainer.offsetHeight - 100)}px`;
        gameContainer.appendChild(target);
    }

    for (let i = 0; i < 5; i++) {
        createTarget();
    }
});


