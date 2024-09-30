"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { UpdateResident } from "@/lib/actions/residents";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { PuroksT } from "./create-dialog";
import { GetPuroks } from "@/lib/actions/purok";

export default function UpdateResidentForm({ item }: { item: ResidentT }) {
  const router = useRouter();
  const [puroks, setPuroks] = useState<PuroksT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPuroks = async () => {
      const data = await GetPuroks();
      if (data) setPuroks(data);
    };

    fetchPuroks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("name") ||
      !formData.get("purok_id") ||
      !formData.get("gender") ||
      !formData.get("birthdate")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateResident(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/residents");
    } catch (error) {
      toast.error("There was an unexpected error updating resident.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
          <Input
            name="name"
            id="name"
            type="text"
            placeholder=""
            required
            defaultValue={item.name}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="purok_id">Purok</Label>
          <Select name="purok_id" defaultValue={item.purok_id.id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Purok" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {puroks?.map((purok, index) => (
                  <SelectItem key={index} value={purok.id}>
                    {purok.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gender">Purok</Label>
          <Select name="gender" defaultValue={item.gender}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Purok" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="birthdate">Birthdate</Label>
          <Input
            name="birthdate"
            id="birthdate"
            type="date"
            placeholder=""
            required
            defaultValue={new Date(item.birthdate).toISOString().split("T")[0]}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

type ResidentT = {
  id: string;
  name: string;
  purok_id: PuroksT;
  birthdate: Date;
  gender: "MALE" | "FEMALE";
};
