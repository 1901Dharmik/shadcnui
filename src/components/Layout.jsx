import React, { useState, useEffect } from "react";
import Header from "./ui/Header";
import Sidebar from "./Sidebar";
import { Toaster } from "./ui/sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import ModeToggle from "./ui/ModeToggle";
import ThemeProvider from "./ui/theme-provider";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";
import { motion } from "framer-motion";
import { Bell, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CustomScrollbar({ children, className = "", height = "h-full" }) {
  return (
    <ScrollArea className={`${height} ${className}`}>
      <div className="p-4">{children}</div>
    </ScrollArea>
  );
}
const buttonVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};
export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      // Scroll down
      setIsVisible(false);
    } else {
      // Scroll up
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  // useEffect(() => {
  //   dispatch(fetchNotes());
  // }, [dispatch]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="flex h-full lg:h-screen overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="bg-muted/40 ">
            <ResizablePanel
              defaultSize={
                window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 15 : 15
              }
              // minSize={0}
              maxSize={21}
              className="hidden xl:block"
              // className={`${isSidebarVisible ? "block" : "hidden"} xl:block`}
            >
              <ScrollArea className="h-full bg-muted/30">
                <aside className="h-full border-r">
                  <Sidebar />
                </aside>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden lg:flex" />
            <ResizablePanel>
              <div className="flex flex-col h-full">
                <header className="border-b bg-opacity-65 bg-muted/30 backdrop-blur-lg z-40 lg:sticky top-0 fixed">
                  <Header
                    // isSidebarVisible={isSidebarVisible}
                    // toggleSidebar={toggleSidebar}
                  />
                </header>

                <div className="flex-1 overflow-auto no-scrollbar scrollbar-none">
                  {/* <CustomScrollbar> */}
                  <div className="lg:p-10 p-0 pt-12 ">
                    <Outlet />
                  </div>
                  {/* </CustomScrollbar> */}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <Toaster position={"top-right"} />
        {/* <div className="fixed bottom-6 right-6 z-10">
          <Link href="tel:+918160229683" passHref legacyBehavior>
            <motion.div
              initial="initial"
              animate="animate"
              variants={buttonVariants}
              transition={{ duration: 2, type: "spring", stiffness: 50 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button size="icon" variant="outline" >
              <span class="icon-[solar--bell-bing-bold-duotone] text-2xl bg-gray-700"></span>
              </Button>
            </motion.div>
          </Link>
        </div> */}
      </ThemeProvider>
    </>
  );
}
