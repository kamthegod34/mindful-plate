
import { ArrowLeft, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Notifications = () => {
  return (
    <div className="min-h-screen bg-beige">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center gap-4 border-b border-olive/10">
        <Link to="/settings" className="text-olive hover:bg-beige-light p-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-olive">Notifications</h1>
      </header>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-olive" />
              <Label htmlFor="notifications" className="text-olive">Enable Notifications</Label>
            </div>
            <Switch id="notifications" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="push" className="text-olive">Push Notifications</Label>
            <Switch id="push" />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-olive">Pause Notifications</Label>
          <RadioGroup defaultValue="none" className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">Don't pause</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1h" id="1h" />
              <Label htmlFor="1h">1 hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4h" id="4h" />
              <Label htmlFor="4h">4 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="8h" id="8h" />
              <Label htmlFor="8h">8 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1d" id="1d" />
              <Label htmlFor="1d">1 day</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
