import { Box, CircularProgress, Grid } from "@mui/material";
import { User } from "firebase/auth";
import { ChatMessage } from "./Message";
import { MessageDTO } from "../Chat";

type ChatMessagesAreaProps = {
  loading: boolean;
  messages: MessageDTO[];
  user: User;
};

export function ChatMessagesArea(props: ChatMessagesAreaProps) {
  const { loading, messages, user } = props;
  return (
    <Box
      sx={{
        border: "1px solid #000",
        overflowY: "auto",
        height: "100%",
        padding: "24px",
      }}
    >
      <Grid sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {!loading &&
          messages.map((el) => {
            if (el.createdAt) {
              return (
                <ChatMessage
                  key={el.createdAt.toDate().toLocaleString()}
                  isCurrUserOwner={user.uid === el.uid}
                  createdAt={el.createdAt.toDate()}
                  uid={el.uid}
                  photoUrl={el.photoUrl}
                  text={el.text}
                  displayName={el.displayName}
                />
              );
            }
            return <CircularProgress key={crypto.randomUUID()} />;
          })}
      </Grid>

      {loading && <CircularProgress />}
    </Box>
  );
}
