import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import UserPreference from './tab-contents/preferences';
import { getUser } from '@/app/data/user';
import PersonalDetailsForm from '@/components/forms/personal-details';
import ServiceCharges from './tab-contents/service-charges';
import { User } from '@/components/layouts/dashboard-header';

export default async function SettingsPage() {
  const user: any = await getUser();
  return (
    <section className='w-full'>
      <Tabs
        defaultValue='account'
        className='w-full bg-background max-w-[72.5rem] rounded-2xl'
      >
        <TabsList>
          <TabsTrigger value='account'>Admin Profile</TabsTrigger>
          {user?.role?.permissions?.includes('GETCONFIG') && (
            <TabsTrigger value='charges'>Service Charges</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value='account'>
          <PersonalDetailsForm user={user} />
        </TabsContent>
        {user?.role?.permissions?.includes('GETCONFIG') && (
          <TabsContent value='charges'>
            <ServiceCharges />
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
}
