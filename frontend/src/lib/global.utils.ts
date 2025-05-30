import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const timeConversions = {
  daysToSeconds: (days: number) => days * 86400,
  hoursToSecond: (hours: number) => hours * 3600,
  minutesToSeconds: (minutes: number) => minutes * 60,
  toTTL: (days: number = 0, hours: number = 0, minutes: number = 0) =>
    timeConversions.daysToSeconds(days) +
    timeConversions.hoursToSecond(hours) +
    timeConversions.minutesToSeconds(minutes),
}
