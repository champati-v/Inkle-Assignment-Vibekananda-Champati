"use client";

import { useState } from "react";
import { Check, Edit, LocateIcon, MapPin, Pencil } from "lucide-react";
import { updateTaxUser } from "@/lib/api";
import { useCountries } from "@/context/CountriesContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { User } from "../tables/Columns";
import { toast } from "sonner"

type Props = {
  user: {
    id: string;
    entity: string;
    country: string;
  };
  onSuccess: (updatedUser: User) => void; 
};

const EditUserInfoModal = ({ user, onSuccess }: Props) => {
  const countries = useCountries();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.entity);
  const [country, setCountry] = useState(user.country);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await updateTaxUser(user.id, {
        entity: name,
        country,
      });
      onSuccess(updated);
      toast("User updated successfully", {
        icon: <Check className="text-[#5622FF] bg-primary/10 p-1 rounded-full" size={20} />,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gray-500 hover:text-primary transition-colors hover:bg-primary/10 p-2 rounded-md cursor-pointer"
      >
        <Edit size={16} />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">
                Name <span className="text-red-500">*</span>
              </label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-500">Country</label>

              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full relative">
                  <SelectValue />
                  <Pencil size={16} className="absolute right-10" />
                </SelectTrigger>

                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={c.name} className="flex items-center justify-between gap-2">
                      <MapPin />
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
              disabled={!name || loading}
              onClick={handleSave}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserInfoModal;
