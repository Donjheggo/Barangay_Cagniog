import { createClient } from "@/lib/supabase/server";
import CreateDialog from "@/components/user/reports/create-dialog";
import ReportCard from "@/components/user/reports/report-card";
import { GetMyReports } from "@/lib/actions/reports";

export default async function Report() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const response = await GetMyReports(userData.user?.id || "");

  return (
    <div className="container mx-auto max-w-screen-sm">
      <CreateDialog />
      {response?.map((item, index) => (
        <ReportCard key={index} item={item} />
      ))}
    </div>
  );
}
