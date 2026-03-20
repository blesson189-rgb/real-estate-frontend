import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function EnquiriesPage() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  // Always store clean array of IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const token = localStorage.getItem("adminToken");
  const API = process.env.REACT_APP_BACKEND_URL!;


  const loadEnquiries = async () => {
    const res = await axios.get(`${API}/api/admin/enquiries`, {
      params: { page: page + 1, limit: 20 },
      headers: { Authorization: `Bearer ${token}` },
    });

    setRows(res.data);
    setRowCount(res.data.length);
  };

  useEffect(() => {
    loadEnquiries();
  }, [page]);

  const deleteSingle = async (id: string) => {
    await axios.delete(`${API}/api/admin/enquiries/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadEnquiries();
  };

  const deleteMultiple = async () => {
    if (selectedIds.length === 0) return;

    await axios.post(
      `${API}/api/admin/enquiries/delete-multiple`,
      { ids: selectedIds },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSelectedIds([]);
    loadEnquiries();
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "enquiries.xlsx");
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "message", headerName: "Message", flex: 2 },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (params) =>
        new Date(params.row.createdAt).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteSingle(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // ⭐ Normalize ANY selection shape into an array of IDs
  const normalizeSelection = (sel: any): string[] => {
    console.log("RAW SELECTION:", sel);

    if (!sel) return [];

    // Case 1: simple array
    if (Array.isArray(sel)) return sel.map(String);

    // Case 2: include mode with Set
    if (sel.type === "include" && sel.ids instanceof Set) {
      return Array.from(sel.ids).map(String);
    }

    // Case 3: include mode with object
    if (sel.type === "include" && typeof sel.ids === "object") {
      return Object.keys(sel.ids);
    }

    // Case 4: exclude mode
    if (sel.type === "exclude") {
      const excluded = new Set(
        sel.ids instanceof Set
          ? Array.from(sel.ids).map(String)
          : Object.keys(sel.ids)
      );

      return rows
        .filter((r) => !excluded.has(r._id))
        .map((r) => r._id);
    }

    return [];
  };

  return (
    <Box p={3}>
      <h2>Customer Enquiries</h2>

      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" color="success" onClick={exportExcel}>
          Export Excel
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={selectedIds.length === 0}
          onClick={deleteMultiple}
        >
          Delete Selected ({selectedIds.length})
        </Button>
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection

          // ⭐ UNCONTROLLED selection — the correct approach for your MUI version
          onRowSelectionModelChange={(newSelection) => {
            setSelectedIds(normalizeSelection(newSelection));
          }}

          pagination
          paginationMode="server"
          rowCount={rowCount}
          pageSizeOptions={[20]}
          paginationModel={{ page, pageSize: 20 }}
          onPaginationModelChange={(model) => setPage(model.page)}
        />
      </div>
    </Box>
  );
}
