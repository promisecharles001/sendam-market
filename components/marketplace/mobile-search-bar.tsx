"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileSearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    
    if (query.trim()) {
      params.set('query', query.trim())
    } else {
      params.delete('query')
    }
    
    params.set('page', '1')
    router.push(`/marketplace?${params.toString()}`)
    setIsOpen(false)
  }

  const clearSearch = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('query')
    params.set('page', '1')
    router.push(`/marketplace?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="flex-1 justify-start text-muted-foreground h-11"
          >
            <Search className="mr-2 h-4 w-4" />
            Search items...
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="w-full">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSearch} className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items..."
                className="pl-10 pr-10"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button type="submit" className="w-full mt-3">
              Search
            </Button>
          </form>
        </SheetContent>
      </Sheet>
      
      <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}