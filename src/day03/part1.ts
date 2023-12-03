import * as fs from 'fs';
import * as path from 'path'

type Coord = {x: number, y: number};
type Part = {
  number: string;
  start: Coord;
  end: Coord;
}


/**
 * A part is valid if there is not a symbol above, below, or diagonal to it
 */
const checkPart = (symbols: Coord[]) => (part: Part) =>
  symbols
    .filter(rowSym => rowSym.x >= part.start.x-1 && rowSym.x <= part.start.x + 1)
    .some(symbol => symbol.y >= part.start.y-1  && symbol.y <= part.end.y+1);

export const solver = (fileName='input.txt') => {
  const file = path.join(__dirname, fileName)
  const data = fs.readFileSync(file, 'utf-8')
  const rowData = data.split('\n')

  const rowSymbols: Coord[] = []
  const parts: Part[] = [];

  rowData.forEach((row, rowIdx) => {
    // We want to check reach row for all numbers, plus symbols
    // There is a faster way to do this with grouping but I suspect
    // it will be quicker to just run 2 separate checks instead of figuring
    // that out.
    const matches = row.matchAll(/\d+/g)
    for (const match of matches) {
      const num = match[0]
      parts.push({
        number: num,
        start: {x: rowIdx, y: match.index },
        end: {x: rowIdx, y: match.index + (num.length-1)}
      })
    }

    const symbols = row.matchAll(/[^\.\d]/g)
    for (const symbolMatch of symbols) {
      rowSymbols.push({x: rowIdx, y: symbolMatch.index});
    }
  })


  return parts.reduce((sum, part) =>
    checkPart(rowSymbols)(part) ? sum + Number(part.number) : sum,
    0
  )
}


console.log(solver())