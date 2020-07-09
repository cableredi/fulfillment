CREATE TABLE pack_stats (
  pack_stat_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  team_member_id  INTEGER REFERENCES team_members(team_member_id) ON DELETE CASCADE NOT NULL,
  pack_date date NOT NULL DEFAULT now(),
  pack_total NUMERIC NOT NULL DEFAULT 0,
  pack_percent NUMERIC NOT NULL DEFAULT 0
);