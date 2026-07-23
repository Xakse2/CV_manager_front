import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { TFunction } from "i18next";

import type { UserAttribute } from "../../../types/userAttribute";
import {
  useDeleteUserAttributeMutation,
  useUpdateUserAttributeMutation,
} from "../../../store/slice/api/userAttributeApi";
import { AttributeEditor } from "./attributeEditor";

interface AttributeRowProps {
  attribute: UserAttribute;
  t: TFunction;
}

export function AttributeRow({ attribute, t }: AttributeRowProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(attribute.value);

  const [updateAttribute, { isLoading: isUpdating }] =
    useUpdateUserAttributeMutation();

  const [deleteAttribute, { isLoading: isDeleting }] =
    useDeleteUserAttributeMutation();

  const open = Boolean(anchorEl);

  useEffect(() => {
    setValue(attribute.value);
  }, [attribute.value]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    setIsEditing(true);
  };

  const handleCancel = () => {
    setValue(attribute.value);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await updateAttribute({
        attributeId: attribute.attributeId,
        value,
      }).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAttribute(attribute.attributeId).unwrap();
    } catch (error) {
      console.error(error);
    }

    handleMenuClose();
  };

  if (!attribute.Attribute) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          py: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>
              {attribute.Attribute?.name}
            </Typography>

            {!isEditing ? (
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {attribute.value || "-"}
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 1,
                  alignItems: "center",
                }}
              >
                <AttributeEditor
                  attribute={attribute.Attribute}
                  value={value}
                  onChange={setValue}
                  disabled={isUpdating}
                />

                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSave}
                  disabled={isUpdating}
                >
                  {t("common.save")}
                </Button>

                <Button size="small" onClick={handleCancel}>
                  {t("common.cancel")}
                </Button>
              </Box>
            )}
          </Box>

          {!isEditing && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>

              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}>{t("common.edit")}</MenuItem>

                <MenuItem onClick={handleDelete} disabled={isDeleting}>
                  {t("common.delete")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>

      <Divider />
    </>
  );
}
