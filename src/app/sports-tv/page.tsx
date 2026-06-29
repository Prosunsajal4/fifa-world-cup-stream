import IPTVPlayer from "@/components/IPTVPlayer";
import { Trophy } from "lucide-react";

export const metadata = {
  title: "Sports TV - Live Streaming",
  description: "Watch live sports channels - Star Sports, Sony Ten, Sky Sports and more",
};

export default function SportsTVPage() {
  return (
    <IPTVPlayer
      type="sports"
      title="Sports TV"
      description="Live sports channels worldwide"
      icon={<Trophy className="w-5 h-5 text-white" />}
      accentColor="from-orange-500 to-red-500"
    />
  );
}
