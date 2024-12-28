import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router";
// import highlightText from "./highlightText";
import { Input } from "./input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";
import { Search } from "lucide-react";
const RouteSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    // if (searchTerm) {
    //   const searchResults = searchRoutes(routes.routes, searchTerm);
    if (open) {
      const searchResults = searchRoutes(routes.routes, searchTerm);
      setResults(searchResults);
      console.log("Search Results:", searchResults); // Debugging line// Access the routes array
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchTerm, open]);

  const handleSuggestionClick = (path) => {
    navigate(path);
    setHighlightedIndex(0);
    setOpen(false);
  };

  //
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      handleSuggestionClick(results[highlightedIndex].path);
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex(
        (prevIndex) => (prevIndex - 1 + results.length) % results.length
      );
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => (
      <span
        key={index}
        className={
          part.toLowerCase() === highlight.toLowerCase() ? "text-green-800" : ""
        }
      >
        {part}
      </span>
    ));
  };
  return (
    <>
    
        
    <p className="text-sm text-muted-foreground p-2 border rounded-md flex  align-middle items-center" onClick={()=> setOpen(true)}>
    <Search className="h-5 w-5 mx-1"/> Search ...{" "}
        <kbd className="mx-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
    
      
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="fixed top-9 left-0 right-0 z-50"
      >
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            type="text"
            className="flex h-11 w-full focus:ring-0 border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search routes"
          />
        </div>

        <CommandList>
          <div className="">
            {results.length > 0 ? (
              <div className="">
                <CommandGroup heading="Suggestions">
                  {results.map((result, index) => (
                    <CommandItem
                      className={ index === highlightedIndex ? "" : ""}
                    >
                      <div
                        key={result.path}
                        onClick={() => handleSuggestionClick(result.path)}
                      >
                        <strong className="text-[14px] text-stone-700 ">{highlightText(result.name, searchTerm)}:{" "}</strong>
                        <br/>
                        <span className="text-xs">{highlightText(result.path, searchTerm)}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ) : (
              searchTerm && <CommandEmpty>No results found</CommandEmpty>
            )}
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default RouteSearch;
const searchRoutes = (routes, searchTerm) => {
  const results = [];

  const search = (route, basePath = "") => {
    const fullPath = basePath + (route.path || "");
    if (
      route.name &&
      route.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      results.push({ name: route.name, path: fullPath });
    }
    if (route.children) {
      route.children.forEach((childRoute) => search(childRoute, fullPath));
    }
  };

  routes.forEach((route) => search(route));

  return results;
};
