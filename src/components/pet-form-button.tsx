import React from 'react'
import { Button } from './ui/button'

type Props={
    actionType:"add"  |"edit";
}
function Petformbutton({actionType}:Props) {
    
  return (
    <div>
        
        <Button type="submit"
            className="mt-5">{
            actionType==="add"?("Add to pets"):("Edit")}</Button>
    </div>
  )
}

export default Petformbutton