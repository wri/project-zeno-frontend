import T from "prop-types";
import { Box, Table, Text } from "@chakra-ui/react";

export default function TableWidget({ title, data, description }) {
  // Helper function to format numeric values
  const formatValue = (value) => {
    return typeof value === "number"
      ? new Intl.NumberFormat("en-US").format(value)
      : value;
  };
  return (
    <Box p="6">
      <Table.Root variant="line">
        <Table.Header>
          <Table.Row>
            {data && data[0] &&
              Object.keys(data[0]).map((key) => (
                <Table.ColumnHeader key={key}>
                  <b>{key}</b>
                </Table.ColumnHeader>
              ))
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {Object.keys(row).map((key) => (
                <Table.Cell key={key}>{formatValue(row[key])}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box mt="10">
        <Text>{description}</Text>
      </Box>
    </Box>
  );
}

TableWidget.propTypes = {
  data: T.arrayOf(T.object).isRequired,
  title: T.string,
  description: T.string,
};
