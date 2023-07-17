import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import Widget from "../components/Widget";
import openicon from "../assets/openticket.svg";
import progressicon from "../assets/progressticket.svg";
import closedicon from "../assets/closedticket.svg";
import blockedicon from "../assets/blockedticket.svg";
import { fetchTicket, ticketCreation, ticketUpdation } from "../api/tickets";
import { ExportToCsv } from "export-to-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Customer = () => {
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [tableData, setTableData] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  
  useEffect(() => {
    fetchTickets();
  }, []);

  const navigate = useNavigate();

  function handleChangeTitle({ target }) {
    setTicketTitle(target.value);
  }

  function handleChangeDescription({ target }) {
    setTicketDescription(target.value);
  }

  const clickCancel = () => {
    setModal(false);
    setTicketTitle("");
    setTicketDescription("");
  }

  const logoutfn = () => {
    localStorage.clear();
    navigate("/");
  };


  const fetchTickets = () => {
    fetchTicket()
      .then(function (response) {
        setTableData(response.data);
        updateTicketCount(response.data);
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
  const ticketeditstatus = ["OPEN", "CLOSED"];

  const totalper =
    parseInt(ticketStatusCount.open) +
    parseInt(ticketStatusCount.progress) +
    parseInt(ticketStatusCount.closed) +
    parseInt(ticketStatusCount.blocked);

  const percentages = [
    parseInt((parseInt(ticketStatusCount.open) * 100) / totalper),
    parseInt((parseInt(ticketStatusCount.progress) * 100) / totalper),
    parseInt((parseInt(ticketStatusCount.closed) * 100) / totalper),
    parseInt((parseInt(ticketStatusCount.blocked) * 100) / totalper),
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },

      {
        accessorKey: "title",
        header: "TITLE",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "description",
        header: "DESCRIPTION",
      },
      {
        accessorKey: "ticketPriority",
        header: "PRIORITY",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "status",
        header: "STATUS",
        filterVariant: "multi-select",
        filterSelectOptions: ticketstatus,
        editVariant: "select",
        editSelectOptions: ticketeditstatus,
      },
    ],
    []
  );

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
        console.log(error.response.data.message);
      });
    exitEditingMode();
  };

  const createTicket = () => {
    setModal(false);
    const data = {
      title: ticketTitle,
      description: ticketDescription,
    };

    ticketCreation(data)
    .then(() => fetchTickets())
      .then(setTicketTitle(""), setTicketDescription(""))
      .catch(function (error) {
        console.log(error);
      });
  };

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportCsv = () => {
    csvExporter.generateCsv(tableData);
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    const columnTitles = columns.map((columnDef) => columnDef.header);
    const pdfData = tableData.map((rowData) =>
      columns.map((columnDef) => rowData[columnDef.accessorKey])
    );
    doc.autoTable({
      head: [columnTitles],
      body: pdfData,
    });
    doc.save("TableData.pdf");
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

        <div className="flex justify-around mb-10 flex-wrap">
          <Widget
            colortop="bg-blue-600"
            colorbottom="bg-blue-500"
            svg={openicon}
            text="Open"
            percentage={percentages[0]}
            barcolor="#1e40af"
            value={ticketStatusCount.open}
          />
          <Widget
            colortop="bg-yellow-600"
            colorbottom="bg-yellow-500"
            svg={progressicon}
            text="Progress"
            percentage={percentages[1]}
            barcolor="#a16207"
            value={ticketStatusCount.progress}
          />
          <Widget
            colortop="bg-green-600"
            colorbottom="bg-green-500"
            svg={closedicon}
            text="Closed"
            percentage={percentages[2]}
            barcolor="#14532d"
            value={ticketStatusCount.closed}
          />
          <Widget
            colortop="bg-neutral-600"
            colorbottom="bg-neutral-500"
            svg={blockedicon}
            text="Blocked"
            percentage={percentages[3]}
            barcolor="#171717"
            value={ticketStatusCount.blocked}
          />
        </div>
        <div className="mb-10">
          <MaterialReactTable
            columns={columns}
            data={tableData}
            editingMode="modal"
            enableEditing
            onEditingRowSave={handleSaveRow}
            renderTopToolbarCustomActions={() => (
              <div className="flex justify-between items-center bg-fuchsia-500/40 rounded w-full">
                <h2 className="text-3xl font-semibold mx-20">Your Tickets</h2>
                <p className="text-xl font-semibold text-red-700">{message}</p>
                <div className="flex gap-4 p-2 flex-wrap">
                  <button
                    className="bg-fuchsia-600 transition hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleExportCsv}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleExportPdf}
                  >
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          />
        </div>
        <div className="h-auto w-auto flex items-center flex-col justify-center mb-20 ">
          {modal === false && (
            <button
              onClick={() => setModal(true)}
              className=" bg-fuchsia-600 peer hover:bg-fuchsia-800 transition-all hover:rounded-lg rounded-xl font-semibold text-2xl  text-white h-14 w-1/2 mb-20"
            >
              Raise New Ticket
            </button>
          )}
          {modal && (
            <div className="h-auto w-3/4 flex items-center flex-col justify-center mb-10 ">
              <input
                type="text"
                className="my-2 h-14 rounded-lg border-transparent border border-gray-300 w-96 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Ticket Title"
                value={ticketTitle}
                onChange={(e) => handleChangeTitle(e)}
              />
              <textarea
                className="flex-1 w-1/2 px-4 py-2 text-lg text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="comment"
                placeholder="TIcket Description"
                rows="3"
                cols="40"
                value={ticketDescription}
                onChange={(e) => handleChangeDescription(e)}
              ></textarea>
              <div className="flex justify-start w-96">
                <button
                  onClick={clickCancel}
                  className=" bg-gray-500 peer hover:bg-gray-700 transition-all rounded-lg font-semibold text-lg  text-white h-12 w-28 m-2"
                >
                  Cancel
                </button>
                <button
                  onClick={createTicket}
                  className=" bg-fuchsia-700 peer hover:bg-fuchsia-800 transition-all hover:rounded rounded-lg font-semibold text-lg  text-white h-12 w-40 m-2"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Customer;
