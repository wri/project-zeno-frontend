import { Button, Box } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { chartDataAtom } from "../atoms";
import { CollecticonDownload2 } from "@devseed-ui/collecticons-react";
import * as d3 from "d3";

export default function ExportPane() {
  const data = useAtomValue(chartDataAtom);

  // Function to convert data to CSV
  const downloadDataAsCSV = () => {
    // Convert the data to CSV
    const csvData = d3.csvFormat(data);

    // Create a Blob object for the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chart-data.csv";

    // Append to the DOM, click, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
  <Box>
    <Button
      onClick={downloadDataAsCSV}
      _disabled={data?.length === 0}
      p={4}
      size="sm"
      colorPalette="blue"
      variant="surface"
      cursor="pointer"
    >
    <CollecticonDownload2 />
    Download CSV Data
    </Button>
  </Box>
  );
}
