import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
export default function Component() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch activity logs
  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/api/activity-logs`);
      if (!response.ok) throw new Error("Failed to fetch activity logs");
      const data = await response.json();
      setLogs(data.logs || []); // Adjust based on the actual API response structure
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(); // Fetch logs on component mount
  }, []);
  //   const messages = [
  //     {
  //       id: 1,
  //       sender: "William Smith",
  //       title: "Meeting Tomorrow",
  //       preview: "Hi team, just a reminder about our meeting tomorrow at 10 AM...",
  //       timestamp: "09:34 AM"
  //     },
  //     {
  //       id: 2,
  //       sender: "Alice Smith",
  //       title: "Re: Project Update",
  //       preview: "Thanks for the update. The progress looks great so far...",
  //       timestamp: "Yesterday"
  //     },
  //     {
  //       id: 3,
  //       sender: "Bob Johnson",
  //       title: "Weekend Plans",
  //       preview: "Hey everyone! I'm thinking of organizing a team outing this weekend...",
  //       timestamp: "2 days ago"
  //     },
  //     {
  //       id: 4,
  //       sender: "Emily Davis",
  //       title: "Re: Question about Budget",
  //       preview: "I've reviewed the budget numbers you sent over...",
  //       timestamp: "2 days ago"
  //     },
  //     {
  //       id: 5,
  //       sender: "Michael Wilson",
  //       title: "Important Announcement",
  //       preview: "Please join us for an all-hands meeting this Friday at 3 PM...",
  //       timestamp: "1 week ago"
  //     },
  //     {
  //         id: 6,
  //         sender: "William Smith",
  //         title: "Meeting Tomorrow",
  //         preview: "Hi team, just a reminder about our meeting tomorrow at 10 AM...",
  //         timestamp: "09:34 AM"
  //       },
  //       {
  //         id: 7,
  //         sender: "Alice Smith",
  //         title: "Re: Project Update",
  //         preview: "Thanks for the update. The progress looks great so far...",
  //         timestamp: "Yesterday"
  //       },
  //       {
  //         id: 8,
  //         sender: "Bob Johnson",
  //         title: "Weekend Plans",
  //         preview: "Hey everyone! I'm thinking of organizing a team outing this weekend...",
  //         timestamp: "2 days ago"
  //       },
  //       {
  //         id: 9,
  //         sender: "Emily Davis",
  //         title: "Re: Question about Budget",
  //         preview: "I've reviewed the budget numbers you sent over...",
  //         timestamp: "2 days ago"
  //       },
  //       {
  //         id: 10,
  //         sender: "Michael Wilson",
  //         title: "Important Announcement",
  //         preview: "Please join us for an all-hands meeting this Friday at 3 PM...",
  //         timestamp: "1 week ago"
  //       }
  //   ]

  return (
    <div className="h-screen flex border">
      {/* Left sidebar with messages */}
      <div className="w-[400px] border-r">
        <ScrollArea className="h-screen">
          <div className="flex flex-col">
            {logs?.map((log) => (
              <div key={log.id}>
                <button
                  onClick={() => setSelectedMessage(log)}
                  className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                    selectedMessage?._id === log._id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium capitalize">
                      {`${log.userId?.firstname || ""} ${
                        log.userId?.lastname || ""
                      }`}{" "}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(log.createdAt), "dd-MM-yyyy hh:mm a")}
                    </span>
                  </div>
                  <div className="font-medium mb-1">
                    <span className="text-primary capitalize">
                      {log.action}
                    </span>{" "}
                    {log.modelName}
                  </div>
                  {/* <div className="text-sm text-muted-foreground line-clamp-2">{log.preview}</div> */}
                </button>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right content area */}
      <div className="flex-1 p-6">
        {selectedMessage ? (
          <div className="max-w-3xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {selectedMessage.modelName}
                </h1>
                <div className="text-muted-foreground">
                  From: {selectedMessage.sender}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedMessage.timestamp}
              </div>
            </div>
            <p className="text-lg">{selectedMessage.preview}</p>
            <pre className=" text-lg whitespace-pre-wrap">
              {JSON.stringify(selectedMessage.details, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  );
}
