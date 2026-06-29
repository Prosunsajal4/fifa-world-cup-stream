"use client";

import IPTVPlayer from "@/components/IPTVPlayer";
import { Tv } from "lucide-react";

export default function BanglaBDPage() {
  return (
    <IPTVPlayer
      type="bd"
      title="Bangla BD TV"
      description="Live Bangladeshi TV channels"
      icon={<Tv className="w-5 h-5 text-white" />}
      accentColor="from-green-500 to-cyan-500"
    />
  );
}
