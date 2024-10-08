import { createClient } from "@/lib/supabase/server";
import CreateDialog from "@/components/user/appointments/create-dialog";
import AppointmentCard from "@/components/user/appointments/appointment-card";
import { GetMyAppointments } from "@/lib/actions/appointment";

export default async function Report() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const response = await GetMyAppointments(userData.user?.id || "");

  return (
    <div className="container mx-auto max-w-screen-sm">
      <CreateDialog />
      {response?.map((item, index) => (
        <AppointmentCard key={index} item={item} />
      ))}
    </div>
  );
}
