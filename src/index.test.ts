import { describe, expect, it } from 'vitest'
import { fizzBuzz } from '.'

const generateFizzBuzzDatas = (n: number): [number, string][] =>
  Array.from({ length: n }, (_, i) => {
    const num = i + 1
    const output = (num % 3 === 0 ? 'Fizz' : '') + (num % 5 === 0 ? 'Buzz' : '') || num.toString()
    return [num, output]
  })

export const fizzBuzzTestCases: [number, string][] = generateFizzBuzzDatas(100000)

describe('fizzBuzz test', () => {
  it.concurrent.each(fizzBuzzTestCases)('fizzBuzz(%s) -> %s', (input, expected) => {
    const result = fizzBuzz(input)
    expect(result).toEqual(expected)
  })
})
