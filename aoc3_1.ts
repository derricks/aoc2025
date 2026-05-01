import { AoCProcessor } from "./aocprocessor.js";
import type { LineProcessor } from "./aocprocessor.js";

export class AoC3_1 implements LineProcessor {

    highestJoltages: number[]

    constructor() {
        this.highestJoltages = []
        this.processLine = this.processLine.bind(this);
        this.finish = this.finish.bind(this);
    }

    processLine(line: string): void {
        const joltages = line.split('');
        const joltageNums = joltages.map(x => parseInt(x, 10));
        const maxJoltage = this.findMaxJoltage(joltageNums)
        this.highestJoltages.push(maxJoltage);
    }

    findMaxJoltage(joltageNums: number[]): number {
        let curMax = 0;

        for (let idx = 0; idx < joltageNums.length; idx++) {
            // if the current value * 10 < curMax, it can't be the start of a new max
            if (joltageNums[idx]! * 10 < curMax) {
                continue;
            }

            const tens = joltageNums[idx]! * 10;
            for (let idx2 = idx+1; idx2 < joltageNums.length; idx2++) {
                const combined = tens + joltageNums[idx2]!;
                if (combined > curMax) {
                    curMax = combined;
                }
            }
        }
        return curMax;
    }

    finish(): void {
        let sum = this.highestJoltages.reduce( (total, joltage) => joltage + total, 0);
        console.log(sum);
    }
}

const processor: AoCProcessor = new AoCProcessor('./inputs/3-real.txt');
const aoc3_1 = new AoC3_1()
processor.processFile(aoc3_1)

