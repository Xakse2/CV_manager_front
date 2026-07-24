import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface CreateCVDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCVDialog({ open, onClose }: CreateCVDialogProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [positionId, setPositionId] = useState<string>("");

  const { data: positions = [], isLoading: isPositionsLoading } =
    useGetPositionsQuery();
  const [createCV, { isLoading: isCreating }] = useCreateCvMutation();

  const handleResetAndClose = () => {
    setPositionId("");
    onClose();
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!positionId) return;

    try {
      const newCv = await createCV({ positionId }).unwrap();
      handleResetAndClose();
      navigate(`/cv/${newCv.id}`);
    } catch (error) {
      console.error("Failed to create CV:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleResetAndClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t("cv.create_dialog.title")}</DialogTitle>

        <DialogContent>
          {isPositionsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <FormControl fullWidth margin="dense" required>
              <InputLabel id="position-select-label">
                {t("cv.create_dialog.position_label")}
              </InputLabel>
              <Select
                labelId="position-select-label"
                value={positionId}
                label={t("cv.create_dialog.position_label")}
                onChange={(e) => setPositionId(e.target.value)}
                disabled={isCreating}
              >
                {positions.map((pos: { id: string; name: string }) => (
                  <MenuItem key={pos.id} value={pos.id}>
                    {pos.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleResetAndClose}
            disabled={isCreating}
            color="inherit"
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!positionId || isCreating}
            startIcon={
              isCreating ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {t("common.create")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
function useGetPositionsQuery(): {
  data?: never[] | undefined;
  isLoading: any;
} {
  throw new Error("Function not implemented.");
}

function useCreateCvMutation(): [any, { isLoading: any }] {
  throw new Error("Function not implemented.");
}
