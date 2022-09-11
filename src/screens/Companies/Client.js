import React, { useEffect } from "react";
import { Header, Navigation } from "../../components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from "../../redux/actions/clientActions";
import { Center, CircularProgress } from "@chakra-ui/react";

const CompanyClient = () => {
  const { id } = useParams();
  //const navigate = useNavigate();
  //Table data
  const columns = [
    { title: "Name", field: "name" },
    { title: "Country", field: "country" },
    { title: "Postal Code", field: "postal_code" },
    { title: "Address", field: "address" },
  ];

  // Helpers
  const dispatch = useDispatch();
  //const toast = useToast();

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);
  const getClient = useSelector((state) => state.getClient);
  const { loading, clients = [] } = getClient;
  const myClient = clients?.filter((x) => x.company === parseInt(id));

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title={`Client`} />
        <div>
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="blue" />
            </Center>
          ) : (
            <MaterialTable
              title=""
              columns={columns}
              data={myClient}
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

export default CompanyClient;
