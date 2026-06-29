"use client";

import IPTVPlayer from "@/components/IPTVPlayer";
import { Radio } from "lucide-react";

export default function IndianBanglaPage() {
  return (
    <IPTVPlayer
      type="indian-bangla"
      title="Indian Bangla TV"
      description="Live Bengali channels from India"
      icon={<Radio className="w-5 h-5 text-white" />}
      accentColor="from-purple-500 to-pink-500"
    />
  );
}
