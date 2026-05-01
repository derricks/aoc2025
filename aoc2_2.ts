import { AoC2_1 } from "./aoc2_1.js";
import { AoCProcessor } from "./aocprocessor.js";

class AoC2_2 extends AoC2_1 {
    constructor() {
        super();
    }

     isDuplicateDigitStrings(numString: string): boolean {
        // 2_1 check is still valid
        if (super.isDuplicateDigitStrings(numString)) {
            return true;
        }

        // in this variant, any number of repetitions works
        // 111 is now invalid
        // the whole id has to be made up duplications
        // divide up numstring into / length substring
        // see if those are all equal

        for (let substringEnd = 1; substringEnd <= numString.length / 2; substringEnd++) {
            // make an increasingly large substring up to half the length of numString
            const substring = numString.slice(0, substringEnd);

            // if the length of numString % lenth substring != 0 return false
            if (numString.length % substring.length != 0) {
                continue;
            }

            let allMatched = true;
            for (let newSubStart = substring.length; newSubStart <= numString.length - substring.length; newSubStart += substring.length) {
                const newSub = numString.slice(newSubStart, newSubStart + substring.length);
                if (newSub != substring) {
                    allMatched = false;
                    break;
                }
            }
            if (allMatched) {
                return true;
            }
        }
        return false;
    }
   
}

const processor: AoCProcessor = new AoCProcessor('./inputs/2-real.txt');
const aoc2_2 = new AoC2_2();
processor.processFile(aoc2_2);
