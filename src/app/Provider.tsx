"use client";
import React, { ReactNode } from "react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

function Provider({ children }: { children: ReactNode }) {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        console.log("Clerk User:- ", users);
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        console.log(`Room users is:- ${roomId}`);
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser:
            (clerkUser && clerkUser?.emailAddresses[0].emailAddress) ?? "",
          text,
        });
        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}

export default Provider;
