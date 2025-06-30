
"use client"

import * as React from "react"
import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
} from "react-aria-components"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Calendar({
  className,
  ...props
}: React.ComponentProps<typeof AriaCalendar>) {
  return (
    <AriaCalendar
      className={cn("w-full", className)}
      {...props}
    >
      <header className="flex items-center justify-between pb-2">
        <Button
          slot="previous"
          variant="outline"
          size="icon"
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Heading className="text-sm font-medium" />
        <Button
          slot="next"
          variant="outline"
          size="icon"
          className="h-7 w-7"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </header>
      <CalendarGrid className="w-full border-collapse space-y-1">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground">
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className="relative h-8 w-8 p-0 text-center text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&[data-outside-month]]:text-muted-foreground [&[data-selected]]:bg-primary [&[data-selected]]:text-primary-foreground [&[data-selected]]:opacity-100 [&[data-today]]:bg-accent [&[data-today]]:text-accent-foreground"
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  )
}

export { Calendar }
