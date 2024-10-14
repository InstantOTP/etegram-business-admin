import {
  Profile2User,
  ProfileTick,
  ProfileDelete,
  Profile,
} from 'iconsax-react';

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  totalUsers: (props: IconProps) => (
    <div className='w-9 h-9 bg-accent rounded-full flex justify-center items-center'>
      <Profile2User className='text-primary w-5 h-5' />
    </div>
  ),
  activeUsers: (props: IconProps) => (
    <div className='w-9 h-9 bg-[#0D99311A] rounded-full flex justify-center items-center'>
      <ProfileTick className='text-[#0D9931] w-5 h-5' />
    </div>
  ),
  pendingUsers: (props: IconProps) => (
    <div className='w-9 h-9 bg-[#FFD2431A] rounded-full flex justify-center items-center'>
      <Profile className='text-[#FFD243] w-5 h-5' />
    </div>
  ),
  restrictedUsers: (props: IconProps) => (
    <div className='w-9 h-9 bg-[#EC0E0E1A] rounded-full flex justify-center items-center'>
      <ProfileDelete className='text-[#EC0E0E] w-5 h-5' />
    </div>
  ),
};
