import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import type { ErrorAlertProps } from '@/types/error.alert.types'
import { AlertCircleIcon } from 'lucide-react'

const ErrorAlert = ({ message, onOk }: ErrorAlertProps) => {
  return (
    <div className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
      <Alert variant='destructive' className='card-alert'>
        <AlertTitle className='flex justify-center gap-x-2'>
          <AlertCircleIcon />
          Unable to process your request.
        </AlertTitle>
        <AlertDescription>
          <p>{message}</p>
          <Button
            variant='ghost'
            className='hover-behaviour mx-auto w-32'
            onClick={onOk}
          >
            OK
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default ErrorAlert
