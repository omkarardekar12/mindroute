import { nanoid } from "@reduxjs/toolkit";

const USER_ID_KEY = "mindroute_userId";

export function getOrCreateUserId() {
  let userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
    userId = nanoid();
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}
