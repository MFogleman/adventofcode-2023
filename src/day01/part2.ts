import * as fs from 'fs';
import * as path from 'path'

const NUM_MAP = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
}

type Found = {
  word: string,
  idx: number,
  digit: string
}

export const solver = (fileName='input.txt') => {
  const file = path.join(__dirname, fileName)
  const data = fs.readFileSync(file, 'utf-8')

  const arr = data.split('\n')

  return arr.reduce(
    (accum: number, str: string) => {
      const found: Found[] = []

      Object.entries(NUM_MAP).forEach(([word, digit]) => {
        const matches = str.matchAll(new RegExp(word, 'g'))
        for (const match of matches) {
          found.push({word, digit, idx: match.index as number})
        }
      })

      const sortedFound = found.sort((b, a) => b.idx - a.idx)
      const firstNum = sortedFound[0].digit
      const lastNum = sortedFound[sortedFound.length-1].digit
      const num = Number(`${firstNum}${lastNum}`)
      return accum+num

    },
    0
  )
}

console.log(solver())
