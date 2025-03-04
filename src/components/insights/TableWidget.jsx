

import T from "prop-types";
import { Box, Table, Text } from "@chakra-ui/react";

/**
 * Data is an array of objects
 */
export default function TableWidget({ data, description }) {
  return (
    <Box p="6">
      <Table.Root variant="line">
        <Table.Header>
          <Table.Row>
            {data && data[0] && Object.keys(data[0]).map((key) => <Table.ColumnHeader key={key}><b>{key}</b></Table.ColumnHeader>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row}>
              {Object.keys(row).map((key) => <Table.Cell key={key}>{row[key]}</Table.Cell>)}
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
  data: T.string.isRequired,
  description: T.string,
};



