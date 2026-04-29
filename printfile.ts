import * as fs from 'node:fs';

const filePath: string = 'input.txt';
const content: string = fs.readFileSync(filePath, 'utf-8');
const lines: string[] = content.split('\n')

console.log(lines[0])