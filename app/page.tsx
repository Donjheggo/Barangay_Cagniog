"use client";

import { useUser } from "@/context/user-context";

export default function Home() {
  const { user, loading } = useUser();
  if (loading) return;

  return (
    <div className="container max-w-[600px] mx-auto">
      <div className="flex flex-col gap-4 mt-4">
        Home Page
        <h2>4 Buttons: Residents, Officials, Set Appointment</h2>
        {user?.email}
      </div>
    </div>
  );
}
