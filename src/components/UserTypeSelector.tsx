import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UserTypeSelector({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) {
  function accessChangeHandler(type: UserType): void {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  }

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="viewer" className="shad-select-item">
          can view
        </SelectItem>
        <SelectItem value="editor" className="shad-select-item">
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default UserTypeSelector;
