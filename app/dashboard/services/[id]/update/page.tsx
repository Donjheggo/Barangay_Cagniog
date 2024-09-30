import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateEventForm from "@/components/services/update-form";
import { GetServicesById } from "@/lib/actions/services";

export default async function UpdateEvent({
  params,
}: {
  params: { id: string };
}) {
  const event = await GetServicesById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Service</h1>
      <div className="mt-5">
        <UpdateEventForm item={event} />
      </div>
    </div>
  );
}
