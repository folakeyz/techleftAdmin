import React, { useEffect } from "react";
import { Header, Navigation } from "../../components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaCogs, FaTrash } from "react-icons/fa";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import { fetchBranch } from "../../redux/actions/branchActions";
import { fetchDepartment } from "../../redux/actions/departmentActions";

const CompanyDepartment = () => {
  const { id } = useParams();
  //const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "Name", field: "name" },
    { title: "Branch", field: "branch.name" },
    { title: "Email", field: "email" },
  ];

  // Helpers
  const dispatch = useDispatch();
  //const toast = useToast();

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);
  const getDepartment = useSelector((state) => state.getDepartment);
  const { loading, departments = [] } = getDepartment;
  const myDept = departments?.filter((x) => x.company?.id === parseInt(id));

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title={`${myDept[0]?.company.name} Departments`} />
        <div>
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="blue" />
            </Center>
          ) : (
            <MaterialTable
              title=""
              columns={columns}
              data={myDept}
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

export default CompanyDepartment;
