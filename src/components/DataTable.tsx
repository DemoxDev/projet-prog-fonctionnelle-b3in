import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

interface DataTableProps {
    title: string;
    data: any[];
    rowVariants: any;
}
  
export const DataTable: React.FC<DataTableProps> = ({title, data, rowVariants  }) => (
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              {Object.keys(data[0] || {}).map(key => (
                <Th key={key}>{key}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <AnimatePresence>
              {data.map((item, index) => (
                <motion.tr key={index} variants={rowVariants} initial="hidden" animate="visible" exit="hidden">
                  {Object.values(item).map((value, index) => (
                    <Td key={index}>{(value as any).toString()}</Td> // Display as string
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </Tbody>
        </Table>
      </TableContainer>
);