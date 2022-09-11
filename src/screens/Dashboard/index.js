import React, { useEffect } from "react";
import { AdminChart, Card, Header, List, Navigation } from "../../components";
import { AiOutlineTeam } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranch } from "../../redux/actions/branchActions";
import { fetchDepartment } from "../../redux/actions/departmentActions";
import { fetchClient } from "../../redux/actions/clientActions";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { getallUsers } from "../../redux/actions/userActions";
import { fetchEvent } from "../../redux/actions/eventActions";
import {
  FaExclamationTriangle,
  FaRegBuilding,
  FaRegFileArchive,
  FaShapes,
  FaUserFriends,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";

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

  const adminUser = users.filter((x) => x.is_superuser === true);
  const nUser = users.filter(
    (x) => x.is_superuser === false && x.is_trial === false
  );
  const trial = users.filter((x) => x.is_trial === true);
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" />
        <div className="dashboardFlex">
          <div className="screenOne">
            <div className="cardFlex">
              <Card
                title="Total Admin"
                count={adminUser?.length}
                url="/"
                Icon={FaUserShield}
                color="gold"
                primary="lightGold"
              />
              <Card
                title="Total Users"
                count={nUser?.length}
                url="/"
                Icon={AiOutlineTeam}
                color="blue"
                primary="cyan"
              />
              <Card
                title="Trial Accounts"
                count={trial?.length}
                url="/"
                Icon={FaExclamationTriangle}
                color="purple"
                primary="dpurple"
              />
              <Card
                title="Total Employees"
                count={employees?.length}
                url="/"
                Icon={FaUsers}
                color="crimson"
                primary="red"
              />
              <Card
                title="Total Departments"
                count={departments?.length}
                url="/"
                Icon={FaRegBuilding}
                color="purple"
                primary="dpurple"
              />
              <Card
                title="Total Branch"
                count={branches?.length}
                url="/"
                Icon={FaShapes}
                color="crimson"
                primary="red"
              />
              <Card
                title="Total Clients"
                count={clients?.length}
                url="/"
                Icon={FaUserFriends}
                color="gold"
                primary="lightGold"
              />
              <Card
                title="Total Events"
                count={events?.length}
                url="/"
                Icon={FaRegFileArchive}
                color="blue"
                primary="cyan"
              />
            </div>
          </div>
          <div className="screenTwo">
            <div className="content">
              <div className="contentTitle">
                <h3>Recent Activity</h3>
              </div>
              <List name="......." url="/app/dashboard" />
              <List name="......." url="/app/dashboard" />
              <List name="......." url="/app/dashboard" />
            </div>
          </div>
        </div>
        <div className="reports">
          <div className="charts">
            <AdminChart users={users} />
          </div>
          <div className="charts">
            <AdminChart users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
