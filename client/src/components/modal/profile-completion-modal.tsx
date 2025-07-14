'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

type ProfileCompletionModalProps = {
  onClose: () => void;
};

export default function ProfileCompletionModal({ onClose }: ProfileCompletionModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please complete your profile before applying to jobs.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button asChild>
            <Link href="/profile">Complete Profile</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
