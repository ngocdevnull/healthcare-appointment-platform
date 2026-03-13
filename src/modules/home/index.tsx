"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button, Input, Label, Checkbox, Notice, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, DynamicDialog } from "@ui";

export function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenericDialogOpen, setIsGenericDialogOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm sm:items-start text-center sm:text-left">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Healthcare Appointment Platform (Home)
        </h1>

        <div className="flex flex-col w-full gap-6 mt-6">
          <Notice variant="info">
            Welcome to the Healthcare Appointment Platform! Please sign in to book your next visit.
          </Notice>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            <Button variant="default">Primary Action</Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Open Dialog Demo</Button>
            <Button variant="outline" onClick={() => setIsGenericDialogOpen(true)}>Open Generic Content</Button>
            <Button asChild variant="secondary">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </main>

      <DynamicDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Are you sure?"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-1/2">
              No
            </Button>
            <Button variant="default" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-1/2 bg-[#6D63E5] hover:bg-[#5b52c0]">
              Yes
            </Button>
          </>
        }
      >
        <Notice
          variant="warning"
          icon={<AlertTriangle className="h-5 w-5 !text-[#F59E0B]" />}
          className="mb-2"
        >
          Following processes will be canceled.
          <br />
          This operation can&apos;t be undone
        </Notice>
        <Select>
          <SelectTrigger className="w-full bg-zinc-50 h-12">
            <SelectValue placeholder="Doctor not available" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not-available">Doctor not available</SelectItem>
            <SelectItem value="patient-canceled">Patient canceled</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </DynamicDialog>
      <DynamicDialog
        open={isGenericDialogOpen}
        onOpenChange={setIsGenericDialogOpen}
        title="Free Content Demo"
        footer={
          <Button variant="default" onClick={() => setIsGenericDialogOpen(false)} className="w-full sm:w-auto">
            Got it, thanks!
          </Button>
        }
      >
        <p className="text-gray-600 mb-2">
          This is a secondary dialog demonstrating how flexible the <strong>DynamicDialog</strong> wrapper is!
        </p>
        <div className="bg-zinc-100 p-4 rounded-md border text-sm text-gray-500 font-mono">
          You can toss literally any valid JSX component into the children block of this component.
          It does not need to just be notices and inputs!
        </div>
      </DynamicDialog>
    </div>
  );
}
