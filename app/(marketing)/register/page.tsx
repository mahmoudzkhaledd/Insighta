
import ComingSoon from "@/components/General/ComingSoon";
import RegisterForm from "@/components/Auth/RegisterForm";


export default function RegisterPage({ searchParams }: { searchParams: { emailSent: string; } }) {
  
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <RegisterForm emailSent={searchParams.emailSent} />
    </div>
  );
}
