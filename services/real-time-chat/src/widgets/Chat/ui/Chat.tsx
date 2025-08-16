/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  DocumentData,
  orderBy,
  Query,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { Context } from "@/app/firebase/Context";
import { ChatMessagesArea } from "./components/ChatMessageArea";

export type MessageDTO = {
  uid: string;
  displayName: string;
  photoUrl: string;
  text: string;
  createdAt: Timestamp;
};

export function ChatWindowArea() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [messages, loading] = useCollectionData<MessageDTO>(
    query(collection(firestore, "messages"), orderBy("createdAt")) as Query<
      MessageDTO,
      DocumentData
    >
  );

  console.log(messages);

  const sendMessage = useCallback(async () => {
    try {
      const docRef = await addDoc(collection(firestore, "messages"), {
        uid: user.uid,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        text: message,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setMessage("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [firestore, message, user.displayName, user.photoURL, user.uid]);
  return (
    <Container sx={{ flexGrow: 1, padding: "32px", height: "100%" }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          gap: "40px",
        }}
      >
        <ChatMessagesArea loading={loading} messages={messages} user={user} />
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            gap: "24px",
          }}
        >
          <TextField
            sx={{ maxWidth: "700px", width: "90%" }}
            multiline
            label="Введите сообщение"
            variant="outlined"
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={() => {
              void sendMessage();
            }}
            color="secondary"
            variant="outlined"
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
