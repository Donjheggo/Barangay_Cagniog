import { Tables } from "@/database.types";
import { Badge } from "@/components/ui/badge";
import GeneratePDFButton from "./generate-pdf-button";

export default function AppointmentCard({ item }: { item: AppointmentsT }) {
  return (
    <div className="p-4 border mt-2 rounded-lg">
      <div className="flex justify-between">
        <h1>Resident: {item.resident_id.name}</h1>
        {(item.status === "ACCEPTED" || item.status === "COMPLETED") && (
          <GeneratePDFButton item={item} />
        )}
      </div>
      <h1>Service: {item.service_id.name}</h1>
      <h1>Quantity: {item.quantity || 1}</h1>
      <h1>Price: ₱{item.service_id.price}</h1>
      <h1>Total Price: ₱{item.service_id.price * item.quantity}</h1>
      <h1>Date: {item.date && new Date(item.date).toDateString()}</h1>
      <h1>
        Submitted: {new Date(item.created_at).toLocaleDateString()} -{" "}
        {new Date(item.created_at).toLocaleTimeString()}
      </h1>
      <h1>
        Status: <Badge variant="default"> {item.status} </Badge>
      </h1>{" "}
    </div>
  );
}

export type AppointmentsT = {
  id?: string;
  resident_id: ResidentT;
  service_id: ServiceT;
  date: Date;
  created_at: Date;
  quantity: number;
  total_amount: number;
  payment_method: "ON_OFFICE" | "GCASH";
  status: "PENDING" | "ACCEPTED" | "COMPLETED";
};

type ResidentT = Tables<"residents">;
type ServiceT = Tables<"services">;
