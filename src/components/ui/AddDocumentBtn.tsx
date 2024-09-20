"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

function AddDocumentBtn({ userId, email }: AddDocumentBtnProps) {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const addDocumentHandler = async () => {
    try {
      setLoader(true);
      const room = await createDocument({ userId, email });
      if (room) {
        router.push(`/documents/${room.id}`);
      }
    } catch (error) {
      console.error(`Something want wrong while creating document ${error}`);
    } finally {
      setLoader(false);
    }
  };
  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      <p className="hidden sm:block">Start a black document</p>
      {loader && (
        <div className="loader">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin ml-2"
          />
        </div>
      )}
    </Button>
  );
}

export default AddDocumentBtn;
