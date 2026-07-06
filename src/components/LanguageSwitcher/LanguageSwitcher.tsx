import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup size="small" variant="outlined" aria-label="Language switcher">
      <Button
        variant={currentLanguage === "ru" ? "contained" : "outlined"}
        onClick={() => changeLanguage("ru")}
      >
        RU
      </Button>
      <Button
        variant={currentLanguage === "en" ? "contained" : "outlined"}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
    </ButtonGroup>
  );
}
