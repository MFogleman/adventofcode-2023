import { max } from 'fp-ts/lib/ReadonlyNonEmptyArray';
import * as fs from 'fs';
import * as path from 'path'

const calcMaxPower = (power, pull) => {
  const matches = pull.matchAll(/\d+\s(red|green|blue)/g)
  for (const match of matches) {
    const [count, color] = match[0].split(' ');
    power[color] = Math.max(power[color], Number(count))
  }

  return power
}

const addPowers = (power, game) => {
  const allPulls = game.split(': ')[1]

  const pulls = allPulls.split('; ')

  const maxPowers = pulls.reduce(calcMaxPower, {red: 0, green: 0, blue: 0})

  return power + Object.values(maxPowers).reduce((a, b) => a * b);
}

export const solver = (fileName='input.txt') => {
  const file = path.join(__dirname, fileName)
  const data = fs.readFileSync(file, 'utf-8')
  const games = data.split('\n')

  return games.reduce(addPowers, 0)
}


console.log(solver())