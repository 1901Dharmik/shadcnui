import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { 
  addDays, 
  format, 
  getDate, 
  startOfMonth, 
  parseISO, 
  startOfDay,
  endOfDay,
  isSameDay 
} from "date-fns"
import {
  Calendar as CalendarIcon,
  Edit2,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {  Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { fetchEvents, addEvent, editEvent, removeEvent, reset } from '../features/events/eventSlice'
import { ScrollArea } from "@/components/ui/scroll-area"


export default function CalendarComponent() {
  const dispatch = useDispatch()
  const { events, isLoading, isError, message } = useSelector((state) => state.event)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false)
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false)
  const [selectedDateEvents, setSelectedDateEvents] = React.useState([])
  const [popoverOpen, setPopoverOpen] = React.useState(false)



  useEffect(() => {
    dispatch(fetchEvents())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleAddEvent = async (eventData) => {
    try {
      await dispatch(addEvent(eventData)).unwrap()
      setIsNewEventDialogOpen(false)
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  const handleEditEvent = async (eventData) => {
    try {
      await dispatch(editEvent({
        eventId: eventData._id,
        eventData
      })).unwrap()
      setIsEditEventDialogOpen(false)
      setSelectedEvent(null)
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const handleDeleteEvent = async (eventId) => {
    try {
      await dispatch(removeEvent(eventId)).unwrap()
      setSelectedEvent(null)
      setIsEditEventDialogOpen(false)
      
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const days = []
    for (let i = 0; i < 35; i++) {
      days.push(addDays(start, i))
    }
    return days
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    // Ensure the state is updated before opening the dialog
    setTimeout(() => {
      setIsEditEventDialogOpen(true)
    }, 0)
  }

  const handleDialogClose = () => {
    setIsEditEventDialogOpen(false)
    setSelectedEvent(null)
  }



  const handleMoreEventsClick = (dayEvents) => {
    setSelectedDateEvents(dayEvents)
    setPopoverOpen(true)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New event
            </Button>
          </DialogTrigger>
          <EventDialog onSubmit={handleAddEvent} />
        </Dialog>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
          Today
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800 rounded-lg border overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-muted p-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
        {getDaysInMonth().map((date, index) => {
          const dayEvents = events.filter(
            (event) => isSameDay(parseISO(event.start), date)
          )
          return (
            <div
              key={index}
              className={cn(
                "bg-background p-2 min-h-[120px]",
                date.getMonth() !== currentMonth.getMonth() && "text-muted-foreground"
              )}
            >
              <div className="font-medium">{getDate(date)}</div>
              <div className="space-y-1 mt-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onClick={() => {
                      setSelectedEvent(event)
                      setIsEditEventDialogOpen(true)
                    }}
                  />
                ))}
                {/* {dayEvents.length > 3 && (
                  <Button
                    variant="ghost"
                    className="text-xs text-muted-foreground w-full"
                    onClick={() => {
                      // Handle showing more events
                    }}
                  >
                    +{dayEvents.length - 3} more
                  </Button>
                )} */}
                 {dayEvents.length > 3 && (
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-xs text-muted-foreground w-full"
                      onClick={() => handleMoreEventsClick(dayEvents)}
                    >
                      +{dayEvents.length - 3} more
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4">
                    <h4 className="text-sm font-medium mb-2">Additional Events</h4>
                    {selectedDateEvents.map((event) => (
                      <EventCard
                        key={event._id}
                        event={event}
                        onClick={() => {
                          handleEventClick(event)
                          // setSelectedEvent(event)
                          // setIsEditEventDialogOpen(true)
                          setPopoverOpen(false)  
                          // Close popover on event click
                        }}
                      />
                    ))}
                  </PopoverContent>
                </Popover>
              )}
              </div>
            </div>
          )
        })}
      </div>

      <Dialog open={isEditEventDialogOpen} 
       onOpenChange={handleDialogClose}
      // onOpenChange={setIsEditEventDialogOpen}
      >
        {/* {selectedEvent && (
          <EventDialog
            event={selectedEvent}
            onSubmit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        )} */}
         {selectedEvent && (
          <EventDialog
            event={selectedEvent}
            onSubmit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </Dialog>
    </div>
  )
}

function EventCard({ event, onClick }) {
  return (
    <div
      className={cn(
        "text-xs p-1 my-2 rounded truncate cursor-pointer hover:opacity-80 transition-opacity",
        "bg-opacity-20"
      )}
      style={{ backgroundColor: event.color }}
      onClick={onClick}
    >
      {event.title}
    </div>
  )
}

function EventDialog({ event, onSubmit, onDelete }) {
  const [title, setTitle] = React.useState(event?.title || "")
  const [description, setDescription] = React.useState(event?.description || "")
  const [color, setColor] = React.useState(event?.color || "#206c43")
  const [startDate, setStartDate] = React.useState(
    event?.start 
      ? format(parseISO(event.start), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd")
  )
  const [endDate, setEndDate] = React.useState(
    event?.end 
      ? format(parseISO(event.end), "yyyy-MM-dd")
      : format(addDays(new Date(), 1), "yyyy-MM-dd")
  )
  const [notes, setNotes] = React.useState(event?.notes || "")
  const [error, setError] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError("Title is required")
      return
    }
    
    if (new Date(endDate) < new Date(startDate)) {
      setError("End date must be after or equal to start date")
      return
    }

    // Convert dates to start and end of day to ensure proper date handling
    const start = startOfDay(new Date(startDate)).toISOString()
    const end = endOfDay(new Date(endDate)).toISOString()

    const newEvent = {
      ...(event ? { _id: event._id } : {}),
      title,
      description,
      color,
      start,
      end,
      notes,
      createdBy: event?.createdBy || "user_id", // Replace with actual user ID
    }
    
    onSubmit(newEvent)
  }

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <ScrollArea>
      <DialogHeader>
        <DialogTitle>{event ? "Edit Event" : "New Event"}</DialogTitle>
        <DialogDescription>
          {event
            ? "Edit the details of your event"
            : "Add a new event to your calendar"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="color" className="text-sm font-medium">Color</label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-10"
              />
              <div 
                className="flex-1 rounded border"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Notes</label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          {event && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this event?')) {
                  onDelete(event._id)
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Event
            </Button>
          )}
          <Button type="submit">
            {event ? (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
      </ScrollArea>
    </DialogContent>
  )
}