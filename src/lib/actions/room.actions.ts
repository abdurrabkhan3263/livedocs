import { nanoid } from "nanoid";
import { liveblocks } from "../liveblock";

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

    const room = await liveblocks.createRoom("my-room-id", {
      defaultAccesses: ["room:read", "room:presence:write"],
      groupsAccesses: {
        "my-group-id": ["room:write"],
      },
      usersAccesses: {
        "my-user-id": ["room:write"],
      },
    });
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};
