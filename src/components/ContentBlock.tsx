  import { cn } from '@/lib/utils';
import React from 'react'
  type ContentBlockProp={children:React.ReactNode,
    className?:string;
  }
  
  
  const ContentBlock = (
    {children,className}:ContentBlockProp) => {
    return (
      <div className={cn('bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full w-full',className)}>{children}</div>
    )
  }
  
  export default ContentBlock