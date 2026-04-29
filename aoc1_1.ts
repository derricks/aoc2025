import { AoCProcessor } from './aocprocessor.js'
import type { LineProcessor } from './aocprocessor.js';

class AoC1_1 implements LineProcessor {
    curDial: number;
    zeroCount: number;

    constructor() {
        this.curDial = 50;
        this.zeroCount = 0;
        this.processLine = this.processLine.bind(this);
        this.finish = this.finish.bind(this);
    }

    processLine(line: string): void {
        let inst = {direction: line[0], amount: parseInt(line.slice(1), 10) % 100}

        if (inst.direction == 'L') {
            this.curDial -= inst.amount  
            this.curDial = this.curDial < 0 ? 100 + this.curDial : this.curDial
        } else if (inst.direction == 'R') {
            this.curDial += inst.amount
            this.curDial = this.curDial >= 100 ? this.curDial - 100 : this.curDial
        }
        if (this.curDial == 0) {
            this.zeroCount++
        }
    }

    finish(): void {
        console.log(this.zeroCount)
    }

}

const processor: AoCProcessor = new AoCProcessor('./inputs/1.1-real.txt');
const aoc1_1 = new AoC1_1()
processor.processFile(aoc1_1)
