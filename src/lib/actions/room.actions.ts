"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblock";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";

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
    return room;
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error(`You do not have access to this document`);
    }

    return parseStringify(room);
  } catch (error) {
    console.error(`Error happened while getting a room: ${error}`);
  }
};

export const updateDocumentTitle = async (roomId: string, title: string) => {
  try {
    const updateRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updateRoom);
  } catch (error) {
    console.log(`Error happened while updating a room ${error}`);
  }
};

export const getDocuments = async (email: string) => {
  try {
    const documents = await liveblocks.getRooms({ userId: email });
    return parseStringify(documents);
  } catch (error) {
    console.error(`Something went wrong while getting the data ${error}`);
  }
};

export const deleteDocuments = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error(`Something went wrong while deleting the document ${error}`);
  }
};
