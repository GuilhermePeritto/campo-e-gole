"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
    Calendar as AriaCalendar,
    Button,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader,
    CalendarHeaderCell,
    Heading,
    type CalendarProps,
    type DateValue
} from "react-aria-components"

function Calendar({ className, ...props }: CalendarProps<DateValue>) {
  return (
    <AriaCalendar
      className={cn(
        "p-3 bg-background border rounded-lg shadow-sm",
        className
      )}
      {...props}
    >
      <header className="flex items-center justify-between pb-4">
        <Button
          slot="previous"
          className="p-1 hover:bg-accent rounded-md transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Heading className="text-sm font-medium" />
        <Button
          slot="next"
          className="p-1 hover:bg-accent rounded-md transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </header>
      <CalendarGrid className="border-separate border-spacing-1">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="text-xs font-medium text-muted-foreground p-2">
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={({ isSelected, isOutsideMonth, isUnavailable }) =>
                cn(
                  "w-8 h-8 text-sm rounded-md flex items-center justify-center font-medium transition-colors",
                  isSelected && "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/60",
                  !isSelected && !isOutsideMonth && "bg-background text-foreground",
                  isOutsideMonth && "bg-background text-muted-foreground/40 opacity-60",
                  isUnavailable && "text-muted-foreground/60 cursor-not-allowed",
                  "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                )
              }
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  )
}

export { Calendar }
