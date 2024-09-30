import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateResidentForm from "@/components/admin/residents/update-form";
import { GetResidentById } from "@/lib/actions/residents";

export default async function UpdateEvent({
  params,
}: {
  params: { id: string };
}) {
  const event = await GetResidentById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Resident</h1>
      <div className="mt-5">
        <UpdateResidentForm item={event} />
      </div>
    </div>
  );
}
