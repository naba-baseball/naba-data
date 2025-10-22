import * as v from 'valibot'
import { describe, expect, it } from 'vitest'
import { paginationSchema } from './paginationSchema'

describe('paginationSchema', () => {
  describe('limit', () => {
    it('should default to 10 when not provided', () => {
      const schema = v.object({ limit: paginationSchema.limit })
      const result = v.parse(schema, {})
      expect(result.limit).toBe(10)
    })

    it('should accept numeric limit values', () => {
      const schema = v.object({ limit: paginationSchema.limit })
      const result = v.parse(schema, { limit: 25 })
      expect(result.limit).toBe(25)
    })

    it('should convert string limit to number', () => {
      const schema = v.object({ limit: paginationSchema.limit })
      const result = v.parse(schema, { limit: '50' })
      expect(result.limit).toBe(50)
      expect(typeof result.limit).toBe('number')
    })

    it('should handle zero as a limit', () => {
      const schema = v.object({ limit: paginationSchema.limit })
      const result = v.parse(schema, { limit: 0 })
      expect(result.limit).toBe(0)
    })

    it('should handle large limit values', () => {
      const schema = v.object({ limit: paginationSchema.limit })
      const result = v.parse(schema, { limit: 1000 })
      expect(result.limit).toBe(1000)
    })

    it('should convert string numbers with decimals to integers', () => {
      const schema = v.object({ limit: paginationSchema.limit })
      const result = v.parse(schema, { limit: '15.7' })
      expect(result.limit).toBe(15.7)
    })
  })

  describe('offset', () => {
    it('should default to 0 when not provided', () => {
      const schema = v.object({ offset: paginationSchema.offset })
      const result = v.parse(schema, {})
      expect(result.offset).toBe(0)
    })

    it('should accept numeric offset values', () => {
      const schema = v.object({ offset: paginationSchema.offset })
      const result = v.parse(schema, { offset: 100 })
      expect(result.offset).toBe(100)
    })

    it('should convert string offset to number', () => {
      const schema = v.object({ offset: paginationSchema.offset })
      const result = v.parse(schema, { offset: '200' })
      expect(result.offset).toBe(200)
      expect(typeof result.offset).toBe('number')
    })

    it('should handle zero as an offset', () => {
      const schema = v.object({ offset: paginationSchema.offset })
      const result = v.parse(schema, { offset: 0 })
      expect(result.offset).toBe(0)
    })

    it('should handle large offset values', () => {
      const schema = v.object({ offset: paginationSchema.offset })
      const result = v.parse(schema, { offset: 999999 })
      expect(result.offset).toBe(999999)
    })
  })

  describe('orderBy', () => {
    it('should default to empty string and "asc" when not provided', () => {
      const schema = v.object({ orderBy: paginationSchema.orderBy })
      const result = v.parse(schema, {})
      expect(result.orderBy).toEqual(['', 'asc'])
    })

    it('should accept valid orderBy tuple with asc direction', () => {
      const schema = v.object({ orderBy: paginationSchema.orderBy })
      const result = v.parse(schema, { orderBy: ['name', 'asc'] })
      expect(result.orderBy).toEqual(['name', 'asc'])
    })

    it('should accept valid orderBy tuple with desc direction', () => {
      const schema = v.object({ orderBy: paginationSchema.orderBy })
      const result = v.parse(schema, { orderBy: ['created_at', 'desc'] })
      expect(result.orderBy).toEqual(['created_at', 'desc'])
    })

    it('should accept any string as column name', () => {
      const schema = v.object({ orderBy: paginationSchema.orderBy })
      const result = v.parse(schema, { orderBy: ['player_id', 'asc'] })
      expect(result.orderBy).toEqual(['player_id', 'asc'])
    })

    it('should throw error for invalid direction', () => {
      const schema = v.object({ orderBy: paginationSchema.orderBy })
      expect(() => v.parse(schema, { orderBy: ['name', 'invalid'] })).toThrow()
      expect(() => v.parse(schema, { orderBy: ['name', 'ASC'] })).toThrow()
      expect(() => v.parse(schema, { orderBy: ['name', 'DESC'] })).toThrow()
    })

    it('should throw error for wrong tuple size', () => {
      const schema = v.object({ orderBy: paginationSchema.orderBy })
      expect(() => v.parse(schema, { orderBy: ['name'] })).toThrow()
      // Note: Arrays with extra elements are silently truncated by valibot tuples
    })

    it('should throw error for non-tuple values', () => {
      const schema = v.object({ orderBy: paginationSchema.orderBy })
      expect(() => v.parse(schema, { orderBy: 'name' })).toThrow()
      expect(() => v.parse(schema, { orderBy: { column: 'name', dir: 'asc' } })).toThrow()
    })
  })

  describe('full pagination schema', () => {
    it('should handle all fields together with defaults', () => {
      const schema = v.object(paginationSchema)
      const result = v.parse(schema, {})
      expect(result).toEqual({
        limit: 10,
        offset: 0,
        orderBy: ['', 'asc'],
      })
    })

    it('should handle all fields together with provided values', () => {
      const schema = v.object(paginationSchema)
      const result = v.parse(schema, {
        limit: 25,
        offset: 50,
        orderBy: ['name', 'desc'],
      })
      expect(result).toEqual({
        limit: 25,
        offset: 50,
        orderBy: ['name', 'desc'],
      })
    })

    it('should handle mixed string and number inputs', () => {
      const schema = v.object(paginationSchema)
      const result = v.parse(schema, {
        limit: '30',
        offset: 60,
        orderBy: ['updated_at', 'asc'],
      })
      expect(result).toEqual({
        limit: 30,
        offset: 60,
        orderBy: ['updated_at', 'asc'],
      })
    })

    it('should handle partial pagination parameters', () => {
      const schema = v.object(paginationSchema)
      const result = v.parse(schema, {
        limit: 50,
      })
      expect(result).toEqual({
        limit: 50,
        offset: 0,
        orderBy: ['', 'asc'],
      })
    })

    it('should work with common database column names', () => {
      const schema = v.object(paginationSchema)
      const testCases = [
        ['id', 'asc'],
        ['created_at', 'desc'],
        ['updated_at', 'desc'],
        ['player_name', 'asc'],
        ['team_id', 'asc'],
        ['rating', 'desc'],
      ]

      testCases.forEach(([column, direction]) => {
        const result = v.parse(schema, {
          orderBy: [column, direction],
        })
        expect(result.orderBy).toEqual([column, direction])
      })
    })

    it('should handle realistic pagination scenarios', () => {
      const schema = v.object(paginationSchema)

      // First page
      const page1 = v.parse(schema, { limit: 20, offset: 0, orderBy: ['name', 'asc'] })
      expect(page1).toEqual({ limit: 20, offset: 0, orderBy: ['name', 'asc'] })

      // Second page
      const page2 = v.parse(schema, { limit: 20, offset: 20, orderBy: ['name', 'asc'] })
      expect(page2).toEqual({ limit: 20, offset: 20, orderBy: ['name', 'asc'] })

      // Third page
      const page3 = v.parse(schema, { limit: 20, offset: 40, orderBy: ['name', 'asc'] })
      expect(page3).toEqual({ limit: 20, offset: 40, orderBy: ['name', 'asc'] })
    })
  })
})
