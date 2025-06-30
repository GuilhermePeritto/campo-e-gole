
"use client"

import * as React from "react"
import {
  Calendar as AriaCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
  Heading,
  Button,
  type CalendarProps,
  type DateValue
} from "react-aria-components"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

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
              className={cn(
                "w-8 h-8 text-sm rounded-md flex items-center justify-center",
                "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                "selected:bg-primary selected:text-primary-foreground",
                "unavailable:text-muted-foreground unavailable:cursor-not-allowed",
                "outside-month:text-muted-foreground/50"
              )}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  )
}

export { Calendar }
