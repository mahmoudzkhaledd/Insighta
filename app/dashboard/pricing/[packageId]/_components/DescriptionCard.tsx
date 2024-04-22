import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, PackageAdvantage } from "@prisma/client";
import { Check, X } from "lucide-react";

export default function DescriptionCard({ pkg }: { pkg: Package & { advantages: PackageAdvantage[] } }) {
    return (
        <Card>
            <CardHeader className=" font-bold text-lg p-4">Package details</CardHeader>
            <CardContent>
                <h2 className=" font-semibold  text-lg">Description</h2>
                <p className="mt-2  mb-4 text-gray-400">{pkg.fullDescription}</p>
                <h2 className=" font-semibold text-lg">Advantages</h2>
                <Table >
                    <TableHeader>
                        <TableRow>
                            <TableHead>Advantage</TableHead>
                            <TableHead>Availability</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            pkg.advantages.map((e, idx) => <TableRow key={idx}>
                                <TableCell className="font-medium">{e.text}</TableCell>
                                <TableCell>
                                    {
                                        e.active ? <Check /> : <X />
                                    }
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
