import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateOfficialForm from "@/components/officials/update-form";
import { GetOfficialById } from "@/lib/actions/officials";

export default async function UpdateOfficial({
  params,
}: {
  params: { id: string };
}) {
  const official = await GetOfficialById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Official</h1>
      <div className="mt-5">
        <UpdateOfficialForm item={official} />
      </div>
    </div>
  );
}
