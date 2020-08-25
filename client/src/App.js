import React from "react";
import { Switch } from "react-router-dom";
import PublicOnlyRoute from './Utils/PublicRoute';
import PrivateRoute from './Utils/PrivateRoute';
import LandingPage from "./routes/LandingPage";
import MainPage from './routes/MainPage';
import GraphPage from './routes/GraphPage';
import TablesPage from './routes/TablesPage';
import TeamMembersPage from './routes/TeamMembersPage';
import StatisticsPage from './routes/StatisticsPage';

export default function App() {
  return (
    <>
      <Switch>
        <PublicOnlyRoute exact path="/" component={LandingPage} />
        <PrivateRoute exact path='/main' component={MainPage} />
        <PrivateRoute exact path='/teammembers' component={TeamMembersPage} />
        <PrivateRoute exact path='/graphs' component={GraphPage} />
        <PrivateRoute exact path='/tables' component={TablesPage} />
        <PrivateRoute exact path='/statistics' component={StatisticsPage} />
      </Switch>
    </>
  );
}
