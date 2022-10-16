import React, { useEffect } from "react";
import { Header, Navigation, MenuBar } from "../../components";
//import { useNavigate } from "react-router-dom";
import { FaCogs, FaTrash } from "react-icons/fa";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { getallUsers, removeUser } from "../../redux/actions/userActions";
import swal from "sweetalert";
import { getMyCompany } from "../../redux/actions/companyActions";
import { Center, CircularProgress } from "@chakra-ui/react";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";
import { patchAccount } from "../../redux/actions/trialActions";
import { ACTIVATE_ACCT_RESET } from "../../redux/constants/trialConstants";

const CompanyUsers = () => {
  // const navigate = useNavigate();
  //Table data

  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getallUsers());
    dispatch(getMyCompany());
  }, [dispatch]);
  const allUser = useSelector((state) => state.allUser);
  const { users = [] } = allUser;
  const nUser = users.filter(
    (x) =>
      x.is_superuser === false && x.is_trial === false && x.is_staff === true
  );

  const getCompany = useSelector((state) => state.getCompany);
  const { myCompany } = getCompany;

  const deleteUser = useSelector((state) => state.deleteUser);
  const { loading, success, error } = deleteUser;

  const activate = useSelector((state) => state.activate);
  const { loading: aLoading, success: aSuccess, error: aError } = activate;

  // Menubar Items
  const menu = [
    { name: "Company Admin", url: "/app/users/company", active: true },
    { name: "All Employees", url: "/app/users" },
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

  const getUserCompany = (id) => {
    const name = myCompany?.find((x) => x.admin === parseInt(id));
    return name?.name;
  };
  const getCompEmp = (id) => {
    const name = myCompany?.find((x) => x.admin === parseInt(id));
    return name?.employees.length;
  };

  const columns = [
    { title: "Fullname", field: "full_name" },
    { title: "Email", field: "email" },
    {
      title: "Company",
      field: "",
      render: (rowData) => getUserCompany(rowData.id),
    },
    {
      title: "Employees",
      field: "",
      render: (rowData) => getCompEmp(rowData.id),
    },
  ];

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

  if (aSuccess) {
    toast({
      title: "Notification",
      description: "Deactivated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch(getallUsers());
    dispatch({ type: ACTIVATE_ACCT_RESET });
  }
  if (error || aError) {
    toast({
      title: "Notification",
      description: error || aError,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: DELETE_USER_RESET });
    dispatch({ type: ACTIVATE_ACCT_RESET });
  }

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
  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Users" />
        <div>
          <MenuBar menu={menu} />
          {loading || aLoading ? (
            <Center>
              <CircularProgress isIndeterminate color="blue" />
            </Center>
          ) : (
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
                // {
                //   icon: "launch",
                //   iconProps: { style: { fontSize: "20px", color: "gold" } },
                //   tooltip: "Manage",
                //   onClick: (event, rowData) => {
                //     deactivateHandler(rowData.id);
                //   },
                //   title: "Make Trial",
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyUsers;
