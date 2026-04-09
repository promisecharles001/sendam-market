"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Eye, Clock } from "lucide-react"
import type { Item } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { ConditionBadge } from "@/lib/ui/condition-badge"
import { useState } from "react"

interface ItemCardProps {
  item: Item & { originalPrice?: number | null }
}

export function ItemCard({ item }: ItemCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const hasValidOriginal =
    item.originalPrice && item.price && Number(item.originalPrice) > 0 && Number(item.originalPrice) > Number(item.price)
  const discount = hasValidOriginal
    ? Math.round(((Number(item.originalPrice) - Number(item.price)) / Number(item.originalPrice)) * 100)
    : null

  // Calculate time since posted
  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days}d ago`
    if (days < 30) return `${Math.floor(days / 7)}w ago`
    return `${Math.floor(days / 30)}mo ago`
  }

  return (
    <Link
      href={`/item/${item.id}`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
    >
      <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl h-full flex flex-col overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-300 dark:group-hover:border-blue-700/50 rounded-xl">
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
          )}
          
          <Image
            src={item.images?.[0] || '/placeholder.jpg'}
            alt={item.title}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {/* Urgent Badge */}
            {item.urgent && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg">
                <Clock className="w-3 h-3 mr-1" />
                Urgent
              </Badge>
            )}
            
            {/* Discount Badge */}
            {discount && (
              <Badge
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg font-bold"
              >
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className={`absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
              isLiked 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/90 dark:bg-black/50 text-slate-600 dark:text-slate-300 hover:bg-white hover:text-red-500'
            } opacity-0 group-hover:opacity-100 shadow-lg`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <ConditionBadge condition={item.condition} size="sm" />
              <div className="flex items-center gap-1 text-white/90 text-xs">
                <Eye className="w-3 h-3" />
                <span>{item.views || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 flex-grow flex flex-col justify-between bg-white dark:bg-slate-900">
          <div className="space-y-2">
            {/* Title */}
            <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {item.title}
            </h3>

            {/* Location & Time */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              {item.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-20">{item.location}</span>
                </div>
              )}
              <span>{getTimeAgo(item.createdAt)}</span>
            </div>
          </div>

          {/* Price & Seller */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="font-bold text-lg md:text-xl text-slate-900 dark:text-white">
                  {formatPrice(item.price)}
                </p>
                {discount && (
                  <p className="text-xs text-slate-400 line-through">
                    {formatPrice(item.originalPrice!)}
                  </p>
                )}
              </div>

              {/* Seller Avatar */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 flex items-center justify-center text-white text-xs font-bold">
                  {item.seller?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 max-w-16 truncate">
                  {item.seller?.name || 'Anonymous'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
