import {
    Brick
} from "./brick.js";

export class Bricks {
    constructor(row, column) {
        this.row = row;
        this.bricks = [];
        this.brickSize = row * column; // Brick 개수
        this.broken = 0;
    }

    draw(ctx, ball) {
        for (let i = 0; i < this.bricks.length; i++) {
            if(this.bricks[i].touchBall(ball)) {
                this.bricks.splice(i, 1);
                i--; this.broken++;
            } else {
                this.bricks[i].draw(ctx, ball);
            }
        }
    }

    resize(stageWidth, stageHeight, interval) {
        this.brickWidth = (stageWidth - (interval * (this.row + 1))) / this.row;
        this.brickHeight = stageHeight * 0.03;
        for(let i = 0; i < this.brickSize; i++) {
            this.bricks[i] = new Brick(this.brickWidth, this.brickHeight
                , interval + (interval + this.brickWidth) * (i % 10)
                , interval + (interval + this.brickHeight) * parseInt(i / 10));
        }
    }
}