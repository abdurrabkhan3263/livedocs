"use client";

import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";

const ShareModel = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  type UserType = string; // Define UserType as string or replace with the correct type

  const [userType, setUserType] = useState<UserType>("");

  console.log();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="flex gap-2 px-4 gradient-blue items-center"
          disabled={currentUserType !== "editor"}
        >
          <p>Share</p>
          <Image
            src="/assets/icons/share.svg"
            height={20}
            width={20}
            alt="share"
            className="mr-1 hidden sm:block"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can access and view this project.
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email-address">Email address</Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-md bg-dark-400">
            <Input
              id="email-address"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModel;
