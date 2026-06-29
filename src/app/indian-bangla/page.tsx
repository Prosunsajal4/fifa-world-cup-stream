import IPTVPlayer from "@/components/IPTVPlayer";
import { Radio } from "lucide-react";

export const metadata = {
  title: "Indian Bangla TV - Live Streaming",
  description: "Watch live Indian Bangla TV channels - Zee Bangla, Colors Bangla, Star Jalsha and more",
};

export default function IndianBanglaPage() {
  return (
    <IPTVPlayer
      type="bangla"
      title="Indian Bangla TV"
      description="Live Bengali channels from India"
      icon={<Radio className="w-5 h-5 text-white" />}
      accentColor="from-purple-500 to-pink-500"
    />
  );
}
