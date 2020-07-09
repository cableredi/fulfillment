const StatsService = {
  getAllPick(knex) {
    return knex
      .select("*")
      .from("pick_stats")
      .join(
        "team_members",
        "team_members.team_member_id",
        "pick_stats.team_member_id"
      )
      .orderBy("pick_stats.team_member_id", "asc", "pick_date", "asc")
  },
  getAllPack(knex) {
    return knex
      .select("*")
      .from("pack_stats")
      .join(
        "team_members",
        "team_members.team_member_id",
        "pack_stats.team_member_id"
      )
      .orderBy("pack_stats.team_member_id", "asc", "pack_date", "asc");
  },
  getAllOpu(knex) {
    return knex
      .select("*")
      .from("opu_stats")
      .join(
        "team_members",
        "team_members.team_member_id",
        "opu_stats.team_member_id"
      )
      .orderBy("opu_stats.team_member_id", "asc", "opu_date", "asc");
  },
  getByTeamMemberId(knex, id) {
    return knex
      .select("*")
      .from("pick_stats")
      .where("pick_stats.team_member_id", id)
      .join("pack_stats", "pack_stats.team_member_id", id)
      .join("opu_stats", "opu_stats.team_member_id", id);
  },
};

module.exports = StatsService;
