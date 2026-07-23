import { Avatar, Box, Typography } from "@mui/material";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  role: string;
  email?: string;
}

export function ProfileHeader({
  firstName = "",
  lastName = "",
  role,
  email,
}: ProfileHeaderProps) {
  const firstInitial = firstName.trim().charAt(0);
  const lastInitial = lastName.trim().charAt(0);
  const initials = `${firstInitial}${lastInitial}`.toUpperCase() || "?";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Avatar
        sx={{
          width: { xs: 80, md: 110 },
          height: { xs: 80, md: 110 },
          fontSize: { xs: "2rem", md: "2.5rem" },
          fontWeight: "bold",
          bgcolor: "primary.main",
          mb: 2,
        }}
      >
        {initials}
      </Avatar>

      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {firstName} {lastName}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {role}
      </Typography>

      {email && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {email}
        </Typography>
      )}
    </Box>
  );
}
