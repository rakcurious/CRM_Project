import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { ExportToCsv } from "export-to-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Table = ({
  tableType,
  tableData,
  handleSaveRow,
  heading,
  message,
  ticketeditstatus,
  ticketstatus,
}) => {
  let columns;

  const customerColumns = useMemo(
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

  const engineerColumns = useMemo(
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
        accessorKey: "reporter",
        header: "REPORTER",
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

  const adminTicketTolumns = useMemo(
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
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "reporter",
        header: "REPORTER",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "assignee",
        header: "ASSIGNEE",
      },
      {
        accessorKey: "ticketPriority",
        header: "PRIORITY",
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

  const adminUserColumns = useMemo(
    () => [
      {
        accessorKey: "userId",
        header: "ID",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "name",
        header: "NAME",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "userTypes",
        header: "ROLE",
        muiTableBodyCellEditTextFieldProps: {
          InputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorKey: "userStatus",
        header: "STATUS",
        filterVariant: "multi-select",
        filterSelectOptions: ["APPROVED", "PENDING", "REJECTED"],
        editVariant: "select",
        editSelectOptions: ["APPROVED", "PENDING", "REJECTED"],
      },
    ],
    []
  );

  if (tableType === "customer") {
    columns = customerColumns;
  } else if (tableType === "engineer") {
    columns = engineerColumns;
  } else if (tableType === "admin tickets") {
    columns = adminTicketTolumns;
  } else if (tableType === "admin users") {
    columns = adminUserColumns;
  }

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
      Columnsolumns.map((columnDef) => rowData[columnDef.accessorKey])
    );
    doc.autoTable({
      head: [columnTitles],
      body: pdfData,
    });
    doc.save("TableData.pdf");
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableEditing
        onEditingRowSave={handleSaveRow}
        renderTopToolbarCustomActions={() => (
          <div className="flex justify-between items-center bg-fuchsia-500/40 rounded w-full">
            <h2 className="text-3xl font-semibold mx-20">{heading}</h2>
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
    </>
  );
};

export default Table;
