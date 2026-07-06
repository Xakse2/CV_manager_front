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
import { useTranslation } from "react-i18next";

export function AttributeTable({ attributes }: AttributeTableProps) {
  const { t } = useTranslation();
  const [deleteAttribute] = useDeleteAttributeMutation();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead sx={{ bgcolor: "action.hover" }}>
          <TableRow>
            <TableCell>
              <strong>{t("attributes.table.name")}</strong>
            </TableCell>
            <TableCell>
              <strong>{t("attributes.table.category")}</strong>
            </TableCell>
            <TableCell>
              <strong>{t("attributes.table.type")}</strong>
            </TableCell>
            <TableCell>
              <strong>{t("attributes.table.options")}</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{t("attributes.table.actions")}</strong>
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
