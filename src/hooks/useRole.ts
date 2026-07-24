import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function useRole() {
  const user = useSelector((state: RootState) => state.auth.user);

  return {
    user,
    role: user?.role,
    isCandidate: user?.role === "CANDIDATE",
    isRecruiter: user?.role === "RECRUITER",
    isAdmin: user?.role === "ADMIN",
  };
}
