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

const Adminstrator = () => {
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
  const adminUser = users.filter((x) => x.is_superuser === true);

  const [first_name, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const is_superuser = true;
  const is_staff = true;

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
    setOpen(false);
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
    setOpen(false);
    dispatch(getallUsers());
    dispatch({ type: UPDATE_ME_RESET });
  }
  // Login Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Warning",
        description: "Password does not match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      dispatch(
        RegisterUser(
          username,
          first_name,
          last_name,
          email,
          password,
          is_superuser,
          is_staff
        )
      );
    }
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

  const openHandler = () => {
    setEdit(false);
    setOpen(true);
    setFirstname("");
    setEmail("");
    setLastname("");
  };

  console.log(open);

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Admin" />
        <div>
          <div className="btnContainer right">
            <button className="btn color2" onClick={openHandler}>
              Create Admin
            </button>
          </div>
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
                tooltip: "Edit",
                onClick: (event, rowData) => {
                  setOpen(true);
                  setFirstname(rowData.first_name);
                  setLastname(rowData.last_name);
                  setEmail(rowData.email);
                },
                title: "Edit",
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
                title: "Delete",
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
          <Modal
            isVisible={open}
            title={edit ? "Edit Admin" : "Add Admin"}
            size="lg"
            content={
              <form onSubmit={edit ? editHandler : submitHandler}>
                <div className="test__InputFlex">
                  <Input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required={true}
                    title="Username"
                    form={true}
                  />
                  <Input
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={first_name}
                    required={true}
                    title="First Name"
                    form={true}
                  />
                  <Input
                    type="text"
                    onChange={(e) => setLastname(e.target.value)}
                    value={last_name}
                    required={true}
                    title="Last Name"
                    form={true}
                  />
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required={true}
                    title="Email"
                    form={true}
                  />
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required={true}
                    title="Password"
                    form={true}
                  />
                  <Input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required={true}
                    title="Confirm Password"
                    form={true}
                  />
                  <Button
                    title={edit ? "Edit Admin" : "Add Admin"}
                    type="submit"
                    color="color2"
                    isFullWidth={true}
                    Icon={edit ? FaWrench : FaPlusCircle}
                    loading={uLoading || loading}
                  />
                </div>
              </form>
            }
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Adminstrator;
