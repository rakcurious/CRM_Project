import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTicket, ticketUpdation } from "../api/tickets";
import WidgetsAll from "./WidgetsAll";
import Table from "./Table";

const Engineer = () => { 
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const navigate = useNavigate();

  const logoutfn = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchTickets();
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

  return (
    <>
      <div className="flex flex-col px-10 bg-fuchsia-200    ">
        <div className="mb-2 flex justify-start gap-20 lg:gap-96 flex-row-reverse w-auto ">
          <button
            onClick={logoutfn}
            className="mt-10 bg-fuchsia-600 hover:bg-fuchsia-800 transition-all hover:rounded-lg rounded-xl font-semibold text-lg  text-white h-12 w-32"
          >
            Log out
          </button>
          <div>
            <p className="text-4xl text-fuchsia-900 font-semibold text-center mt-8">
              Welcome, {localStorage.getItem("name")}
            </p>
            <p className="text-xl font-medium  text-center mt-2 mb-8">
              Take a quick look at your stats
            </p>
          </div>
        </div>

        <WidgetsAll ticketStatusCount={ticketStatusCount} data={dataLoaded} />

        <div className="mb-20">
          <Table
            tableType="engineer"
            tableData={tableData}
            handleSaveRow={handleSaveRow}
            heading="Your Tickets"
            message={message}
            ticketstatus={ticketstatus}
            ticketeditstatus={ticketeditstatus}
          />
        </div>
      </div>
    </>
  );
};

export default Engineer;
