import { Box } from "@mui/material";
import { LanguageSwitcher } from "./components/LanguageSwitcher/LanguageSwitcher";
import { AttributesPage } from "./pages/attribute/AttributesPage";

function App() {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LanguageSwitcher />
      </Box>

      <AttributesPage />
    </Box>
  );
}

export default App;
