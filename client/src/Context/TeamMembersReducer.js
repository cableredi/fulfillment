export default (state, action) => {
  switch (action.type) {
    case "SET_TEAM_MEMBERS":
      return action.payload;

    case "UPDATE_TEAM_MEMBER":
      const updatedTeamMember = action.payload;

      return state.map((member) =>
        member.team_member_id !== updatedTeamMember.team_member_id
          ? member
          : updatedTeamMember
      );

    case "ADD_TEAM_MEMBER":
      return [...state, action.payload]

    default:
      return state;
  }
};
