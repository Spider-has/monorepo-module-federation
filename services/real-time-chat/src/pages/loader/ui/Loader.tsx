import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

export function LoaderPage() {
  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
}
