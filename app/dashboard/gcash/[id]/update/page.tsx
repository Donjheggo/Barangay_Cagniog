import { ArrowLeft } from "lucide-react";
import { GetGcashById } from "@/lib/actions/payment-method";
import Link from "next/link";
import UpdateGcashForm from "@/components/admin/gcash/update-form";

export default async function UpdateGcash({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetGcashById(params.id);

  return (
    <div className="p-4 lg:p-6">
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateGcashForm item={item} />
      </div>
    </div>
  );
}
