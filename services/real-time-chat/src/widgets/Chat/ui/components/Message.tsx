import { Avatar, Box, Card, Typography } from "@mui/material";

type ChatMessageProps = {
  createdAt: Date;
  // eslint-disable-next-line react/no-unused-prop-types
  uid: string;
  isCurrUserOwner: boolean;
  photoUrl: string;
  text: string;
  displayName: string;
};

export function ChatMessage(props: ChatMessageProps) {
  const { createdAt, photoUrl, text, displayName, isCurrUserOwner } = props;
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        alignSelf: isCurrUserOwner ? "flex-end" : "flex-start",
        minHeight: "auto",
        maxWidth: "40%",
      }}
    >
      <Box
        display="flex"
        gap="8px"
        flexDirection={!isCurrUserOwner ? "row" : "row-reverse"}
        alignItems="center"
      >
        <Avatar src={photoUrl} />
        <Typography variant="h6">{displayName}</Typography>
        <Typography variant="body2">
          {createdAt.toLocaleString("ru", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
      <Typography variant="body1">{text}</Typography>
    </Card>
  );
}
