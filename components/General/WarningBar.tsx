
export default function WarningBar({ children }: { children?: React.ReactNode }) {
    return (
        <div className='w-full fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-8 bg-red-500'>
            {children}
        </div>
    )
}
