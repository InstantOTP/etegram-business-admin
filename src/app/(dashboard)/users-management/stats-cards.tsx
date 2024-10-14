import { Icons } from '@/components/icons';

const cardIcons: any = {
  totalUsers: Icons.totalUsers,
  activeUsers: Icons.activeUsers,
  pendingUsers: Icons.pendingUsers,
  restrictedUsers: Icons.restrictedUsers,
};

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: any;
}) {
  const Icon = cardIcons[type];

  return (
    <div className='p-6 bg-background shadow-sm space-y-3 rounded-[0.625rem] font-inter'>
      {Icon ? <Icon /> : null}
      <h6 className='text-sm font-semibold'>{title}</h6>
      <p className='truncate text-2xl font-medium'>{value}</p>
    </div>
  );
}
export default function StatsCard({ count }: { count?: any }) {
  // console.log(count);
  return (
    <div className='grid lg:grid-cols-4 gap-3'>
      <Card
        title='Total Users'
        type={'totalUsers'}
        value={count?.totalUsers || 0}
      />
      <Card
        title='Active Users'
        type={'activeUsers'}
        value={count?.inactiveUsers || 0}
      />
      <Card
        title='Pending Users'
        type={'pendingUsers'}
        value={0}
      />
      <Card
        title='Restricted Users'
        type={'restrictedUsers'}
        value={0}
      />
    </div>
  );
}
