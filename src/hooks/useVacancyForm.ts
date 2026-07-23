import { useEffect, useState, useCallback } from "react";
import type {
  SelectedAttribute,
  SelectedRequirement,
} from "../types/attribute";
import type { VacancyResponse } from "../types/vacancy";

interface UseVacancyFormProps {
  initialData?: VacancyResponse;
}

const mapAttributes = (data?: VacancyResponse): SelectedAttribute[] =>
  data?.PositionAttribute.map((item) => ({
    attributeId: item.attributeId,
    required: item.required,
  })) ?? [];

const mapRequirements = (data?: VacancyResponse): SelectedRequirement[] =>
  data?.PositionAccessRule.map((item) => ({
    attributeId: item.attributeId,
    operator: item.operator,
    value: item.value,
  })) ?? [];

export function useVacancyForm({ initialData }: UseVacancyFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [company, setCompany] = useState(initialData?.company ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [salaryFrom, setSalaryFrom] = useState(
    initialData?.salaryFrom?.toString() ?? ""
  );
  const [salaryTo, setSalaryTo] = useState(
    initialData?.salaryTo?.toString() ?? ""
  );

  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedAttribute[]
  >(() => mapAttributes(initialData));

  const [requirements, setRequirements] = useState<SelectedRequirement[]>(() =>
    mapRequirements(initialData)
  );

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title);
    setCompany(initialData.company);
    setDescription(initialData.description);
    setSalaryFrom(initialData.salaryFrom?.toString() ?? "");
    setSalaryTo(initialData.salaryTo?.toString() ?? "");
    setSelectedAttributes(mapAttributes(initialData));
    setRequirements(mapRequirements(initialData));
  }, [initialData?.id]);

  const handleAddAttribute = useCallback(() => {
    setSelectedAttributes((prev) => [
      ...prev,
      { attributeId: "", required: false },
    ]);
  }, []);

  const handleAttributeChange = useCallback(
    <K extends keyof SelectedAttribute>(
      index: number,
      key: K,
      value: SelectedAttribute[K]
    ) => {
      setSelectedAttributes((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          [key]: value,
        };
        return updated;
      });
    },
    []
  );

  const handleRemoveAttribute = useCallback((index: number) => {
    setSelectedAttributes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddRequirement = useCallback(() => {
    setRequirements((prev) => [
      ...prev,
      { attributeId: "", operator: "=", value: "" },
    ]);
  }, []);

  const handleRequirementChange = useCallback(
    <K extends keyof SelectedRequirement>(
      index: number,
      key: K,
      value: SelectedRequirement[K]
    ) => {
      setRequirements((prev) => {
        const updated = [...prev];

        updated[index] = {
          ...updated[index],
          [key]: value,
        };

        if (key === "attributeId") {
          updated[index].operator = "=";
          updated[index].value = "";
        }

        return updated;
      });
    },
    []
  );

  const handleRemoveRequirement = useCallback((index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return {
    title,
    setTitle,
    company,
    setCompany,
    description,
    setDescription,
    salaryFrom,
    setSalaryFrom,
    salaryTo,
    setSalaryTo,

    selectedAttributes,
    requirements,

    handleAddAttribute,
    handleAttributeChange,
    handleRemoveAttribute,

    handleAddRequirement,
    handleRequirementChange,
    handleRemoveRequirement,
  };
}
