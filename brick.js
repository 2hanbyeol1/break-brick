export class Brick {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.maxX = width + x;
        this.maxY = height + y;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff9200';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        const xGap = 5;
        const yGap = 5;

        // 그림자
        ctx.fillStyle = '#ffb863';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - xGap, this.y - yGap);
        ctx.lineTo(this.maxX - xGap, this.y - yGap);
        ctx.lineTo(this.maxX, this.y);
        ctx.fill();

        ctx.fillStyle = '#a7650d';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - xGap, this.y - yGap);
        ctx.lineTo(this.x - xGap, this.maxY - yGap);
        ctx.lineTo(this.x, this.maxY);
        ctx.fill();
    }

    touchBall(ball) {
        if(this.y <= ball.y - ball.radius && ball.y - ball.radius <= this.maxY && this.x <= ball.x && ball.x <= this.maxX) {
            ball.vy *= -1;
            ball.y += ball.vy;
            return true;
        } else if(this.x <= ball.x + ball.radius && ball.x + ball.radius <= this.maxX && this.y <= ball.y && ball.y <= this.maxY) {
            ball.vx *= -1;
            ball.x += ball.vx;
            return true;
        }  else if(this.x <= ball.x - ball.radius && ball.x - ball.radius <= this.maxX && this.y <= ball.y && ball.y <= this.maxY) {
            ball.vx *= -1;
            ball.x += ball.vx;
            return true;
        } else if(this.y <= ball.y - ball.radius && ball.y - ball.radius <= this.maxY && this.x <= ball.x && ball.x <= this.maxX) {
            ball.vy *= -1;
            ball.y += ball.vy;
            return true;
        }
    }
}