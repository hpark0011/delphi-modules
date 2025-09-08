"use client";

import { Lock } from "lucide-react";

export function ActionsTab() {
  return (
    <div className='py-12 text-center'>
      <Lock className='h-12 w-12 mx-auto mb-4' />
      <p className='text-lg font-medium mb-2'>Actions Analytics</p>
      <p className='text-sm'>This feature is locked</p>
    </div>
  );
}