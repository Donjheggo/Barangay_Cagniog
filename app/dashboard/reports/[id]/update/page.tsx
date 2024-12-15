import { ArrowLeft } from "lucide-react";
import { GetReportById } from "@/lib/actions/reports";
import UpdateReportForm from "@/components/admin/reports/update-form";
import Link from "next/link";

export default async function UpdateReport({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetReportById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Report</h1>
      <div className="mt-5">
        <UpdateReportForm item={item} />
      </div>
    </div>
  );
}
