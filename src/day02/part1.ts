import * as fs from 'fs';
import * as path from 'path'

const COLOR_RULES = {
  'red': 12,
  'green': 13,
  'blue': 14,
}

const checkPulls = set => {
  const matches = set.matchAll(/\d+\s(red|green|blue)/g)
  for (const match of matches) {
    const [count, color] = match[0].split(' ');
    if (COLOR_RULES[color] < Number(count)) {
      return false
    }
  }
  return true;

}

const addPossibleGameIdToScore = (score, game) => {
  const [idStr, rawSets] = game.split(': ');
  const gameId = Number(idStr.split(' ')[1]);
  const pulls = rawSets.split('; ')
  return pulls.every(checkPulls) ?
    score + gameId :
    score;
}

export const solver = (fileName='input.txt') => {
  const file = path.join(__dirname, fileName)
  const data = fs.readFileSync(file, 'utf-8')
  const games = data.split('\n')

  return games.reduce(addPossibleGameIdToScore, 0)
}


console.log(solver())