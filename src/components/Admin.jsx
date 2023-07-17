import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTicket, ticketUpdation } from "../api/tickets";
import { getAllUsers, userUpdation } from "../api/user";
import WidgetsAll from "./WidgetsAll";
import Table from "./Table"; 

const Admin = () => {
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const userid = localStorage.getItem("userId");

  const navigate = useNavigate();

  const logoutfn = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then(function (response) {
        setTableData(response.data);
        updateTicketCount(response.data);
        setDataLoaded(true);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  const getUsers = () => {
    getAllUsers("")
      .then(function (response) {
        setUserData(response.data);
        setDataLoaded(true);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  async function updateTicketCount(tickets) {
    const data = {
      open: 0,
      progress: 0,
      closed: 0,
      blocked: 0,
    };

    tickets.forEach((x) => {
      if (x.status === "OPEN") {
        data.open += 1;
      } else if (x.status === "CLOSED") {
        data.closed += 1;
      } else if (x.status === "IN_PROGRESS") {
        data.progress += 1;
      } else if (x.status === "BLOCKED") {
        data.blocked += 1;
      }
    });

    setTicketStatusCount(Object.assign({}, data));
  }

  const ticketstatus = ["OPEN", "PROGRESS", "CLOSED", "BLOCKED"];
  const ticketeditstatus = ["OPEN", "IN_PROGRESS", "CLOSED", "BLOCKED"];

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    setTableData((prevTableData) => {
      const newTableData = [...prevTableData];
      newTableData[row.index] = values;
      updateTicketCount(newTableData);
      return newTableData;
    });

    ticketUpdation(values.id, values)
      .then(() => fetchTickets())
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
    exitEditingMode();
  };

  const handleSaveRowUser = async ({ exitEditingMode, row, values }) => {
    setUserData((prevTableData) => {
      const newTableData = [...prevTableData];
      newTableData[row.index] = values;
      return newTableData;
    });

    userUpdation(userid, values)
      .then(() => getUsers(userid))
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
    exitEditingMode();
  };

  return (
    <>
      <div className="flex flex-col px-10 bg-purple-300">
        <div className="mb-2 flex justify-start gap-20 lg:gap-96 flex-row-reverse w-auto ">
          <button
            onClick={logoutfn}
            className="mt-10 bg-purple-600 hover:bg-purple-800 transition-all hover:rounded-lg rounded-xl font-semibold text-lg  text-white h-12 w-32"
          >
            Log out
          </button>
          <div>
            <p className="text-4xl text-purple-900 font-semibold text-center mt-8">
              Welcome, Rakesh
            </p>
            <p className="text-xl font-medium  text-center mt-2 mb-8">
              Take a quick look at your stats
            </p>
          </div>
        </div>

        <WidgetsAll ticketStatusCount={ticketStatusCount} data={dataLoaded} />

        <div className="mb-20">
          <Table
            tableType="admin tickets"
            tableData={tableData}
            handleSaveRow={handleSaveRow}
            heading="Ticket Details"
            message={message}
            ticketeditstatus={ticketeditstatus}
            ticketstatus={ticketstatus}
          />
        </div>
        <Table
          tableType="admin users"
          tableData={userData}
          handleSaveRow={handleSaveRowUser}
          heading="User Details"
          message={message}
          ticketeditstatus={ticketeditstatus}
          ticketstatus={ticketstatus}
        />
      </div>
    </>
  );
};

export default Admin;
