"use client";

import React, { useState } from "react";
import Header from "./Header";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "./Editor";
import Loader from "./Loader";
import ActiveCollaborators from "./ui/ActiveCollaborators";
import Image from "next/image";

function CollaborativeRoom({ roomId, roomMetadata }: CollaborativeRoomProps) {
  const ACTION = "editing";

  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateTitle = () => {};

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex gap-2.5">
              <input
                type="text"
                className="document-title-input"
                value={documentTitle || ""}
                onChange={(e) => setDocumentTitle(e.target.value)}
                onKeyDown={handleUpdateTitle}
                disabled={!isActive}
              />
              {!isActive && (
                <span onClick={() => setIsActive(true)}>
                  <Image
                    src="/assets/icons/edit.svg"
                    height={24}
                    width={24}
                    alt="Edit"
                  />
                </span>
              )}
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <div className="flex w-fit items-center justify-center gap-2">
                <p className="document-title">Share</p>
              </div>
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default CollaborativeRoom;
