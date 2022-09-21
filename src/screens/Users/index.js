import React, { useEffect } from "react";
import { Header, MenuBar, Navigation } from "../../components";
//import { useNavigate } from "react-router-dom";
// import { FaCogs, FaTrash } from "react-icons/fa";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { getallUsers, removeUser } from "../../redux/actions/userActions";
import swal from "sweetalert";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";
import { FaTrash } from "react-icons/fa";

const Users = () => {
  //const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "Fullname", field: "full_name" },
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
  const nUser = users.filter(
    (x) =>
      x.is_superuser === false && x.is_trial === false && x.is_staff === false
  );

  // Menubar Items
  const menu = [
    { name: "Company Admin", url: "/app/users/company" },
    { name: "All Employees", url: "/app/users", active: true },
  ];

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure you want to delete this user?",
      text: "All accounts associated with this user would be deleted",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "You are sure you want to delete",
          text: "All accounts associated with this user would be deleted",
          icon: "warning",
          dangerMode: true,
          buttons: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(removeUser(id));
          }
        });
      }
    });
  };

  const deleteUser = useSelector((state) => state.deleteUser);
  const { loading, success, error } = deleteUser;

  if (success) {
    toast({
      title: "Notification",
      description: "User Deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(getallUsers());
    dispatch({ type: DELETE_USER_RESET });
  }
  if (error) {
    toast({
      title: "Notification",
      description: error,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: DELETE_USER_RESET });
  }
  console.log(nUser);

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Users" />
        <div>
          <MenuBar menu={menu} />
          <MaterialTable
            title=""
            columns={columns}
            data={nUser}
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
              //   {
              //     icon: "launch",
              //     iconProps: { style: { fontSize: "20px", color: "gold" } },
              //     tooltip: "Manage",
              //     onClick: (event, rowData) => {
              //       navigate(`/app/companies/${rowData.id}`);
              //     },
              //     title: "Manage",
              //     color: "color2",
              //     Icon: FaCogs,
              //   },
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
        </div>
      </div>
    </div>
  );
};

export default Users;
