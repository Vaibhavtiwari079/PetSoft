"use client"
import React, { createContext, useState } from 'react'
type SearchContextProviderProps={
    
    children:React.ReactNode;
}

type TySearchContext={
    searchQuery:string;
    handlechangeSearchQuery:(newValue:string)=>void;

    
}

export const SearchContext=createContext<TySearchContext| null>(null);

function SearchContextProvider({children}:SearchContextProviderProps) {
    const[searchQuery,setSearchQuery]=useState("")
    
    //event handlers
    const handlechangeSearchQuery=(newValue:string)=>{setSearchQuery(newValue)

    }
    return (
    <SearchContext.Provider value={{
        searchQuery,
        handlechangeSearchQuery


    }}>
        {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider