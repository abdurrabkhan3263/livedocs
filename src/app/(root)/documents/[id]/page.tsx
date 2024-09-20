import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Documents({ params: { id } }: SearchParamProps) {
  const clerkUser = await currentUser();

  const room = await getDocument({
    roomId: id,
    userId: clerkUser?.emailAddresses[0].emailAddress as string,
  });

  if (!room) {
    redirect("/");
  }

  console.log("Rooms are ", room);

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });
  // Todo: Access the permission of the user to access the document

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType = room.usersAccesses[
    clerkUser?.emailAddresses[0].emailAddress as string
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={room.id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
}

export default Documents;
