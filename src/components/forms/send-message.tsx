'use client';
import { sendMessage } from '@/app/actions/messaging';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

const userTypes = [
  {
    label: 'ALL USERS',
    value: 'ALL-USERS',
  },
  {
    label: 'PENDING TRANSACTIONS USERS',
    value: 'PENDING-TRANSACTIONS-USERS',
  },
  {
    label: 'SUCCESSFUL TRANSACTIONS USERS',
    value: 'SUCCESSFUL-TRANSACTIONS-USERS',
  },
  {
    label: 'FAILED TRANSACTIONS USERS',
    value: 'FAILED-TRANSACTIONS-USERS',
  },
  {
    label: 'CUSTOM',
    value: 'CUSTOM',
  },
];

const messageTypes = [
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Template',
    value: 'template',
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={'xl'}
      disabled={pending}
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />
      <span>Send Message</span>
    </Button>
  );
}

export default function SendMessageForm() {
  const { toast } = useToast();
  const [state, dispatch] = useFormState(sendMessage, undefined);
  const [targetUsers, setTargetUsers] = useState<string | undefined>(undefined);
  const [file, setfile] = useState<File | undefined>();

  useEffect(() => {
    if (state && state?.message) {
      toast({
        description: state?.message || 'Successful',
        variant: state?.status !== 'failed' ? 'default' : 'destructive',
      });
    }
    // if (state?.status === 'success') {
    //   setIsOpen(false);
    // }
  }, [state, toast]);

  return (
    <div className='bg-background rounded-xl py-6 px-5 lg:px-10 w-full max-w-[34.438rem] text-base shadow-lg'>
      <div className='max-w-[430px] mx-auto'>
        <h2 className='text-2xl text-center font-semibold mb-4'>
          Send Whatsapp message{' '}
        </h2>
        <form
          className='space-y-3'
          // onSubmit={handleSubmit}
          encType='multipart/form-data'
          action={dispatch}
        >
          <div className='form-control max-w-[400px]'>
            <label
              htmlFor='userType'
              className='!text-base'
            >
              Select Target Users
            </label>

            <Select
              name='userType'
              value={targetUsers}
              onValueChange={setTargetUsers}
            >
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder='Target user'
                  id='userType'
                />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {state?.errors?.userType ? (
              <div
                id='userType-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.userType[0]}</p>
              </div>
            ) : null}
          </div>
          {targetUsers === 'CUSTOM' && (
            <div className='form-control max-w-[400px]'>
              <label
                htmlFor='userType'
                className='!text-base'
              >
                Select File
              </label>
              <div>
                <Input
                  id='file'
                  name='file'
                  type='file'
                  accept='.csv'
                />
                <span className='text-xs italic'>
                  Only .csv file will be accepted
                </span>
              </div>
            </div>
          )}

          <div className='form-control max-w-[400px]'>
            <label
              htmlFor='userType'
              className='!text-base'
            >
              Select Message Type
            </label>

            <Select name='messageType'>
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder='Message Type'
                  id='messageType'
                />
              </SelectTrigger>
              <SelectContent>
                {messageTypes.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {state?.errors?.messageType ? (
              <div
                id='message-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.messageType[0]}</p>
              </div>
            ) : null}
          </div>

          <div className='form-control max-w-[400px]'>
            <label
              htmlFor='message'
              className='!text-base'
            >
              Message
            </label>
            <div className='relative'>
              <Textarea
                placeholder='Enter message...'
                id='message'
                name='message'
                className='!text-base'
              />
            </div>
            {state?.errors?.message ? (
              <div
                id='message-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.message[0]}</p>
              </div>
            ) : null}
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
