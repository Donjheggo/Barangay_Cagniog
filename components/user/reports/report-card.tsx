import { Tables } from "@/database.types";

export default function ReportCard({ item }: { item: ReportsT }) {
  console.log(item);
  return (
    <div className="grid grid-cols-2 p-4 border mt-2 rounded-lg">
      <h1>Resident: {item.resident_id.name}</h1> <br />
      <h1>Reason: {item.reason}</h1> <br />
      <h1>Status: {item.status === 'ON_GOING' ? "On Going" : item.status === 'COMPLETED' ? 'Completed' : 'Rejected'}</h1> <br />
      <h1>
        Submitted: {new Date(item.created_at).toLocaleDateString()} -{" "}
        {new Date(item.created_at).toLocaleTimeString()}
      </h1>
    </div>
  );
}

type ResidentT = Tables<"residents">;

export type ReportsT = {
  created_at: string;
  id: string;
  status: "ON_GOING" | 'REJECTED' | "COMPLETED";
  reason: string | null;
  resident_id: ResidentT;
  user_id: string | null;
};
