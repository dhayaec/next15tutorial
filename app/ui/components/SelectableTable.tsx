"use client";

import React, { useState } from "react";

interface Row {
  id: number;
  name: string;
}

const rows: Row[] = [
  { id: 1, name: "Row 1" },
  { id: 2, name: "Row 2" },
  { id: 3, name: "Row 3" },
  { id: 4, name: "Row 4" },
  { id: 5, name: "Row 5" },
];

const TableWithSelection = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null
  );

  // Function to handle individual row selection
  const handleRowSelect = (
    id: number,
    index: number,
    event: React.MouseEvent
  ) => {
    if (event.shiftKey && lastSelectedIndex !== null) {
      // If shift is pressed, select range
      const newSelectedRows = [...selectedRows];
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      for (let i = start; i <= end; i++) {
        if (!newSelectedRows.includes(rows[i].id)) {
          newSelectedRows.push(rows[i].id);
        }
      }
      setSelectedRows(newSelectedRows);
    } else {
      // Toggle row selection
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
      setLastSelectedIndex(index); // Update last selected index
    }
  };

  // Handle select all rows
  const handleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      // If all rows are selected, deselect all
      setSelectedRows([]);
    } else {
      // Select all rows
      setSelectedRows(rows.map((row) => row.id));
    }
  };

  return (
    <div>
      <button onClick={handleSelectAll}>
        {selectedRows.length === rows.length ? "Deselect All" : "Select All"}
      </button>

      <table border={1}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onClick={(e) => handleRowSelect(row.id, index, e)}
                />
              </td>
              <td>{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithSelection;
