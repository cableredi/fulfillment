const StatsService = {
  getAllLastDay(knex) {
    return knex.raw(`
        select *
        from stats
        join team_members on team_members.team_member_id = stats.team_member_id
        where date = (
          select max(date)
          from stats
        )
      `);
  },
  getAll(knex) {
    return knex
      .select("*")
      .from("stats")
      .join(
        "team_members",
        "team_members.team_member_id",
        "stats.team_member_id"
      )
      .orderBy("stats.team_member_id", "asc", "date", "asc");
  },
  getByTeamMemberId(knex, id) {
    return knex
      .select("*")
      .from("pick_stats")
      .where("pick_stats", "team_member_id", id)
      .join("pack_stats", "pack_stats.team_member_id", id)
      .join("opu_stats", "opu_stats.team_member_id", id);
  },
  insertStat(knex, stat) {
    return knex
      .insert(stat)
      .into('stats')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
};

module.exports = StatsService;
