import { z } from "zod"
 export const petIdSchema=z.string().cuid()
export const petFormSchema=z.object({
    name:z.string().trim().min(1,{message:"name is required"}).max(100),
    ownerName:z.string().trim().min(1,{message:"ownername is required"}).max(100),
    imageUrl:z.union([z.literal(""),z.string().trim().url({message:"Url is not valid"})])
    ,age:z.coerce.number().int().positive().max(1000),
    notes:z.union([z.literal(""),z.string().trim().max(1000)])
  })
  export type TPetform=z.infer<typeof petFormSchema>