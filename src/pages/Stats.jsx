import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useTimeline } from '../context/TimelineContext';
import { TrendingUp } from 'lucide-react';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

const COLORS = {
  call: '#244D3F',
  text: '#7E35E1',
  video: '#37A163',
  meetup: '#f59e0b',
};

const TYPE_META = [
  { type: 'call', label: 'Call', img: callIcon },
  { type: 'text', label: 'Text', img: textIcon },
  { type: 'video', label: 'Video', img: videoIcon },
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Stats() {
  const { entries } = useTimeline();

  const counts = entries.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([type, value]) => ({
    name: capitalize(type),
    value,
    type,
  }));

  const total = entries.length;

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-[#1F2937]">
            Friendship Analytics
          </h1>
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">
                By Interaction Type
              </h2>
              <p className="text-xs text-gray-400">
                {total} total interactions logged
              </p>
            </div>
          </div>

          {total === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <TrendingUp size={48} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">No data yet.</p>
              <p className="text-sm mt-1">
                Log some check-ins from a friend's page.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-5">
              {/* Pie Chart */}
              <div className="w-full lg:w-72 h-72 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      cornerRadius={10}
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                      label={renderLabel}
                    >
                      {chartData.map(entry => (
                        <Cell
                          key={entry.type}
                          fill={COLORS[entry.type] || '#94a3b8'}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val, name) => [`${val} interactions`, name]}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        fontSize: 13,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex space-x-6">
                <h4 className="flex items-center gap-2 text-base text-gray-600">
                  <div className="w-3 h-3 bg-[#7E35E1] rounded-full z-50"></div>
                  Text
                </h4>
                <h4 className="flex items-center gap-2 text-base text-gray-600">
                  <div className="w-3 h-3 bg-[#244D3F] rounded-full z-50"></div>
                  Call
                </h4>
                <h4 className="flex items-center gap-2 text-base text-gray-600">
                  <div className="w-3 h-3 bg-[#37A163] rounded-full z-50"></div>
                  Video
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
