import React from 'react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import SelectFormat from '@/components/select-format';
import SelectQuality from '@/components/select-quality';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <div className="flex min-h-[calc(100vh-8rem)] flex-col gap-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">Konvert to</h1>
              <SelectFormat />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">in</h1>
              <SelectQuality />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Drop files or pick manually
              </h3>
              <p className="text-sm text-muted-foreground">Max size 100MB</p>
              <Button className="mt-4">Choose Files</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
