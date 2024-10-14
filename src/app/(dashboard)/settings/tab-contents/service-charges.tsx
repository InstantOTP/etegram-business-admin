import { getServiceCharges } from '@/app/data/settings';
import { UpdateServiceCharge } from '@/components/modals/service-charge';
import { formatter } from '@/lib/utils';

export default async function ServiceCharges() {
  const serviceCharges = await getServiceCharges();
  //   console.log(serviceCharges);
  return (
    <div>
      <h3 className='font-manrope font-semibold text-foreground text-base lg:text-2xl mb-1'>
        Service charges
      </h3>

      <div className='text-base divide-y *:py-4'>
        <div>
          <h3 className='font-medium'>Minimum Withdrawal Amount</h3>
          <p>
            {serviceCharges &&
              formatter().format(serviceCharges?.minimumWithdrawalAmount)}
          </p>
        </div>
        <div>
          <h3 className='font-medium'>Referral Bonus</h3>
          <p>
            {serviceCharges &&
              formatter().format(serviceCharges?.referralBonus)}
          </p>
        </div>
        <div>
          <h3 className='font-medium'>Withdrawal Charges</h3>
          <p>
            {' '}
            {serviceCharges?.withdrawalCharges &&
              formatter().format(serviceCharges?.withdrawalCharges)}
          </p>
        </div>
      </div>

      <UpdateServiceCharge serviceCharges={serviceCharges} />
    </div>
  );
}
