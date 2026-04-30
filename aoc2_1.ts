import { AoCProcessor } from "./aocprocessor.js";
import type { LineProcessor } from "./aocprocessor.js";

export class AoC2_1 implements LineProcessor {

    invalidIds: number[]

    constructor() {
        this.invalidIds = []
        this.processLine = this.processLine.bind(this);
        this.finish = this.finish.bind(this);
        this.findInvalidIds = this.findInvalidIds.bind(this)
        this.isDuplicateDigitStrings = this.isDuplicateDigitStrings.bind(this)
    }

    processLine(line: string): void {
        let ranges = line.split(',');
        for (const range of ranges) {
            let nums = range.split('-');

            let beginString = nums[0];
            let endString = nums[1];

            if (beginString == undefined || endString == undefined) {
                console.log("Invalid range! " + range);
                return;
            }

            let begin = parseInt(beginString, 10);
            let end = parseInt(endString, 10);
            this.findInvalidIds(begin, end);
        }
    }

    finish(): void {
        let sum = this.invalidIds.reduce( (total, id) => id + total, 0);
        console.log(sum);
    }

    // per the problem, we need to find digit strings that are 
    // only made up of adjacent duplicate digit strings
    // for instance, 11 repeats 1. 6464 repeats 64. 64064 has no
    // adjacent duplicates
    findInvalidIds(start: number, end: number): void {
        for (let curNum = start; curNum <= end; curNum++) {
            if (this.isDuplicateDigitStrings(curNum.toString())) {
                this.invalidIds.push(curNum);
            }
        }
    }

    isDuplicateDigitStrings(numString: string): boolean {
        // given the constraint of the problem, can we just
        // split the string in half and see if the halves are equal?        
        if (numString.length % 2 == 1) {
            // by definition, this can't be only duplicated strings
            return false;
        }

        let pivot = numString.length / 2;
        let firstHalf = numString.slice(0, pivot);
        let secondHalf = numString.slice(pivot, numString.length);

        return firstHalf === secondHalf;
    }
}

const processor: AoCProcessor = new AoCProcessor('./inputs/2-real.txt');
const aoc2_1 = new AoC2_1()
processor.processFile(aoc2_1)

