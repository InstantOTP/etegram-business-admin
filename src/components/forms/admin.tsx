'use client';
import { updateProfile } from '@/app/actions/profile';
import { useToast } from '@/components/ui/use-toast';
import { useRef, useState, useMemo } from 'react';
import { useFormState } from 'react-dom';
import { Input } from '../ui/input';
import { Roles } from '@/types/user';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminForm({ roles }: { roles: Roles[] }) {
  const initalState = { message: null, errors: {} };
  const { toast } = useToast();
  const [state, dispatch] = useFormState(updateProfile, undefined);
  const [viewPassword, setViewPassword] = useState(false);

  const adminRoles = useMemo(() => {
    return roles?.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  }, [roles]);
  //   console.log(state);

  const formRef = useRef<HTMLFormElement>(null);

  //   useEffect(() => {
  //     if (state && state?.message) {
  //       toast({
  //         description: state?.message || 'Registrations Successful',
  //         variant: state?.status !== 'failed' ? 'default' : 'destructive',
  //       });
  //     }
  //   }, [state, toast]);
  return (
    <div className=''>
      <div className=''>
        <form
          //   action={dispatch}
          ref={formRef}
          className='w-full space-y-3 lg:space-y-8'
        >
          <div className='space-y-4'>
            <h3 className='font-manrope font-semibold text-foreground text-base lg:text-2xl mb-1'>
              Profile
            </h3>

            <p className='text-base text-light'>
              This information will be displayed on your profile
            </p>

            <div className='form-control'>
              <label
                htmlFor='firstName'
                className='!text-base'
              >
                Firstname
              </label>
              <Input
                id='firstname'
                name='firstname'
                type='text'
                placeholder='Enter your firstname'
                disabled
              />
              {state?.errors?.firstname ? (
                <div
                  id='firstname-error'
                  aria-live='polite'
                  className='error'
                >
                  {state.errors.firstname.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className='form-control'>
              <label
                htmlFor='lastname'
                className='!text-base'
              >
                Lastname
              </label>
              <Input
                id='lastname'
                name='lastname'
                type='text'
                placeholder='Enter your Lastname'
                disabled
              />
              {state?.errors?.lastname ? (
                <div
                  id='username-error'
                  aria-live='polite'
                  className='error'
                >
                  {state.errors.lastname.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
            <div className='form-control'>
              <label
                htmlFor='email'
                className='!text-base'
              >
                Email Address
              </label>
              <Input
                id='email'
                name='email'
                //   type='email'
                placeholder='Enter your email address'
                disabled
              />
              {state?.errors?.email ? (
                <div
                  id='amount-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.email[0]}</p>
                  {/* {state.errors.email.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))} */}
                </div>
              ) : null}
            </div>

            <div className='form-control'>
              <label
                htmlFor='phone'
                className='!text-base'
              >
                Phone
              </label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='e.g 08012345678'
                disabled
              />
              {state?.errors?.phone ? (
                <div
                  id='phone-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.phone[0]}</p>
                  {/* {state.errors.email.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))} */}
                </div>
              ) : null}
            </div>

            <div className='form-control max-w-[400px]'>
              <label
                htmlFor='role'
                className='!text-base'
              >
                Select Role
              </label>

              <Select name='role'>
                <SelectTrigger className='w-full'>
                  <SelectValue
                    placeholder='Message Type'
                    id='messageType'
                  />
                </SelectTrigger>
                <SelectContent>
                  {adminRoles.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* {state?.errors?.messageType ? (
                <div
                  id='message-error'
                  aria-live='polite'
                  className='error'
                >
                  <p>{state.errors.messageType[0]}</p>
                </div>
              ) : null} */}
            </div>
          </div>

          {/* <div className='!mt-14'>
            <SubmitButton />
          </div> */}
        </form>
      </div>
    </div>
  );
}
