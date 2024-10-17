"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateReport } from "@/lib/actions/reports";
import { toast } from "react-toastify";
import { useUser } from "@/context/user-context";
import { useState, useEffect } from "react";
import { Tables } from "@/database.types";
import { GetAllResidents } from "@/lib/actions/residents";

export default function CreateDialog() {
  const [residents, setResidents] = useState<ResidentsT[]>([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const data = await GetAllResidents();
      if (data) setResidents(data);
    };

    fetchResidents();
  }, []);

  const { user, loading } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("resident_id") || !formData.get("reason")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    try {
      const { error } = await CreateReport(formData);
      if (error) {
        toast.error(error.toString());
      }
    } catch (error) {
      toast.error("There was an unexpected error creating the report.");
    }
  };

  if (loading) return;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="default"
          className="flex items-center w-full"
        >
          Create New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Report</DialogTitle>
            <DialogDescription>
              Complete the fields and hit create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resident_id" className="text-right">
                Resident
              </Label>
              <div className="col-span-3">
                <Select name="resident_id">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Resident" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {residents.map((item, index) => (
                        <SelectItem key={index} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <input name="user_id" defaultValue={user?.id} hidden />
              <Textarea
                name="reason"
                id="reason"
                placeholder="Write your reason here"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type ResidentsT = Tables<"residents">;
