"use server";
import { signIn } from "./auth";
import { signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
