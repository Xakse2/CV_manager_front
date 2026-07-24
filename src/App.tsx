import { Box, CircularProgress } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./i18n";
import { useMeQuery } from "./store/slice/api/authApi";

function App() {
  const { isLoading } = useMeQuery();
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
