import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { loginState } from "../main";
import { Label } from "@radix-ui/react-select";

export function AvatarIcon() {
  const user_name = loginState((state) => state.user_name);

  return (
    <div className="flex justify-end items-start h-screen space-x-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{user_name ? user_name.charAt(0) : "?"}</AvatarFallback>
      </Avatar>
      <Label className="text-lg font-semibold">
        {user_name === "" ? "ゲスト" : user_name}さん
      </Label>
    </div>
  );
}
