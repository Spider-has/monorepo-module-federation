import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "@/features";
import { auth } from "@/app/firebase/init";
import { accessTokenKey } from "@/features/GoogleAuth/storage/tokenStorage";

export default function AuthPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    const setUserToken = async () => {
      localStorage.setItem(accessTokenKey, await user.getIdToken());
      void navigate(".", { replace: true });
    };
    if (user) void setUserToken();
    else {
      localStorage.removeItem(accessTokenKey);
      void navigate(".", { replace: true });
    }
  }, [navigate, user]);
  return (
    <Container sx={{ flexGrow: 1 }}>
      <GoogleAuth />
    </Container>
  );
}
