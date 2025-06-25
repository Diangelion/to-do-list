import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Calendar as CalendarIcon,
  ChevronDownIcon,
  CirclePlus
} from 'lucide-react'
import { useState } from 'react'

const NewDateDialog = () => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div
            className='hover-behaviour w-full rounded-sm'
            title='Create New Todos'
          >
            <div className='flex items-center gap-x-3 px-5 py-2'>
              <CirclePlus
                width={20}
                height={20}
                className='text-secondary-foreground'
              />{' '}
              <p className='text-sm'>New Date</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add new date.</DialogTitle>
            <DialogDescription>
              Create a new date entry to organize your todos. Once added, you
              can start adding tasks under this date.
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col gap-3'>
            <Label htmlFor='date' className='px-1'>
              <CalendarIcon height={16} width={16} /> Date of to do
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant='secondary'
                  className='w-48 cursor-pointer justify-between font-normal'
                >
                  {date ? date.toLocaleDateString() : 'Select date'}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='w-auto overflow-hidden p-0'
                align='start'
              >
                <Calendar
                  mode='single'
                  selected={date}
                  captionLayout='dropdown'
                  onSelect={date => {
                    setDate(date)
                    setOpen(false)
                  }}
                  className='[[data-slot=popover-content]_&]:bg-primary'
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className='cursor-pointer' variant='secondary'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              className='cursor-pointer'
              variant='secondary'
              type='submit'
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default NewDateDialog
