import {
  CircleUserRound,
  House,
  LogOut,
  Menu,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logOutUser } from "@/store/authSlice";
import UserCartWrapper from "./cartWrapper";
import { fetchCartItems } from "@/store/shopping/cartSlice";
import { Label } from "../ui/label";


function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("lists") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const{cartItems} = useSelector((state)=>state.shoppingCart)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);


  function handleLogout() {
    // Clear all sessionStorage data
    // sessionStorage.clear(); 
    //sessionStorage.removeItem('filters') // specific session data
    dispatch(logOutUser());
  }

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

  // console.log(cartItems,"cartItems sapna");
  

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-6">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
        <Button onClick={()=>setOpenCartSheet(true)} className="ml-2 relative" variant="outline" size="icon">
          <ShoppingCart className="w-6 h-6 " />
          <span className="absolute top-[-3px] right-1 text-sm text-red-500 font-bold">{cartItems?.items?.length || 0}</span>
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}/>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold ">
              {user?.userName !== null ? user?.userName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <CircleUserRound className="mr-2 h-5 w-5" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    // here i did some modification changed sticky to fixed 
    <header className="sticky top-0 z-40 w-full border-b bg-[#fbf6f2] mb-1"> 
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          
          <ShoppingBasket className="h-6 w-6"/>
          <span className="font-bold">E-life Style</span>
        </Link>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={handleMenuToggle}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems onClose={handleMenuClose} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:flex items-center">
          <MenuItems onClose={handleMenuClose} className="mr-4" />
          {isAuthenticated ? <HeaderRightContent /> : null}
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
