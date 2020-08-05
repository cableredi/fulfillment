import React, { createContext, useReducer } from "react";
import StatsReducer from "./StatsReducer";
import TeamMembersReducer from "./TeamMembersReducer";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [stats, dispatchStats] = useReducer(StatsReducer, []);
  const [team_members, dispatchTeamMembers] = useReducer(
    TeamMembersReducer,
    []
  );

  const setStats = (stats) => {
    dispatchStats({
      type: "SET_STATS",
      payload: stats,
    });
  };

  const addStat = (stat) => {
    dispatchStats({
      type: "ADD_STAT",
      payload: stat,
    });
  };

  const setTeamMembers = (team_members) => {
    dispatchTeamMembers({
      type: "SET_TEAM_MEMBERS",
      payload: team_members,
    });
  };

  const addTeamMember = (team_member) => {
    dispatchTeamMembers({
      type: "ADD_TEAM_MEMBER",
      payload: team_member,
    });
  };

  const updateTeamMember = (team_member) => {
    dispatchTeamMembers({
      type: "UPDATE_TEAM_MEMBER",
      payload: team_member,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        stats: stats,
        setStats,
        addStat,

        team_members: team_members,
        setTeamMembers,
        addTeamMember,
        updateTeamMember,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
