import * as fs from 'fs';
import * as path from 'path'

export const solver = (fileName='input.txt') => {
  const file = path.join(__dirname, fileName)
  const data = fs.readFileSync(file, 'utf-8')

  const arr = data.split('\n')

  return arr.reduce(
    (accum: number, str: string) => {
      const digits = str.replaceAll(/\D/g, '')
      const firstNum = digits[0]
      const lastNum = digits[digits.length-1]
      const num = Number(`${firstNum}${lastNum}`)

      return accum+num
    },
    0
  )
}


console.log(solver())