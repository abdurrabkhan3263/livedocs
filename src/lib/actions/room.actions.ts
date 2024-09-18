"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblock";
import { revalidatePath } from "next/cache";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");
    return JSON.stringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};
