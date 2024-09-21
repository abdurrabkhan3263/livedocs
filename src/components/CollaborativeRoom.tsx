"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "./Editor";
import Loader from "./Loader";
import ActiveCollaborators from "./ui/ActiveCollaborators";
import Image from "next/image";
import { updateDocumentTitle } from "@/lib/actions/room.actions";
import { Input } from "./ui/input";

function CollaborativeRoom({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateTitle = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      try {
        if (roomMetadata.title !== documentTitle) {
          setLoading(true);

          const updateRes = await updateDocumentTitle(roomId, documentTitle);

          if (updateRes) {
            setIsActive(false);
          }
        }
      } catch (error) {
        console.error(`Something went wrong while updating the title ${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutSide = async (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (roomMetadata.title !== documentTitle) {
          try {
            setLoading(true);
            await updateDocumentTitle(roomId, documentTitle);
          } catch (error) {
            console.error(
              `Something went wrong while updating the title ${error}`
            );
          } finally {
            setIsActive(false);
            setLoading(false);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [roomId, documentTitle]);

  useEffect(() => {
    if (inputRef.current && isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {isActive && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={handleUpdateTitle}
                  className="document-title-input"
                  disabled={!isActive}
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {currentUserType === "editor" && !isActive && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  onClick={() => setIsActive(true)}
                  className="pointer"
                />
              )}

              {currentUserType !== "editor" && !isActive && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && <p className="text-sm text-gray-400">saving...</p>}
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
          <Editor currentUserType={currentUserType} roomId={roomId} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default CollaborativeRoom;
