CREATE TABLE team_members (
  team_member_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  unique (first_name, last_name)
);