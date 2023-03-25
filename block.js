export class Block {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.maxX = width + x;
        this.maxY = height + y;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff384e';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        const xGap = 5;
        const yGap = 5;

        // 그림자
        ctx.fillStyle = '#ff9ca8';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - xGap, this.y - yGap);
        ctx.lineTo(this.maxX - xGap, this.y - yGap);
        ctx.lineTo(this.maxX, this.y);
        ctx.fill();

        ctx.fillStyle = '#c1162a';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - xGap, this.y - yGap);
        ctx.lineTo(this.x - xGap, this.maxY - yGap);
        ctx.lineTo(this.x, this.maxY);
        ctx.fill();
    }

    move(x) {
        this.x = x;
        this.maxX = this.width + x;
    }
}