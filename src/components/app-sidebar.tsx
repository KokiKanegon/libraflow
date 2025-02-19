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

// import { Link } from "react-router-dom";

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
    url: "/libraflow/register/",
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

export function AppSidebar() {
  return (
    <Sidebar>
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
  );
}
