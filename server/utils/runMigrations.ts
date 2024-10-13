export async function runMigrations() {
  const migrations = [
    import('@@/server/scripts/migrations/playersMigration.js'),
    import('@@/server/scripts/migrations/teamsMigration.js'),
    import('@@/server/scripts/migrations/playersBattingMigration.js'),
    import('@@/server/scripts/migrations/playersPitchingMigration.js'),
    import('@@/server/scripts/migrations/careerBattingMigration.js'),
    import('@@/server/scripts/migrations/teamRosterMigration.js'),
  ]

  for await (const migration of migrations) {
    await migration.up(useSqlite())
  }
}

export async function rollbackMigrations() {
  const migrations = [
    import('@@/server/scripts/migrations/careerBattingMigration.js'),
    import('@@/server/scripts/migrations/playersPitchingMigration.js'),
    import('@@/server/scripts/migrations/playersBattingMigration.js'),
    import('@@/server/scripts/migrations/teamsMigration.js'),
    import('@@/server/scripts/migrations/playersMigration.js'),
    import('@@/server/scripts/migrations/teamRosterMigration.js'),
  ]
  for await (const migration of migrations) {
    await migration.down(useSqlite())
  }
}
