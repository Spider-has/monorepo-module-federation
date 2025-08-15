import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCallback, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { accessTokenKey } from "../storage/tokenStorage";
import { Context } from "@/app/firebase/Context";

const googleAuthPovider = new GoogleAuthProvider();

export function GoogleAuth() {
  const { auth } = useContext(Context);

  const login = useCallback(async () => {
    const { user } = await signInWithPopup(auth, googleAuthPovider);
    console.log(user);
    localStorage.setItem(accessTokenKey, await user.getIdToken());
  }, [auth]);

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid sx={{ alignItems: "center", justifyContent: "center" }}>
        <Card
          sx={{
            padding: "32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography variant="h4" component="h1">
            Вход в аккаунт
          </Typography>
          <Box>
            <Button
              onClick={() => {
                void login();
              }}
              variant="contained"
            >
              Войти с помощью Google
            </Button>
          </Box>
        </Card>
      </Grid>
    </Container>
  );
}
