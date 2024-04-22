import { prisma } from "@/lib/db"
import AddPackageForm from "../../_components/AddPackageForm";
import NotFoundComponent from "@/components/General/NotFoundComponent";
import { Package } from "lucide-react";
export default async function UpdatePackagePage({ params }: { params: { packageId: string; } }) {
    const pkg = await prisma.package.findUnique({
        where: {
            id: params.packageId,
        },
        include: {
            advantages: true,
        }
    });
    if (pkg == null) {
        return <NotFoundComponent
            title="Package not found"
            icon={Package}
            subTitle="Package not found, Please try again or see the errors logs"
        />
    }
    return (
        <div>
            <AddPackageForm pkgUpdate={JSON.parse(JSON.stringify(pkg))} />
        </div>
    )
}
