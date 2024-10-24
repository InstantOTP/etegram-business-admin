'use client';
import { useToast } from '@/components/ui/use-toast';
import { updateUseCase } from '@/app/actions/generics';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useCasesType } from './page';

export function UpdateStatus({ useCase }: { useCase: useCasesType }) {
  const { toast } = useToast();
  async function updateStatus() {
    const valueToSubmit = useCase?.active ? 'false' : 'true';
    const formData = new FormData();
    formData.append('active', valueToSubmit);

    const data = await updateUseCase(
      { id: useCase?.id, statusOnly: true },
      formData
    );
    toast({
      description: data?.message,
      variant: data?.status === 'success' ? 'default' : 'destructive',
    });
  }

  return (
    <DropdownMenuItem
      onClick={updateStatus}
      className='flex space-x-3 py-3 px-3.5 font-inter !text-xs'
    >
      <span>{useCase?.active ? 'Deactivate' : 'Activate'} Use Case</span>
    </DropdownMenuItem>
  );
}
