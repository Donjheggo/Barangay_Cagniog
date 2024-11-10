"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { CreateGcashNumber } from "@/lib/actions/payment-method";

export default function CreateGcashDialog() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("number")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    try {
      const { error } = await CreateGcashNumber(formData);
      if (error) {
        toast.error(`Error: ${error}`);
      }
    } catch (error) {
      toast.error("There was an unexpected error creating.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <Plus size={18} className="mr-2" /> GCASH Number
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add GCASH Number</DialogTitle>
            <DialogDescription>
              Complete the fields and hit create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                name="number"
                id="number"
                type="number"
                placeholder=""
                className="col-span-4"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
