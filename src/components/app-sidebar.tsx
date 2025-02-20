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
import { SidebarHeader } from "./ui/sidebar";
import { isLoggedIn } from "@/main";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useReactiveVar } from "@apollo/client";

// Menu items.
const items = [
  {
    title: "Main",
    url: "/libraflow/main",
    icon: Home,
  },
  {
    title: "Login",
    url: "/libraflow/login",
    icon: LogIn,
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
    url: "/libraflow/testpage",
    icon: Book,
  },
  {
    title: "Settings",
    url: "libraflow/#",
    icon: Settings,
  },
];

// Sidebar component.
export function AppSidebar() {
  const login = useReactiveVar(isLoggedIn);
  console.log(login);
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenuButton>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Libraflow</span>
              <span className="">{login?.user_name ?? "ゲスト"}さん</span>
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
      </Sidebar>
    </>
  );
}
