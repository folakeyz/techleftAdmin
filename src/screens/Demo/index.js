import React, { useEffect } from "react";
import { Header, Navigation } from "../../components";
import { FaCogs, FaTrash } from "react-icons/fa";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import { getallUsers } from "../../redux/actions/userActions";
import swal from "sweetalert";
import {
  CREATE_ACCOUNT_RESET,
  UPDATE_ME_RESET,
} from "../../redux/constants/userConstants";
import {
  deleteAccount,
  fetchTrial,
  patchAccount,
} from "../../redux/actions/trialActions";
import {
  ACTIVATE_ACCT_RESET,
  DELETE_ACCT_RESET,
} from "../../redux/constants/trialConstants";
import { useNavigate } from "react-router-dom";

const DemoAccount = () => {
  const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "Name", field: "user.full_name" },
    { title: "Email", field: "user.email" },
    { title: "Number", field: "number" },
    { title: "Industry", field: "industry" },
    { title: "Location", field: "location" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getallUsers());
    dispatch(fetchTrial());
  }, [dispatch]);
  const allUser = useSelector((state) => state.allUser);
  const { users = [] } = allUser;

  const activate = useSelector((state) => state.activate);
  const { loading, success, error } = activate;
  const deleteTrial = useSelector((state) => state.deleteTrial);
  const { uLoading, success: uSuccess, error: uError } = deleteTrial;

  const getTrialA = useSelector((state) => state.getTrialA);
  const { trial = [] } = getTrialA;

  const trialUser = trial.filter((x) => x.user?.is_active === false);

  //   console.log(adminUser);
  console.log(trial);

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: ACTIVATE_ACCT_RESET });
  }
  if (uError) {
    toast({
      title: "Error",
      description: uError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: DELETE_ACCT_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Success",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });

    dispatch(getallUsers());
    dispatch({ type: ACTIVATE_ACCT_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Success",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(getallUsers());
    dispatch({ type: DELETE_ACCT_RESET });
  }
  // Login Handler
  const deactivateHandler = (id) => {
    let is_trial = true;
    swal({
      title: "Are you sure?",
      text: "Are you want to deactivate this account",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(patchAccount(id, is_trial));
      }
    });
  };

  const activateHandler = (id) => {
    let is_trial = false;
    swal({
      title: "Are you sure?",
      text: "Are you want to activate this account",
      icon: "warning",
      // dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(patchAccount(id, is_trial));
      }
    });
  };

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAccount(id));
      }
    });
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Request for Demo" />
        <div>
          {/* <div className="btnContainer right">
            <button className="btn color2" onClick={openHandler}>
              Create Admin
            </button>
          </div> */}
          {loading || uLoading ? (
            <Center>
              <CircularProgress isIndeterminate color="blue" />
            </Center>
          ) : (
            <MaterialTable
              title=""
              columns={columns}
              data={trialUser}
              options={{
                // filtering: true,
                exportAllData: true,
                exportButton: true,
                actionsCellStyle: {
                  backgroundColor: "none",
                  color: "#FF00dd",
                },
                actionsColumnIndex: -1,

                headerStyle: {
                  backgroundColor: "#dcdcdc",
                  color: "black",
                },
              }}
              style={{
                boxShadow: "none",
                width: "100%",
                background: "none",
                fontSize: "13px",
              }}
              actions={[
                {
                  icon: "launch",
                  iconProps: { style: { fontSize: "20px", color: "gold" } },
                  tooltip: "View",
                  onClick: (event, rowData) => {
                    navigate(`/app/trial/${rowData.id}`);
                  },
                  title: "View",
                  color: "color2",
                  Icon: FaCogs,
                },
                // {
                //   icon: "launch",
                //   iconProps: { style: { fontSize: "20px", color: "gold" } },
                //   tooltip: "deactivate",
                //   onClick: (event, rowData) => {
                //     deactivateHandler(rowData.id);
                //   },
                //   title: "Deactivate Account",
                //   color: "color2",
                //   Icon: FaCogs,
                // },

                {
                  icon: "launch",
                  iconProps: { style: { fontSize: "15px", color: "gold" } },
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    deleteHandler(rowData.id);
                  },
                  title: "Delete Account",
                  color: "color3",
                  Icon: FaTrash,
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    className={`btnTable ${props.action.color}`}
                  >
                    <props.action.Icon />
                    {props.action.title}
                  </button>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoAccount;
