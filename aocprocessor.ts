import * as fs from 'node:fs';

export interface LineProcessor {
    processLine(line: string): void;
    finish(): void;
}

export class AoCProcessor {
    filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath
    }

    processFile(lineProcessor: LineProcessor): void {
        // open the file and for each line call processLine
        const content: string = fs.readFileSync(this.filePath, 'utf-8');
        const lines: string[] = content.split('\n')
        lines.forEach(lineProcessor.processLine)
        lineProcessor.finish()
    }
}

