import React from "react";
import { Card, Header, Navigation } from "../../components";
import { AiOutlineTeam } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" />
        <div className="dashboardFlex">
          <div className="screenOne">
            <div className="cardFlex">
              <Card
                title="Total Users"
                count={2}
                url="/"
                Icon={AiOutlineTeam}
                color="blue"
                primary="cyan"
              />
              <Card
                title="Total Admin"
                count={2}
                url="/"
                Icon={AiOutlineTeam}
                color="gold"
                primary="lightGold"
              />
              <Card
                title="Total Admin"
                count={2}
                url="/"
                Icon={AiOutlineTeam}
                color="magenta"
                primary="crimson"
              />
            </div>
          </div>
          <div className="screenTwo"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
