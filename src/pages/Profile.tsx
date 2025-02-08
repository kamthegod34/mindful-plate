import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Settings, Share2, Edit, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data - replace with real data later
const mockData = [
  { date: 'Mon', calories: 2100, protein: 150, carbs: 200, fats: 70, cost: 25, time: 45 },
  { date: 'Tue', calories: 2300, protein: 160, carbs: 220, fats: 75, cost: 30, time: 60 },
  { date: 'Wed', calories: 1900, protein: 140, carbs: 180, fats: 65, cost: 20, time: 30 },
  { date: 'Thu', calories: 2200, protein: 155, carbs: 210, fats: 72, cost: 28, time: 50 },
  { date: 'Fri', calories: 2000, protein: 145, carbs: 190, fats: 68, cost: 22, time: 40 },
  { date: 'Sat', calories: 2400, protein: 165, carbs: 230, fats: 78, cost: 35, time: 70 },
  { date: 'Sun', calories: 2150, protein: 152, carbs: 205, fats: 71, cost: 27, time: 55 },
];

const Profile = () => {
  const [expandedStats, setExpandedStats] = useState(false);
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [selectedMetric, setSelectedMetric] = useState<'calories' | 'macros' | 'cost' | 'time'>('calories');

  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center justify-between border-b border-olive/10">
        <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
        <Link to="/settings" className="p-2 hover:bg-beige-light rounded-full transition-colors">
          <Settings className="w-6 h-6 text-olive" />
        </Link>
      </header>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20 border-2 border-olive">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-semibold text-olive">John Doe</h2>
              <p className="text-sm text-olive/60">Healthy food enthusiast 🥗</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full text-olive border-olive hover:bg-olive/10"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
            <Button 
              variant="outline"
              className="w-full text-olive border-olive hover:bg-olive/10"
            >
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
          </div>
        </div>

        <div className="flex justify-around py-4 border-y border-olive/10">
          <div className="text-center">
            <div className="font-semibold text-olive">245</div>
            <div className="text-sm text-olive/60">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-olive">14.3k</div>
            <div className="text-sm text-olive/60">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-olive">892</div>
            <div className="text-sm text-olive/60">Following</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-olive">Food Analytics</h3>
            <button
              onClick={() => setExpandedStats(!expandedStats)}
              className="p-2 hover:bg-olive/10 rounded-full transition-colors"
            >
              {expandedStats ? (
                <ArrowUp className="w-5 h-5 text-olive" />
              ) : (
                <ArrowDown className="w-5 h-5 text-olive" />
              )}
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            {(['weekly', 'monthly', 'yearly'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? "bg-olive text-white" : "text-olive hover:bg-olive/10"}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {[
              { label: 'Calories', value: 'calories' },
              { label: 'Macros', value: 'macros' },
              { label: 'Cost', value: 'cost' },
              { label: 'Time', value: 'time' },
            ].map((metric) => (
              <Button
                key={metric.value}
                variant={selectedMetric === metric.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedMetric(metric.value as any)}
                className={selectedMetric === metric.value ? "bg-olive text-white" : "text-olive hover:bg-olive/10"}
              >
                {metric.label}
              </Button>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockData}>
                <XAxis dataKey="date" stroke="#6B8E23" />
                <YAxis stroke="#6B8E23" />
                <Tooltip 
                  contentStyle={{ background: '#F5F5DC', border: '1px solid #6B8E23' }}
                  labelStyle={{ color: '#6B8E23' }}
                />
                <Legend />
                {selectedMetric === 'calories' && (
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#6B8E23" 
                    strokeWidth={2}
                    dot={false}
                    name="Calories"
                  />
                )}
                {selectedMetric === 'macros' && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="protein" 
                      stroke="#6B8E23" 
                      strokeWidth={2}
                      dot={false}
                      name="Protein"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="carbs" 
                      stroke="#8BA756" 
                      strokeWidth={2}
                      dot={false}
                      name="Carbs"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="fats" 
                      stroke="#4A6218" 
                      strokeWidth={2}
                      dot={false}
                      name="Fats"
                    />
                  </>
                )}
                {selectedMetric === 'cost' && (
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#6B8E23" 
                    strokeWidth={2}
                    dot={false}
                    name="Cost ($)"
                  />
                )}
                {selectedMetric === 'time' && (
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#6B8E23" 
                    strokeWidth={2}
                    dot={false}
                    name="Time (min)"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {expandedStats && (
            <div className="space-y-4 animate-slide-up">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="text-sm font-medium text-olive mb-2">Protein Intake</h4>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={mockData}>
                      <Line 
                        type="monotone" 
                        dataKey="protein" 
                        stroke="#8BA756" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="text-sm font-medium text-olive mb-2">Cost</h4>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={mockData}>
                      <Line 
                        type="monotone" 
                        dataKey="cost" 
                        stroke="#4A6218" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-olive">Posts</h3>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-olive/10 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
