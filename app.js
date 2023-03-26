import {
    Ball
} from "./ball.js";

import {
    Block
} from "./block.js";

import {
    Bricks
} from './bricks.js';

class App {
    constructor() {
        alert('방향키 ← → 를 이용하여 막대를 조작하고 벽돌들을 최대한 많이 깨보세요!');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.bricksRow = 5;
        this.bricksCol = 2;
        this.bricks = new Bricks(this.bricksRow, this.bricksCol);

        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('keydown', this.keydown.bind(this), false);
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 레티나 디스플레이에서 선명하게 보이게 하려고 두 배로 설정
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.ballXSpeed = this.stageWidth * 0.006;
        this.ballYSpeed = this.stageHeight * 0.006;
        this.blockSpeed = this.stageWidth * 0.05;
        this.blockHeight = this.stageHeight * 0.03;
        this.interval = this.stageWidth * 0.015;
        this.ballRadius = this.stageWidth * 0.03;
        this.ballX = this.stageWidth / 2;
        this.ballY = this.stageHeight - 70 - this.ballRadius;
        this.blockWidth = this.stageWidth * 0.10;
        this.blockX = (this.stageWidth - this.blockWidth) / 2;
        this.blockY = this.stageHeight - 70;

        this.bricks.broken = 0;
        this.ball = new Ball(this.ballX, this.ballY, this.ballRadius, this.ballXSpeed, this.ballYSpeed);
        this.block = new Block(this.blockWidth, this.blockHeight, this.blockX, this.blockY);
        this.bricks.resize(this.stageWidth, this.stageHeight, this.interval);
    }

    keydown(e) {
        if(e.keyCode == 39 && this.blockWidth + this.blockX + this.blockSpeed < this.stageWidth - this.interval) this.blockX += this.blockSpeed;
        else if(e.keyCode == 37 && this.blockX - this.blockSpeed > this.interval) this.blockX -= this.blockSpeed;
        this.block.move(this.blockX);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight); // 이전에 그렸던 것을 지워주고
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block); // 다시 그려줌
        this.block.draw(this.ctx);
        this.bricks.draw(this.ctx, this.ball);
        let gameFinished = false;
        let msg = "";
        if(this.bricks.isEmpty()) {
            msg = "대박.. 혹시 프로게이머? 😯"; gameFinished = true;
        }
        if(this.ball.touchBottom(this.stageHeight)) {
            msg = "벽돌 " + this.bricks.broken + "개 깨느라 수고하셨네요~😏"; gameFinished = true;
        }
        if(gameFinished) {
            if(confirm(msg + '\n재도전하시겠어요?')) {
                location.reload();
            }
        } else window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}