import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
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

  console.log("Room from page:- ", room);

  // Todo: Access the permission of the user to access the document

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={room.id}
        roomMetadata={room.metadata}
        users={room.users}
        currentUserType={room.currentUserType}
      />
    </main>
  );
}

export default Documents;
