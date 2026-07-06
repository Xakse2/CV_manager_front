import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAttributeMutation } from "../../../store/slice/attributeSlice";
import type { AttributeTableProps } from "../../../types/attribute";

export function AttributeTable({ attributes }: AttributeTableProps) {
  const [deleteAttribute] = useDeleteAttributeMutation();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead sx={{ bgcolor: "action.hover" }}>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Category</strong>
            </TableCell>
            <TableCell>
              <strong>Type</strong>
            </TableCell>
            <TableCell>
              <strong>Options</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.map((attr) => (
            <TableRow key={attr.id} hover>
              <TableCell>{attr.name}</TableCell>
              <TableCell>{attr.category}</TableCell>
              <TableCell>
                <Chip
                  label={attr.type}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {attr.options.map((o, i) => (
                    <Chip key={i} label={o} size="small" />
                  ))}
                </Box>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => deleteAttribute(attr.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
