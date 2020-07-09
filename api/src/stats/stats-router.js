const express = require("express");
const xss = require("xss");
const StatsService = require("./stats-service");

const statsRouter = express.Router();

const serializePickStats = (stat) => ({
  stat_id: stat.stat_id,
  pick_date: stat.pick_date,
  team_member_id: stat.team_member_id,
  pick_total: stat.pick_total,
  pick_percent: stat.pick_percent,
  pick_inf: stat.pick_inf,
});

const serializePackStats = (stat) => ({
  stat_id: stat.stat_id,
  pack_date: stat.pack_date,
  team_member_id: stat.team_member_id,
  pack_total: stat.pack_total,
  pack_percent: stat.pack_percent,
  pack_inf: stat.pack_inf,
});

const serializeOpuStats = (stat) => ({
  stat_id: stat.stat_id,
  opu_date: stat.opu_date,
  team_member_id: stat.team_member_id,
  opu_total: stat.opu_total,
  opu_percent: stat.opu_percent,
  opu_inf: stat.opu_inf,
});

statsRouter
  .route("/pick/")

  .get((req, res, next) => {
    StatsService.getAllPick(req.app.get("db"))
      .then((stats) => {
        let result = [];
        let index = {};

        stats.forEach((stat) => {
          if (!(stat.team_member_id in index)) {
            index[stat.team_member_id] = {
              team_member_id: stat.team_member_id,
              first_name: xss(stat.first_name),
              last_name: xss(stat.last_name),
              pick_stats: []
            };
            result.push(index[stat.team_member_id])
          }
          index[stat.team_member_id].pick_stats.push({
            pick_stat_id: stat.pick_stat_id,
            pick_date: stat.pick_date,
            pick_total: stat.pick_total,
            pick_percent: stat.pick_percent,
            pick_inf: stat.pick_inf,
          })
        });
        res.json(result);
      })
      .catch(next);
  });

statsRouter
  .route("/pack/")

  .get((req, res, next) => {
    StatsService.getAllPack(req.app.get("db"))
    .then((stats) => {
      let result = [];
      let index = {};

      stats.forEach((stat) => {
        if (!(stat.team_member_id in index)) {
          index[stat.team_member_id] = {
            team_member_id: stat.team_member_id,
            first_name: xss(stat.first_name),
            last_name: xss(stat.last_name),
            pack_stats: []
          };
          result.push(index[stat.team_member_id])
        }
        index[stat.team_member_id].pack_stats.push({
          pack_stat_id: stat.pack_stat_id,
          pack_date: stat.pack_date,
          pack_total: stat.pack_total,
          pack_percent: stat.pack_percent,
          pack_inf: stat.pack_inf,
        })
      });
      res.json(result);
    })
      .catch(next);
  });

statsRouter
  .route("/opu/")

  .get((req, res, next) => {
    StatsService.getAllOpu(req.app.get("db"))
    .then((stats) => {
      let result = [];
      let index = {};

      stats.forEach((stat) => {
        if (!(stat.team_member_id in index)) {
          index[stat.team_member_id] = {
            team_member_id: stat.team_member_id,
            first_name: xss(stat.first_name),
            last_name: xss(stat.last_name),
            opu_stats: []
          };
          result.push(index[stat.team_member_id])
        }
        index[stat.team_member_id].opu_stats.push({
          opu_stat_id: stat.opu_stat_id,
          opu_date: stat.opu_date,
          opu_total: stat.opu_total,
          opu_percent: stat.opu_percent,
          opu_inf: stat.opu_inf,
        })
      });
      res.json(result);
    })
      .catch(next);
  });

statsRouter
  .route("/:team_member_id")

  .all((req, res, next) => {
    StatsService.getByTeamMemberId(req.app.get("db"), req.params.team_member_id)
      .then((stat) => {
        if (!stat) {
          return res.status(404).json({
            error: { message: "Stat Not Found" },
          });
        }
        res.stat = stat;
        next();
      })
      .catch();
  })

  .get((req, res) => {
    res.json(serializeStats(res.stat));
  });

module.exports = statsRouter;
