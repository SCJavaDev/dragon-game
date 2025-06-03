let score = 0;
let cross = true;
let startX = 0;

// Event listeners for keyboard controls
document.addEventListener("keydown", function (e) {
    let dino = document.querySelector('.dino');
    
    if (e.keyCode == 38) { // Jump
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode == 39) { // Move Right
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }

    if (e.keyCode == 37) { // Move Left
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
});

// Touch event for jumping
document.addEventListener("touchstart", function () {
    let dino = document.querySelector('.dino');
    dino.classList.add('animateDino');
    setTimeout(() => {
        dino.classList.remove('animateDino');
    }, 700);
});

// Swipe gestures for left/right movement
document.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", function (e) {
    let endX = e.changedTouches[0].clientX;
    let dino = document.querySelector('.dino');
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    if (startX - endX > 50) { // Swipe Left
        dino.style.left = (dinoX - 112) + "px";
    } else if (endX - startX > 50) { // Swipe Right
        dino.style.left = (dinoX + 112) + "px";
    }
});

// Collision detection and score handling
setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');
    let restartBtn = document.getElementById("restartBtn");

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over";
        obstacle.classList.remove('obstacleAni');
        restartBtn.style.display = "block"; // Show restart button
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => { cross = true; }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

// Update score display
function updateScore(score) {
    document.getElementById("scoreCont").innerHTML = "Your Score: " + score;
}

// Restart game without reloading
document.getElementById("restartBtn").addEventListener("click", function () {
    document.querySelector('.gameOver').innerHTML = "Welcome to iDragon Adventures";
    score = 0;
    updateScore(score);
    document.querySelector('.obstacle').classList.add('obstacleAni');
    this.style.display = "none";
});
