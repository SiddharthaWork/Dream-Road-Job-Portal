"use client"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface Category {
  id: number
  name: string
  active: boolean
}

interface CategoryFilterProps {
  categories: Category[]
  onCategoryChange?: (categoryId: number) => void
}

export default function CategoryFilter({ categories, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex bg-gray-100 rounded-lg p-1">
        {(categories || []).map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            size="sm"
            className={category.active ? "bg-white shadow-sm" : ""}
            onClick={() => onCategoryChange?.(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <Button variant="outline" size="sm">
        <Filter className="w-4 h-4" />
      </Button>
    </div>
  )
}
