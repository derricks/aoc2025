import { AoCProcessor } from './aocprocessor.js'
import type { LineProcessor } from './aocprocessor.js';

export type PasswordInstruction = {
    direction: string | undefined; // not possible in context but to make compiler happy
    amount: number;
}

export class AoC1_1 implements LineProcessor {
    curDial: number;
    zeroCount: number;

    constructor() {
        this.curDial = 50;
        this.zeroCount = 0;
        this.processLine = this.processLine.bind(this);
        this.processInstruction = this.processInstruction.bind(this);
        this.finish = this.finish.bind(this);
        this.getCurDial = this.getCurDial.bind(this)
        this.incrementZeroCount = this.incrementZeroCount.bind(this)
    }

    processLine(line: string): void {
        let inst = {direction: line[0], amount: parseInt(line.slice(1), 10)}
        this.processInstruction(inst)
    }

    processInstruction(inst: PasswordInstruction): void {
        let modAmt = inst.amount % 100
        if (inst.direction == 'L') {
            this.curDial -= modAmt
            this.curDial = this.curDial < 0 ? 100 + this.curDial : this.curDial
        } else if (inst.direction == 'R') {
            this.curDial += modAmt
            this.curDial = this.curDial >= 100 ? this.curDial - 100 : this.curDial
        }
        if (this.curDial == 0) {
            this.incrementZeroCount()
        }
    }

    finish(): void {
        console.log(this.zeroCount)
    }

    getCurDial() : number {
        return this.curDial
    }

    incrementZeroCount(): void {
        this.zeroCount++
    }
}

const processor: AoCProcessor = new AoCProcessor('./inputs/1.1-real.txt');
const aoc1_1 = new AoC1_1()
processor.processFile(aoc1_1)
