import CollaborativeRoom from "@/components/CollaborativeRoom";
import React from "react";

function Documents({ params }: { params: { id: string } }) {
  return (
    <div>
      <CollaborativeRoom id={params.id} />
    </div>
  );
}

export default Documents;
