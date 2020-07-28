const path = require("path");
const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const StatsService = require("./stats-service");
const { requireAuth } = require("../middleware/jwt-auth");

const statsRouter = express.Router();
const jsonParser = express.json();

const serializeStatsMember = (stat) => ({
  stat_id: stat.stat_id,
  date: stat.date,
  team_member_id: stat.team_member_id,
  first_name: xss(stat.first_name),
  last_name: xss(stat.last_name),
  stat_type: xss(stat.stat_type),
  total: stat.total,
  percent: stat.percent,
  inf: stat.inf,
});

const serializeStats = (stat) => ({
  stat_id: stat.stat_id,
  date: stat.date,
  team_member_id: stat.team_member_id,
  stat_type: xss(stat.stat_type),
  total: stat.total,
  percent: stat.percent,
  inf: stat.inf,
});

statsRouter
  .route("/all")

  .get((req, res, next) => {
    StatsService.getAll(req.app.get("db"))
      .then((stats) => {
        let result = [];
        let index = {};

        stats.forEach((stat) => {
          if (!(stat.team_member_id in index)) {
            index[stat.team_member_id] = {
              team_member_id: stat.team_member_id,
              first_name: xss(stat.first_name),
              last_name: xss(stat.last_name),
              stats: [],
            };
            result.push(index[stat.team_member_id]);
          }
          index[stat.team_member_id].stats.push({
            stat_id: stat.pick_stat_id,
            date: stat.pick_date,
            total: stat.pick_total,
            percent: stat.pick_percent,
            inf: stat.pick_inf,
          });
        });
        res.json(result);
      })
      .catch(next);
  });

statsRouter
  .route("/lastday")

  .get((req, res, next) => {
    StatsService.getAllLastDay(req.app.get("db"))
      .then((stats) => {
        res.json(stats.rows.map(serializeStatsMember));
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
    res.json(serializeStatsMember(res.stat));
  });

statsRouter
  .route("/")

  .post(jsonParser, (req, res, next) => {
    const { team_member_id, stat_type, date, total, percent, inf } = req.body;

    const newStats = {
      team_member_id,
      stat_type,
      date,
      total,
      percent,
      inf,
    };

    const numberOfValues = Object.values(newStats).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.sendStatus(400).json({
        error: {
          message: `Request body must contain all data`,
        },
      });
    }

    StatsService.insertStat(req.app.get("db"), newStats)
      .then((stats) => {
        logger.info(`Statistics with id ${stats.stat_id} created.`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${stats.stat_id}`))
          .json(serializeStats(stats));
      })
      .catch(next);
  });

module.exports = statsRouter;
