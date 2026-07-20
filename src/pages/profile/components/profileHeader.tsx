import { Avatar, Box, Typography } from "@mui/material";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  role: string;
}

export function ProfileHeader({
  firstName,
  lastName,
  role,
}: ProfileHeaderProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

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
          width: 100,
          height: 100,
          fontSize: "2.5rem",
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

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {role}
      </Typography>
    </Box>
  );
}
