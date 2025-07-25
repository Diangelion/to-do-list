import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { activityStatus } from '@/lib/constant'
import { Plus } from 'lucide-react'

const NewToDoDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className='fixed right-[2rem] bottom-[2rem]'>
          <div
            title='Add new activity'
            className='hover-behaviour bg-accent flex h-[3rem] w-[3rem] items-center justify-center rounded-full'
          >
            <Plus />
          </div>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add new activity at DD/MM/YYYY</DialogTitle>
            <DialogDescription>
              Create a new activity for this date. Add, organize, and track
              tasks for a productive day.
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col gap-3'>
            <Label htmlFor='date' className='px-1'>
              Title
            </Label>
            <Input datatype='string' />
          </div>
          <div className='flex flex-col gap-3'>
            <Label htmlFor='date' className='px-1'>
              Description
            </Label>
            <Input datatype='string' />
          </div>
          <div className='flex flex-col gap-3'>
            <Label htmlFor='date' className='px-1'>
              Status
            </Label>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {activityStatus.map(({ value, label }) => (
                    <SelectItem key={label} value={`${value}`}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

export default NewToDoDialog
