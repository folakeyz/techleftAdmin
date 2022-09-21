import React, { useEffect, useState, Suspense } from "react";
import { Header, Navigation, Card } from "../../components";
import styles from "./styles.module.css";
import {
  AiOutlineTeam,
  AiOutlineBranches,
  AiTwotoneGold,
  AiFillFileText,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranch } from "../../redux/actions/branchActions";
import { fetchDepartment } from "../../redux/actions/departmentActions";
import { fetchClient } from "../../redux/actions/clientActions";
import { fetchEmployee } from "../../redux/actions/employeeActions";
import { getallUsers } from "../../redux/actions/userActions";
import { fetchEvent } from "../../redux/actions/eventActions";

import { CircularProgress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ViewCompany = () => {
  const { id } = useParams();
  //Helpers
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());

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

  const myBranch = branches?.filter((x) => x.company?.id === parseInt(id));
  const myEmployees = employees?.filter((x) => x.company?.id === parseInt(id));
  const myDept = departments?.filter((x) => x.company?.id === parseInt(id));
  const myClient = clients?.filter((x) => x.company === parseInt(id));
  const myEvents = events?.filter((x) => x.company?.id === parseInt(id));
  return (
    <div className="appContainer">
      <Navigation />
      <Suspense fallback={<CircularProgress isIndeterminate color="blue" />}>
        <div className="contentsRight">
          <Header title={myBranch[0]?.company?.name} />
          {/* <Greeting name={user.first_name ? user.first_name : user.email} /> */}
          <div className={styles.dashboardFlex}>
            {user.is_staff === true && (
              <div className={styles.cardFlex}>
                <Card
                  count={myEmployees ? myEmployees.length : 0}
                  title="Employees"
                  Icon={AiOutlineTeam}
                  color="crimson"
                  primary="red"
                  url={`/app/company/employee/${id}`}
                />
                <Card
                  count={myBranch ? myBranch.length : 0}
                  title="Branches"
                  Icon={AiOutlineBranches}
                  color="cyan"
                  primary="blue"
                  url={`/app/company/branch/${id}`}
                />
                <Card
                  count={myDept ? myDept.length : 0}
                  title="Departments"
                  Icon={AiTwotoneGold}
                  color="gold"
                  primary="lightGold"
                  url={`/app/company/department/${id}`}
                />
                <Card
                  count={myClient ? myClient.length : 0}
                  title="Clients"
                  Icon={AiOutlineTeam}
                  color="blue"
                  primary="cyan"
                  url={`/app/company/client/${id}`}
                />
                <Card
                  count={myEvents ? myEvents.length : 0}
                  title="Total Schedules"
                  Icon={AiFillFileText}
                  color="purple"
                  primary="dpurple"
                  url={`/app/company/client/${id}`}
                />
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default ViewCompany;
