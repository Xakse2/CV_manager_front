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

  const user = useSelector((state: RootState) => state.auth.user);

  const role = user?.role;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const allItems: MenuItems[] = [
    {
      title: t("menu.catalog.home"),
      link: "/",
    },

    {
      title: t("menu.catalog.vacancy"),
      link: "/vacancies",
      roles: ["CANDIDATE", "RECRUITER"],
    },

    {
      title: t("menu.catalog.create_vacancy"),
      link: "/vacancies/create",
      roles: ["RECRUITER"],
    },

    {
      title: t("menu.catalog.attribute"),
      link: "/attributes",
      roles: ["ADMIN", "RECRUITER"],
    },

    {
      title: t("menu.catalog.profile"),
      link: "/profile",
      roles: ["CANDIDATE", "RECRUITER", "ADMIN"],
    },

    {
      title: t("menu.catalog.login"),
      link: "/login",
    },

    {
      title: t("menu.catalog.registration"),
      link: "/registration",
    },
  ];

  const allowedItems = allItems.filter((item) => {
    if (!user) {
      return (
        item.link === "/" ||
        item.link === "/login" ||
        item.link === "/registration"
      );
    }

    if (item.link === "/login" || item.link === "/registration") {
      return false;
    }

    if (item.roles) {
      return item.roles.includes(role ?? "");
    }

    return true;
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"

          component={Link}

          to="/"

          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Logo
        </Typography>

        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <IconButton color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElNav}

            open={Boolean(anchorElNav)}

            onClose={handleCloseNavMenu}
          >
            {allowedItems.map((item) => (
              <MenuItem
                key={item.link}

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
