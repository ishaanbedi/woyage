"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="text-sm">Forgot Password?</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password?</DialogTitle>
            <DialogDescription>No worries, we got you!</DialogDescription>
          </DialogHeader>
          <div className=" text-center">
            Just email us at{" "}
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
              className="underline"
            >
              {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
            </Link>{" "}
            and we'll help you reset your password.
            {/* <Label htmlFor="email">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button>Send Reset Link</Button> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
