import { useMemo, useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { TFunction } from "i18next";

import type { Attribute } from "../../../types/attribute";
import type { UserAttribute } from "../../../types/userAttribute";

import { useCreateUserAttributeMutation } from "../../../store/slice/api/userAttributeApi";
import { AttributeEditor } from "./attributeEditor";

interface AddUserAttributeDialogProps {
  open: boolean;
  onClose: () => void;
  attributes: Attribute[];
  userAttributes: UserAttribute[];
  t: TFunction;
}

export function AddUserAttributeDialog({
  open,
  onClose,
  attributes,
  userAttributes,
  t,
}: AddUserAttributeDialogProps) {
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null
  );

  const [value, setValue] = useState("");

  const [createAttribute, { isLoading }] = useCreateUserAttributeMutation();

  const availableAttributes = useMemo(
    () =>
      attributes.filter(
        (attribute) =>
          !userAttributes.some(
            (userAttribute) => userAttribute.attributeId === attribute.id
          )
      ),
    [attributes, userAttributes]
  );

  const handleClose = () => {
    setSelectedAttribute(null);
    setValue("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!selectedAttribute) {
      return;
    }

    try {
      await createAttribute({
        attributeId: selectedAttribute.id,
        value,
      }).unwrap();

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("profile.attributes.add")}</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
        }}
      >
        <Autocomplete
          options={availableAttributes}
          value={selectedAttribute}
          disabled={isLoading}
          onChange={(_, value) => {
            setSelectedAttribute(value);
            setValue("");
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label={t("profile.attributes.attribute")} />
          )}
        />

        {selectedAttribute && (
          <AttributeEditor
            attribute={selectedAttribute}
            value={value}
            disabled={isLoading}
            onChange={setValue}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          {t("profile.buttons.cancel")}
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedAttribute || isLoading}
        >
          {t("profile.attributes.add")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
