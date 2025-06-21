"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface NavDropdownItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  variant?: "default" | "destructive"
  separator?: boolean
}

export interface NavDropdownProps {
  user: {
    name: string
    avatar?: string
    initials?: string
  }
  items: NavDropdownItem[]
  className?: string
}

export function NavDropdown({ user, items, className }: NavDropdownProps) {
  const [open, setOpen] = React.useState(false)

  const handleItemClick = (item: NavDropdownItem) => {
    if (item.onClick) {
      item.onClick()
    }
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`flex items-center cursor-pointer gap-2 px-3 py-2 h-auto hover:bg-gray-50 ${className}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-sm font-medium">
              {user.initials || user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">{user.name}</span>
          <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-1" align="end" sideOffset={8}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                item.variant === "destructive"
                  ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="text-sm">{item.label}</span>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
