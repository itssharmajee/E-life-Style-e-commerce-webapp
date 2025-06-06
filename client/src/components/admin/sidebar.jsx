import {
  ChartNoAxesCombined,
  Feather,
  LayoutDashboard,
  SendToBack,
  ShoppingCart,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingCart />,
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <Feather />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <SendToBack />,
  },
];
function MenuItems({setOpen}) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col gap-2">
      {adminSideBarMenuItems.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            onClick={() =>{ navigate(menuItem.path);
              setOpen ? setOpen(false) : null
            }}
            className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle>
                <span className="flex mb-4 items-center gap-x-2 text-lg font-semibold">
                  <ChartNoAxesCombined size={25} />
                  Admin Panel
                </span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex mt-5 cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <span className="text-2xl font-extrabold">Admin Panel</span>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
