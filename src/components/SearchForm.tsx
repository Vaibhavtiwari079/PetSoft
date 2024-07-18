"use client"

import { useSearchContext } from "@/lib/hooks"

const SearchForm = () => {
  const {searchQuery,handlechangeSearchQuery}=useSearchContext()
  return (
    <form className='w-full h-full'>
        <input className='w-full h-full bg-white/20 rounded-md px-5 outline-none focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50 '
        placeholder='Search pet by name'
        type="search"
        value={searchQuery}
        onChange={(e)=>handlechangeSearchQuery(e.target.value)}/>
    </form>
  )
}

export default SearchForm