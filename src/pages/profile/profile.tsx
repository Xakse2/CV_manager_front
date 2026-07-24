import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { AdminProfile } from "./components/profiles/adminProfile";
import { CandidateProfile } from "./components/profiles/candidateProfile";
import { RecruiterProfile } from "./components/profiles/recruiterProfile";

const profileByRole = {
  CANDIDATE: CandidateProfile,
  RECRUITER: RecruiterProfile,
  ADMIN: AdminProfile,
};

export function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return null;
  }

  const ProfileComponent = profileByRole[user.role];

  if (!ProfileComponent) {
    return null;
  }

  return <ProfileComponent />;
}
