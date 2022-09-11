import React, { useEffect } from "react";
import { Card, Header, Navigation } from "../../components";
import { AiOutlineTeam } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranch } from "../../redux/actions/branchActions";
import { fetchDepartment } from "../../redux/actions/departmentActions";
import { fetchClient } from "../../redux/actions/clientActions";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { getallUsers } from "../../redux/actions/userActions";
import { fetchEvent } from "../../redux/actions/eventActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBranch());
    dispatch(fetchDepartment());
    dispatch(fetchClient());
    dispatch(fetchEmployee());
    dispatch(getallUsers());
    dispatch(fetchEvent());
  }, [dispatch]);

  const getBranch = useSelector((state) => state.getBranch);
  const { branches = [] } = getBranch;
  const getClient = useSelector((state) => state.getClient);
  const { clients = [] } = getClient;
  const getDepartment = useSelector((state) => state.getDepartment);
  const { departments = [] } = getDepartment;
  const getEmployee = useSelector((state) => state.getEmployee);
  const { employees = [] } = getEmployee;

  const userProfile = useSelector((state) => state.userProfile);
  const { user = {} } = userProfile;

  const getEvent = useSelector((state) => state.getEvent);
  const { events } = getEvent;
  const allUser = useSelector((state) => state.allUser);
  const { users = [] } = allUser;
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
