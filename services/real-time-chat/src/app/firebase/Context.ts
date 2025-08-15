import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { createContext } from "react";

export const Context = createContext<{
  auth: Auth;
  firestore: Firestore;
}>(null);
