'use client';
import { Input } from '../ui/input';
import { Permissions, Roles } from '@/types/user';
import { Checkbox } from '../ui/checkbox';
import { createRole, editRole } from '@/app/actions/roles';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
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
      <span>{isEditing ? 'Edit' : 'Create'} Role</span>
    </Button>
  );
}

export default function RolesForm({
  permissions,
  role,
  isEditing = false,
  id,
}: {
  permissions: Permissions[];
  role?: Roles;
  isEditing?: boolean;
  id?: string;
}) {
  const initalState = {
    message: null,
    errors: {},
    status: '',
    id,
  };
  const formAction = isEditing ? editRole : createRole;
  const [state, dispatch] = useFormState(formAction, initalState);

  return (
    <div>
      <form
        className='space-y-6'
        action={dispatch}
      >
        <div className='form-control max-w-[400px]'>
          <label
            htmlFor='title'
            className='!text-base'
          >
            Title
          </label>
          <Input
            id='title'
            name='title'
            type='text'
            placeholder='Enter title'
            defaultValue={role?.title}
          />
          {state?.errors?.title ? (
            <div
              id='title-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.title[0]}</p>
            </div>
          ) : null}
        </div>
        <div className='form-control'>
          <h4 className='text-foreground text-base font-medium'>Permissions</h4>
          <div className='grid md:grid-cols-3 gap-4 mt-4'>
            {permissions?.map((permission, index) => (
              <div
                key={index}
                className='flex flex-row items-start space-x-3 space-y-0'
              >
                <Checkbox
                  name='permissions'
                  id={permission.code}
                  value={permission.code}
                  defaultChecked={
                    role?.permissions &&
                    role.permissions.includes(permission.code)
                  }
                />
                <label
                  htmlFor={permission.code}
                  className='!text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
          {state?.errors?.permissions ? (
            <div
              id='permission-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.permissions[0]}</p>
            </div>
          ) : null}
        </div>

        <SubmitButton isEditing={isEditing} />
      </form>
    </div>
  );
}
