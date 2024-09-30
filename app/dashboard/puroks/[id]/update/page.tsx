import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdatePurokForm from "@/components/puroks/update-form";
import { GetPurokById } from "@/lib/actions/purok";

export default async function UpdatePurok({
  params,
}: {
  params: { id: string };
}) {
  const event = await GetPurokById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Purok</h1>
      <div className="mt-5">
        <UpdatePurokForm item={event} />
      </div>
    </div>
  );
}
