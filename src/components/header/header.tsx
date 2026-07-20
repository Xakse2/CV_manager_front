import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import type { MenuItems } from "../../types/menuItem";
import { NavigationPagesMenu } from "./navigationPagesMenu";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export function Header() {
  const { t } = useTranslation();

  const userRole =
    useSelector((state: RootState) => state.auth.user?.role) || "CANDIDATE";

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const allItems: MenuItems[] = [
    { title: t("menu.catalog.home"), link: "/" },
    { title: t("menu.catalog.vacancy"), link: "/vacancies" },
    {
      title: t("menu.catalog.attribute"),
      link: "/attributes",
      roles: ["ADMIN", "RECRUITER"],
    },
    { title: t("menu.catalog.login"), link: "/login" },
    { title: t("menu.catalog.registration"), link: "/registration" },
    { title: t("menu.catalog.profile"), link: "/profile" },
  ];

  const allowedItems = allItems.filter((item) => {
    if (!item.roles) {
      return true;
    }
    return item.roles.includes(userRole);
  });

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Logo
        </Typography>
        <Box sx={{ display: { xs: "block", md: "none" }, mr: 1 }}>
          <IconButton
            size="large"
            aria-label="navigation menu"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {allowedItems.map((item, index) => (
              <MenuItem
                key={index}
                component={Link}
                to={item.link}
                onClick={handleCloseNavMenu}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <NavigationPagesMenu items={allowedItems} />

        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
}
