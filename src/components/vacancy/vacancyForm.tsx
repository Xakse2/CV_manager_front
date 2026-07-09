import { useState, type SubmitEvent } from "react";
import { TextField, Button, Paper, Typography, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import type {
  SelectedRequirement,
  VacancyFormProps,
} from "../../types/attribute";
import { RequirementsSection } from "./components/requirementsSection";

export function VacancyForm({ availableAttributes }: VacancyFormProps) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [requirements, setRequirements] = useState<SelectedRequirement[]>([]);

  const handleAddRequirement = () => {
    setRequirements([...requirements, { attributeId: "", value: "" }]);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleRequirementChange = (
    index: number,
    key: "attributeId" | "value",
    val: any
  ) => {
    const updated = [...requirements];
    updated[index] = { ...updated[index], [key]: val };

    if (key === "attributeId") {
      updated[index].value = "";
    }
    setRequirements(updated);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const vacancyData = {
      title: title.trim(),
      company: company.trim(),
      description: description.trim(),
      salaryFrom: salaryFrom ? Number(salaryFrom) : null,
      salaryTo: salaryTo ? Number(salaryTo) : null,
      requirements: requirements.filter(
        (requirement) => requirement.attributeId
      ),
    };

    console.log("Submit vacancy data:", vacancyData);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography variant="h6">{t("vacancies.form.main_info")}</Typography>
      <TextField
        label={t("vacancies.form.title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        size="small"
      />

      <TextField
        label={t("vacancies.form.company")}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        fullWidth
        size="small"
      />
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label={t("vacancies.form.salary_from")}
            type="number"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label={t("vacancies.form.salary_to")}
            type="number"
            value={salaryTo}
            onChange={(e) => setSalaryTo(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <TextField
        label={t("vacancies.form.description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
        size="small"
      />

      <RequirementsSection
        requirements={requirements}
        availableAttributes={availableAttributes}
        onAdd={handleAddRequirement}
        onRemove={handleRemoveRequirement}
        onChange={handleRequirementChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ alignSelf: "flex-end" }}
      >
        {t("vacancies.create_button")}
      </Button>
    </Paper>
  );
}
