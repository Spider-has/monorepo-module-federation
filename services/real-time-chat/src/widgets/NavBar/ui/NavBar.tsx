import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "@/app/firebase/Context";
import { accessTokenKey } from "@/features/GoogleAuth/storage/tokenStorage";

export function NavBar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <Grid
      sx={{
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {user ? (
              <Button
                onClick={() => {
                  void auth.signOut();
                  localStorage.removeItem(accessTokenKey);
                  void navigate("/real-time-chat");
                }}
                color="inherit"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  void navigate("/real-time-chat/auth");
                }}
                color="inherit"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </Grid>
  );
}
