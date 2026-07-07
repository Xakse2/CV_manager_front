import { Box } from "@mui/material";
import { LanguageSwitcher } from "./components/LanguageSwitcher/LanguageSwitcher";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LanguageSwitcher />
      </Box>
      <RouterProvider router={router} />;
    </Box>
  );
}

export default App;
