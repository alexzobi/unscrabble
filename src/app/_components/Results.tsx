"use client"

import { Button, Input } from "."
import { useCallback, useState } from 'react'
import { getAllWordCombos } from "@/lib/trie"

// This component displays our results to the user in a grid format. It must be
// a client side component because it involves local state management and includes
// user interaction. This is where we call the business logic of our app. The good
// stuff that interviewers actually care about.
const Results = ({ className }: { className?: string }) => {
  const [chars, setChars] = useState("")
  const [results, setResults] = useState<string[]>()

  const handleUserInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChars(e.target.value)
  }, [])

  const handleOnClick = useCallback(() => {
    const results = getAllWordCombos(chars)
    setResults(results)
  }, [chars])

  return (
    <div className={className}>
      <div className="w-full justify-center wrap flex flex-row items-center">
        <Input className="mr-4" value={chars} onChange={handleUserInput}/>
        <Button onClick={handleOnClick}>Check</Button>
      </div>
      <div className="mt-4 grid gap-1 grid-cols-6 max-sm:grid-cols-2 w-full">
          {
            results?.map(word => (
              <p key={word} className="text-center text-white">{word}</p>
            ))
          }
        </div>
    </div>
  )
}

export default Results