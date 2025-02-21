import {
  Home,
  BookOpen,
  Edit,
  Search,
  Settings,
  LogIn,
  Book,
  BookDashed,
  BookCopyIcon,
  BookDashedIcon,
  DoorClosed,
  DoorOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarFooter, SidebarHeader } from "./ui/sidebar";
import { isLoggedIn } from "@/main";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";

type UserState = {
  id: string;
  user_code: string;
  user_name: string;
} | null;

// Menu items.
const items = [
  {
    title: "Main",
    url: "/libraflow/main",
    icon: Home,
  },
  {
    title: "Book Information",
    url: "/libraflow/bookinfo",
    icon: BookOpen,
  },
  {
    title: "Edit Book",
    url: "/libraflow/edit/:book_code",
    icon: Edit,
  },
  {
    title: "Register Book",
    url: "/libraflow/register/",
    icon: BookCopyIcon,
  },
  {
    title: "Return Book",
    url: "/libraflow/return/",
    icon: BookDashedIcon,
  },
  {
    title: "MyPage",
    url: "/libraflow/mypage",
    icon: Book,
  },
  {
    title: "Settings",
    url: "/libraflow/settings",
    icon: Settings,
  },
];

// Sidebar component.
export function AppSidebar() {
  const navigate = useNavigate();
  const login = useReactiveVar(isLoggedIn);
  console.log(login);
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenuButton>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Libraflow</span>
              <span className="">
                {login?.user_name !== "" ? login?.user_name : "ゲスト"}さん
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {login?.user_name ? (
            <SidebarMenuButton
              onClick={() => {
                const obj: UserState = {
                  id: "",
                  user_code: "",
                  user_name: "",
                };
                // オブジェクトをJSON文字列に変換
                const jsonObj = JSON.stringify(obj);
                sessionStorage.setItem("login", jsonObj);
                isLoggedIn(obj);

                alert("ログアウトしました");
                navigate("./main/");
              }}
            >
              <DoorClosed />
              <span>ログアウト</span>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              onClick={() => {
                navigate("./login/");
              }}
            >
              <DoorOpen />
              <span>ログイン</span>
            </SidebarMenuButton>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
