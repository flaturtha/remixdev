import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <form className="flex-grow max-w-sm mx-auto">
      <div className="relative">
        <input
          type="search"
          placeholder="Search..."
          className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  )
} 