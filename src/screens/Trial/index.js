import React, { useEffect, useState } from "react";
import { Header, Navigation, Modal, Input, Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCogs, FaPlusCircle, FaTrash, FaWrench } from "react-icons/fa";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { getMyCompany } from "../../redux/actions/companyActions";
import { getallUsers, RegisterUser } from "../../redux/actions/userActions";
import swal from "sweetalert";
import {
  CREATE_ACCOUNT_RESET,
  UPDATE_ME_RESET,
} from "../../redux/constants/userConstants";

const TrialAccount = () => {
  const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "Name", field: "full_name" },
    { title: "Email", field: "email" },
  ];

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getallUsers());
  }, [dispatch]);
  const allUser = useSelector((state) => state.allUser);
  const { users = [] } = allUser;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;
  const updateUser = useSelector((state) => state.updateUser);
  const { uLoading, success: uSuccess, error: uError } = updateUser;
  const adminUser = users.filter((x) => x.is_trial === true);

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: CREATE_ACCOUNT_RESET });
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
    dispatch({ type: UPDATE_ME_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Admin added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });

    dispatch(getallUsers());
    dispatch({ type: CREATE_ACCOUNT_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Admin updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(getallUsers());
    dispatch({ type: UPDATE_ME_RESET });
  }
  // Login Handler
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const editHandler = (e) => {
    e.preventDefault();
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
        // dispatch(deleteDepartment(id));
      }
    });
  };

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Trial Account" />
        <div>
          {/* <div className="btnContainer right">
            <button className="btn color2" onClick={openHandler}>
              Create Admin
            </button>
          </div> */}
          <MaterialTable
            title=""
            columns={columns}
            data={adminUser}
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
                tooltip: "Activate",
                onClick: (event, rowData) => {},
                title: "Activate Account",
                color: "color2",
                Icon: FaCogs,
              },

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
        </div>
      </div>
    </div>
  );
};

export default TrialAccount;
