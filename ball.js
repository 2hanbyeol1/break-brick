export class Ball {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;
    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth);
        this.bounceBlock(block);

        ctx.fillStyle = '#fdd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth) {
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;

        if(this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } else if (this.y <= minY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    touchBottom(stageHeight) {
        const maxY = stageHeight - this.radius;
        if (this.y >= maxY) return true;
    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            // 충돌이 양옆인지 위아래인지 판단하기 위해 -> Ball과 Block의 각 꼭짓점 사이의 거리 비교
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if (min == min1) {
                this.vx *= -1;
                this.x += this.vx;
            } else if (min == min2) {
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}