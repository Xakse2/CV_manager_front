import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";
import type { MenuItems } from "../../types/menuItem";

interface NavigationPagesMenuProps {
  items: MenuItems[];
}

export function NavigationPagesMenu({ items }: NavigationPagesMenuProps) {
  return (
    <>
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 1,
        }}
      >
        {items.map((item, index) => (
          <Button
            key={index}
            component={Link}
            to={item.link}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            {item.title}
          </Button>
        ))}
      </Box>
    </>
  );
}
