import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
    HumanizeDuration,
    HumanizeDurationLanguage,
} from "humanize-duration-ts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const langService:HumanizeDurationLanguage=new HumanizeDurationLanguage()
const humanizer=new HumanizeDuration(langService)
export function  formatDuration(seconds:number){
    return humanizer.humanize(seconds*1000,{
        largest:1,
        round:true,
        units:["h","m","s"]
    })
}