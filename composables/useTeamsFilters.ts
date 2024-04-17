const filterSplit = () => useState<Split>('filter-split', () => 'overall')
const filterRoster = () => useState<'primary' | 'reserve'>('filter-roster', () => 'primary')
export function useTeamsFilters() {
  return {
    split: filterSplit(),
    roster: filterRoster(),
  }
}
