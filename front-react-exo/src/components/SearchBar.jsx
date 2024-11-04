import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { BookCard } from "../components/book/BookCard"
import { searchBookByAuthor } from "../services/bookService"
import { useState } from "react"

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchTerm.trim()) return

        try {
            const searchResults = await searchBookByAuthor(searchTerm)
            setResults(searchResults)
        } catch (error) {
            console.error("Search failed:", error)
        }
    }

    return (
        <div className="max-w-7xl mx-auto my-8">
            <form onSubmit={handleSearch} className="relative mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un auteur..."
                    className="w-full p-4 text-lg border-4 border-black rounded-lg shadow-comic font-comic 
                   focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 
                   bg-white border-4 border-black rounded-lg shadow-comic 
                   font-comic hover:bg-gray-100 transition-transform hover:scale-105"
                >
                    Rechercher
                </button>
            </form>

            {results && results.length > 0 && (
                <motion.div
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                >
                    {results.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </motion.div>
            )}
        </div>
    )
}
