import { describe, expect, it } from 'vitest'
import { scaleObject, scaleRatings } from './scaleRatings'

describe('scaleRatings', () => {
  it('should scale minimum value (0) to 20', () => {
    expect(scaleRatings(0)).toBe(20)
  })

  it('should scale maximum value (250) to 80', () => {
    expect(scaleRatings(250)).toBe(80)
  })

  it('should scale mid-range values correctly', () => {
    expect(scaleRatings(125)).toBe(55)
  })

  it('should return value in increments of 5', () => {
    const result = scaleRatings(100)
    expect(result % 5).toBe(0)
  })

  it('should clamp values below 0 to 20', () => {
    expect(scaleRatings(-10)).toBe(20)
    expect(scaleRatings(-100)).toBe(20)
  })

  it('should clamp values above 250 to 80', () => {
    expect(scaleRatings(300)).toBe(80)
    expect(scaleRatings(1000)).toBe(80)
  })

  it('should handle edge case values', () => {
    expect(scaleRatings(1)).toBe(20)
    expect(scaleRatings(249)).toBe(80)
  })

  it('should scale common rating values correctly', () => {
    // Test some common rating values
    expect(scaleRatings(50)).toBe(35)
    expect(scaleRatings(75)).toBe(45)
    expect(scaleRatings(150)).toBe(65)
    expect(scaleRatings(200)).toBe(80)
  })

  it('should return consistent results for same input', () => {
    const input = 137
    const result1 = scaleRatings(input)
    const result2 = scaleRatings(input)
    expect(result1).toBe(result2)
  })

  it('should always return values in the range [20, 80]', () => {
    const testValues = [0, 10, 50, 100, 125, 150, 200, 250, 300]
    testValues.forEach((value) => {
      const result = scaleRatings(value)
      expect(result).toBeGreaterThanOrEqual(20)
      expect(result).toBeLessThanOrEqual(80)
    })
  })
})

describe('scaleObject', () => {
  it('should scale numeric properties containing "ratings" in their key', () => {
    const obj = {
      battingRatings: 100,
      name: 'Player',
      age: 25,
    }
    const result = scaleObject(obj)
    expect(result.battingRatings).toBe(scaleRatings(100))
    expect(result.name).toBe('Player')
    expect(result.age).toBe(25)
  })

  it('should be case-insensitive when matching "ratings" in keys', () => {
    const obj = {
      BattingRATINGS: 150,
      pitchingratings: 100,
      OverallRatings: 125,
    }
    const result = scaleObject(obj)
    expect(result.BattingRATINGS).toBe(scaleRatings(150))
    expect(result.pitchingratings).toBe(scaleRatings(100))
    expect(result.OverallRatings).toBe(scaleRatings(125))
  })

  it('should not scale numeric properties without "ratings" in their key', () => {
    const obj = {
      battingRatings: 100,
      playerId: 12345,
      teamId: 5,
      age: 28,
    }
    const result = scaleObject(obj)
    expect(result.battingRatings).toBe(scaleRatings(100))
    expect(result.playerId).toBe(12345)
    expect(result.teamId).toBe(5)
    expect(result.age).toBe(28)
  })

  it('should handle objects with no ratings properties', () => {
    const obj = {
      name: 'Test',
      value: 100,
      count: 50,
    }
    const result = scaleObject(obj)
    expect(result).toEqual(obj)
  })

  it('should handle empty objects', () => {
    const obj = {}
    const result = scaleObject(obj)
    expect(result).toEqual({})
  })

  it('should handle mixed type properties correctly', () => {
    const obj = {
      contactRatings: 150,
      powerRatings: 200,
      name: 'John Doe',
      active: true,
      salary: null,
      stats: undefined,
    }
    const result = scaleObject(obj)
    expect(result.contactRatings).toBe(scaleRatings(150))
    expect(result.powerRatings).toBe(scaleRatings(200))
    expect(result.name).toBe('John Doe')
    expect(result.active).toBe(true)
    expect(result.salary).toBe(null)
    expect(result.stats).toBe(undefined)
  })

  it('should mutate the original object and return it', () => {
    const obj = {
      battingRatings: 100,
      name: 'Player',
    }
    const result = scaleObject(obj)
    expect(result).toBe(obj) // Same reference
    expect(obj.battingRatings).toBe(scaleRatings(100))
  })

  it('should handle multiple rating properties', () => {
    const obj = {
      contactRatings: 100,
      powerRatings: 150,
      speedRatings: 200,
      fieldingRatings: 75,
      name: 'Player',
    }
    const result = scaleObject(obj)
    expect(result.contactRatings).toBe(scaleRatings(100))
    expect(result.powerRatings).toBe(scaleRatings(150))
    expect(result.speedRatings).toBe(scaleRatings(200))
    expect(result.fieldingRatings).toBe(scaleRatings(75))
    expect(result.name).toBe('Player')
  })
})
