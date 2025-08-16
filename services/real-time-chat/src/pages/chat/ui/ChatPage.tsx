import { Container } from "@mui/material";
import { ChatWindowArea } from "@/widgets";

export default function ChatPage() {
  return (
    <Container sx={{ maxHeight: "100%", height: "100%", overflow: "hidden" }}>
      <ChatWindowArea />
    </Container>
  );
}
