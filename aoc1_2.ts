import { AoC1_1 } from "./aoc1_1.js";
import { AoCProcessor } from "./aocprocessor.js";
import type { PasswordInstruction } from "./aoc1_1.js";

class AoC1_2 extends AoC1_1 {
    constructor() {
        super()
    }

    processInstruction(inst: PasswordInstruction): void {
        // note that amount could be very large, which
        // is the same logic for both directions
        for (let i = 100; i <= inst.amount; i+= 100) {
            super.incrementZeroCount();
        }

        // the logic below here would think we're passing 0 in this
        // but that's because we're starting at 0
        if (super.getCurDial() == 0) {
            return super.processInstruction(inst)            
        }

        if (inst.direction == 'L') {
            if (inst.amount > super.getCurDial()) {
                let modAmt = inst.amount % 100;
                if (modAmt > super.getCurDial()) {
                    super.incrementZeroCount();
                }
            }
        }
        if (inst.direction == 'R') {
            let modAmt = inst.amount % 100;
            if (modAmt + super.getCurDial() > 100) {
                super.incrementZeroCount()
            }
        }
        super.processInstruction(inst)
    }
}

const processor: AoCProcessor = new AoCProcessor('./inputs/1.1-real.txt');
const aoc1_2 = new AoC1_2()
processor.processFile(aoc1_2)
