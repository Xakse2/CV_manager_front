import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

import { useDeleteAttributeMutation } from "../../../store/slice/api/attributeApi";
import type { AttributeTableProps } from "../../../types/attribute";

export function AttributeTable({ attributes }: AttributeTableProps) {
  const { t } = useTranslation();
  const [deleteAttribute] = useDeleteAttributeMutation();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => deleteAttribute(id).unwrap()));
      setSelectedIds([]);
    } catch (err) {
      console.error("Bulk delete error:", err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {selectedIds.length > 0 && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleBulkDelete}
            size="small"
          >
            {t("attributes.table.delete_selected")} ({selectedIds.length})
          </Button>
        </Box>
      )}

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
            {attributes.map((attr) => {
              const isChecked = selectedIds.includes(attr.id);

              return (
                <TableRow
                  key={attr.id}
                  hover={!attr.isSystem}
                  selected={isChecked}
                  onClick={() => {
                    if (!attr.isSystem) {
                      onToggleSelect(attr.id);
                    }
                  }}
                  sx={{
                    cursor: attr.isSystem ? "default" : "pointer",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {attr.name}
                      {attr.isSystem && (
                        <Chip
                          label="System"
                          size="small"
                          color="primary"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                  </TableCell>
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
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      {attr.options?.map((item) => (
                        <Chip label={item} size="small" />
                      ))}
                    </Box>
                  </TableCell>

                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    {!attr.isSystem ? (
                      <Checkbox
                        color="error"
                        checked={isChecked}
                        disabled={attr.isSystem}
                        onChange={() => onToggleSelect(attr.id)}
                      />
                    ) : (
                      <Box sx={{ width: 38, height: 38 }} />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
