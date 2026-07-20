import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./i18n";
import { useMeQuery } from "./store/slice/api/authApi";

function App() {
  useMeQuery();
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
