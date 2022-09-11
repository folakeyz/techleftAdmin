import React, { useEffect } from "react";
import { Header, Navigation } from "../../components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaCogs, FaTrash } from "react-icons/fa";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import { getMyCompany } from "../../redux/actions/companyActions";
import { fetchEmployee } from "../../redux/actions/employeeActions";

const CompanyEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "First Name", field: "user.first_name" },
    { title: "Last Name", field: "user.last_name" },
    { title: "Username", field: "user.username" },
    { title: "Employee ID", field: "user.employee_id" },
    { title: "Email", field: "user.email" },
    { title: "Branch", field: "branch.name" },
    { title: "Department", field: "department.name" },
  ];

  // Helpers
  const dispatch = useDispatch();
  //const toast = useToast();

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);
  const getEmployee = useSelector((state) => state.getEmployee);
  const { loading, employees = [] } = getEmployee;

  const myEmployees = employees?.filter((x) => x.company?.id === parseInt(id));

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title={`${myEmployees[0]?.company.name} Employee`} />
        <div>
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="blue" />
            </Center>
          ) : (
            <MaterialTable
              title=""
              columns={columns}
              data={myEmployees}
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
              actions={
                [
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
                  //   {
                  //     icon: "launch",
                  //     iconProps: { style: { fontSize: "15px", color: "gold" } },
                  //     tooltip: "Delete",
                  //     onClick: (event, rowData) => {
                  //       //   deleteHandler(rowData.id);
                  //     },
                  //     title: "Delete",
                  //     color: "color3",
                  //     Icon: FaTrash,
                  //   },
                ]
              }
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

export default CompanyEmployee;
