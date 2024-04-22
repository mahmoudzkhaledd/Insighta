import { Package } from '@prisma/client'
import { Clock, DollarSign, Globe, KeyIcon, Package2, PointerIcon, RotateCw,  User, } from 'lucide-react'
import SendRequestButton from './SendRequestComponent'
import moment from 'moment';


export default function PackageHeader({ pkg, userSubscriptionPackageId }: { pkg: Package; userSubscriptionPackageId?: string; }) {

    return (
        <div className=' space-y-9'>
            <div className='flex items-center flex-wrap justify-between gap-5'>
                <div className='flex gap-4'>
                    <div className='rounded-full w-[60px] aspect-square bg-gray-100 dark:bg-muted border flex justify-center items-center'>
                        <Package2 className='m-auto' />
                    </div>
                    <div >
                        <p className=' text-gray-400 text-sm'>Package</p>
                        <h2 className=' text-xl font-bold'>{pkg.name}</h2>
                    </div>
                </div>
                <SendRequestButton packageId={pkg.id} subscripedPackageId={userSubscriptionPackageId} />
            </div>
            <div className='flex flex-wrap items-center gap-x-[60px] gap-y-4'>
                <div>
                    <p className='mb-3 text-sm text-gray-400 '>Duration</p>
                    <div className='flex items-center gap-2'>
                        <Clock className='w-5 h-5' />
                        <div className=' capitalize'>
                            {pkg.duration}
                        </div>
                    </div>
                </div>
                <div>
                    <p className='mb-3 text-sm text-gray-400 '>Websites limit</p>
                    <div className='flex items-center gap-2'>
                        <Globe className='w-5 h-5' />
                        <div className=' capitalize'>
                           {pkg.maxWebsites}
                        </div>
                    </div>
                </div>
                <div>
                    <p className='mb-3 text-sm text-gray-400 '>Actions limit</p>
                    <div className='flex items-center gap-2'>
                        <PointerIcon className='w-5 h-5' />
                        <div className=' capitalize'>
                            {pkg.maxActions}
                        </div>
                    </div>
                </div>
                <div>
                    <p className='mb-3 text-sm text-gray-400 '>Api keys limit</p>
                    <div className='flex items-center gap-2'>
                        <KeyIcon className='w-5 h-5' />
                        {pkg.maxApiKeys}
                    </div>
                </div>
                <div>
                    <p className='mb-3 text-sm text-gray-400 '>Current users</p>
                    <div className='flex items-center gap-2'>
                        <User className='w-5 h-5' />
                        {pkg.usersCount}
                    </div>
                </div>
                <div>
                    <p className='mb-3 text-sm text-gray-400 '>Last update</p>
                    <div className='flex items-center gap-2'>
                        <RotateCw className='w-5 h-5' />
                        {
                            moment(pkg.updatedAt).fromNow()
                        }
                    </div>
                </div>
                <div>
                    <p className='mb-3 text-sm text-gray-400 '>Price</p>
                    <div className='flex items-center gap-2'>
                        <DollarSign className='w-5 h-5' />
                        {
                            pkg.afterDiscount ?? pkg.price
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
