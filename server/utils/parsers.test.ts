import * as v from 'valibot'
import { describe, expect, it } from 'vitest'
import { parseNumeric, parseRoster, parseSplit, parseTeamId } from './parsers'

describe('parseNumeric', () => {
  it('should parse string numbers to numeric values', () => {
    const parser = parseNumeric('playerId')
    const result = parser({ playerId: '123' })
    expect(result.playerId).toBe(123)
    expect(typeof result.playerId).toBe('number')
  })

  it('should parse decimal strings correctly', () => {
    const parser = parseNumeric('value')
    const result = parser({ value: '45.67' })
    expect(result.value).toBe(45.67)
  })

  it('should handle zero values', () => {
    const parser = parseNumeric('count')
    const result = parser({ count: '0' })
    expect(result.count).toBe(0)
  })

  it('should handle negative numbers', () => {
    const parser = parseNumeric('delta')
    const result = parser({ delta: '-50' })
    expect(result.delta).toBe(-50)
  })

  it('should convert non-numeric strings to NaN', () => {
    const parser = parseNumeric('id')
    const result = parser({ id: 'abc' })
    expect(result.id).toBeNaN()
  })

  it('should throw error for missing key', () => {
    const parser = parseNumeric('playerId')
    expect(() => parser({})).toThrow()
  })

  it('should throw error for null values', () => {
    const parser = parseNumeric('id')
    expect(() => parser({ id: null })).toThrow()
  })
})

describe('parseTeamId', () => {
  it('should parse string team IDs to numbers', () => {
    const parser = parseTeamId()
    const result = parser({ teamId: '5' })
    expect(result.teamId).toBe(5)
    expect(typeof result.teamId).toBe('number')
  })

  it('should accept numeric team IDs', () => {
    const parser = parseTeamId()
    const result = parser({ teamId: 10 })
    expect(result.teamId).toBe(10)
  })

  it('should accept zero as a valid team ID', () => {
    const parser = parseTeamId()
    const result = parser({ teamId: 0 })
    expect(result.teamId).toBe(0)
  })

  it('should throw error for negative team IDs', () => {
    const parser = parseTeamId()
    expect(() => parser({ teamId: -1 })).toThrow()
    expect(() => parser({ teamId: '-5' })).toThrow()
  })

  it('should throw error for missing teamId', () => {
    const parser = parseTeamId()
    expect(() => parser({})).toThrow()
  })

  it('should convert non-numeric string team IDs to NaN', () => {
    const parser = parseTeamId()
    const result = parser({ teamId: 'abc' })
    expect(result.teamId).toBeNaN()
  })

  it('should handle large team ID numbers', () => {
    const parser = parseTeamId()
    const result = parser({ teamId: 999999 })
    expect(result.teamId).toBe(999999)
  })
})

describe('parseSplit', () => {
  it('should return "overall" as default when no value provided', () => {
    const schema = v.object({ split: parseSplit() })
    const result = v.parse(schema, {})
    expect(result.split).toBe('overall')
  })

  it('should accept "overall" as valid split', () => {
    const schema = v.object({ split: parseSplit() })
    const result = v.parse(schema, { split: 'overall' })
    expect(result.split).toBe('overall')
  })

  it('should accept "talent" as valid split', () => {
    const schema = v.object({ split: parseSplit() })
    const result = v.parse(schema, { split: 'talent' })
    expect(result.split).toBe('talent')
  })

  it('should accept "vsl" as valid split', () => {
    const schema = v.object({ split: parseSplit() })
    const result = v.parse(schema, { split: 'vsl' })
    expect(result.split).toBe('vsl')
  })

  it('should accept "vsr" as valid split', () => {
    const schema = v.object({ split: parseSplit() })
    const result = v.parse(schema, { split: 'vsr' })
    expect(result.split).toBe('vsr')
  })

  it('should throw error for invalid split values', () => {
    const schema = v.object({ split: parseSplit() })
    expect(() => v.parse(schema, { split: 'invalid' })).toThrow()
    expect(() => v.parse(schema, { split: 'OVERALL' })).toThrow()
    expect(() => v.parse(schema, { split: 'total' })).toThrow()
  })

  it('should return default when undefined is provided', () => {
    const schema = v.object({ split: parseSplit() })
    const result = v.parse(schema, { split: undefined })
    expect(result.split).toBe('overall')
  })
})

describe('parseRoster', () => {
  it('should return "primary" as default when no value provided', () => {
    const schema = v.object({ roster: parseRoster() })
    const result = v.parse(schema, {})
    expect(result.roster).toBe('primary')
  })

  it('should accept "primary" as valid roster', () => {
    const schema = v.object({ roster: parseRoster() })
    const result = v.parse(schema, { roster: 'primary' })
    expect(result.roster).toBe('primary')
  })

  it('should accept "reserve" as valid roster', () => {
    const schema = v.object({ roster: parseRoster() })
    const result = v.parse(schema, { roster: 'reserve' })
    expect(result.roster).toBe('reserve')
  })

  it('should throw error for invalid roster values', () => {
    const schema = v.object({ roster: parseRoster() })
    expect(() => v.parse(schema, { roster: 'invalid' })).toThrow()
    expect(() => v.parse(schema, { roster: 'PRIMARY' })).toThrow()
    expect(() => v.parse(schema, { roster: 'active' })).toThrow()
  })

  it('should return default when undefined is provided', () => {
    const schema = v.object({ roster: parseRoster() })
    const result = v.parse(schema, { roster: undefined })
    expect(result.roster).toBe('primary')
  })

  it('should throw error for null values', () => {
    const schema = v.object({ roster: parseRoster() })
    expect(() => v.parse(schema, { roster: null })).toThrow()
  })
})

describe('parsers integration', () => {
  it('should work together in a complex schema', () => {
    const schema = v.object({
      teamId: v.pipe(v.union([v.string(), v.number()]), v.transform(Number), v.minValue(0)),
      split: parseSplit(),
      roster: parseRoster(),
    })

    const result = v.parse(schema, {
      teamId: '5',
      split: 'vsl',
      roster: 'reserve',
    })

    expect(result.teamId).toBe(5)
    expect(result.split).toBe('vsl')
    expect(result.roster).toBe('reserve')
  })

  it('should use defaults when optional fields are missing', () => {
    const schema = v.object({
      teamId: v.pipe(v.union([v.string(), v.number()]), v.transform(Number), v.minValue(0)),
      split: parseSplit(),
      roster: parseRoster(),
    })

    const result = v.parse(schema, { teamId: 10 })

    expect(result.teamId).toBe(10)
    expect(result.split).toBe('overall')
    expect(result.roster).toBe('primary')
  })
})
