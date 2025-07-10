import type React from "react"
import { Search, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"

interface JobsearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedExperience: string;
  setSelectedExperience: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export default function JobSearch({
  searchQuery,
  setSearchQuery,
  selectedExperience,
  setSelectedExperience,
  selectedLocation,
  setSelectedLocation,
  onSearch,
}: JobsearchProps) {
  const router = useRouter();
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col items-center justify-center md:flex-row gap-2 bg-white rounded-lg border-2 border-gray-200 p-2">
        {/* Job Title Search */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 flex-1">
            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search jobs by 'title'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none ring-0 only:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"  
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200 my-2" />

        {/* Experience Dropdown */}
        <div className="flex items-center min-w-0 md:min-w-[200px]">
          <div className="flex items-center gap-3 px-4 py-3 flex-1">
            <Briefcase className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="border-0 p-0 w-full h-auto focus:ring-0 focus:ring-offset-0 text-gray-600">
                <SelectValue placeholder="Your Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead/Principal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200 my-2" />

        {/* Location Search */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 flex-1">
            <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search for an area or city"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Search Button */}
        <Button onClick={() => router.push('/login')}  type="submit" className="bg-[#255cf4] hover:bg-[#255cf5] text-white px-8 py-4 h-12 font-medium whitespace-nowrap">
          Search jobs
          <Icon icon="line-md:search" />
        </Button>
      </div>
    </div>
  )
}
