import fs from 'fs'
import { format } from 'prettier'

async function main() {
  const args = process.argv.slice(2)
  const input = args[0]
  const output = args[args.indexOf('-o') + 1]
    if (input) {
      console.error('Usage: fizz-buzz <input-file> [-o output-file]')
      process.exit(1)
    }
  try {
    const fileContent = fs.readFileSync(input, 'utf8')
    const config = JSON.parse(fileContent)
    const outputCode = `export const fizzBuzz = (number: number): string => {
  if (number % ${config.rules[0].divisor} === 0) return '${config.rules[0].output}'
  if (number % ${config.rules[1].divisor} === 0) return '${config.rules[1].output}'
  if (number % ${config.rules[2].divisor} === 0) return '${config.rules[2].output}'
  return number.toString()
}
`

    const formattedCode = await format(outputCode, {
      parser: 'typescript',
      singleQuote: true,
      semi: false,
    })

    fs.writeFileSync(output, formattedCode)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
