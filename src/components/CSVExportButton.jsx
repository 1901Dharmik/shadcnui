import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const CSVExportButton = ({ data, filename = "export.csv" }) => {
  const convertToCSV = (data) => {
    if (!data || !data.length) return '';
    
    // Get headers from the first object
    const headers = Object.keys(data[0]);
    
    // Create CSV header row
    const headerRow = headers.join(',');
    
    // Create CSV data rows
    const rows = data.map(item => 
      headers.map(header => {
        let cell = item[header];
        
        // Handle special cases
        if (typeof cell === 'undefined' || cell === null) {
          return '';
        }
        
        // Convert numbers and booleans to strings
        if (typeof cell === 'number' || typeof cell === 'boolean') {
          return cell.toString();
        }
        
        // Escape quotes and wrap in quotes if contains comma or newline
        cell = cell.toString().replace(/"/g, '""');
        if (cell.includes(',') || cell.includes('\n') || cell.includes('"')) {
          cell = `"${cell}"`;
        }
        
        return cell;
      }).join(',')
    );
    
    // Combine header and rows
    return [headerRow, ...rows].join('\n');
  };

  const downloadCSV = () => {
    // Convert data to CSV string
    const csvContent = convertToCSV(data);
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Handle IE11
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
      return;
    }
    
    // Create download link
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    
    // Append to document, trigger download, and cleanup
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={downloadCSV}
      variant="outline"
      className="ml-2"
    >
      {/* <Download className="h-4 w-4 mr-2" /> */}
      <span class="icon-[vscode-icons--file-type-excel] text-2xl mr-2"></span>
      {/* <span class="icon-[vscode-icons--file-type-pdf2]"></span> */}
      Export CSV
    </Button>
  );
};

export default CSVExportButton;