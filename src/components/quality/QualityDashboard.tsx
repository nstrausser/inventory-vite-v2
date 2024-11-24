import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { QualityMetrics } from '@/types/quality';

// Theme-consistent chart colors
const CHART_COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  accent: 'hsl(var(--accent))',
  muted: 'hsl(var(--muted))',
  success: 'hsl(142 76% 36%)',
  warning: 'hsl(48 96% 53%)',
  error: 'hsl(var(--destructive))',
};

// Mock data
const mockMetrics: QualityMetrics[] = [
  {
    period: 'Last 30 Days',
    totalInstallations: 45,
    passRate: 92,
    averageDefectsPerInstall: 0.8,
    warrantyClaimRate: 2.1,
    customerSatisfactionScore: 4.7,
    topDefects: [
      { type: 'Bubbles', count: 12 },
      { type: 'Edge Lifting', count: 8 },
      { type: 'Dirt Inclusion', count: 5 },
    ],
  },
];

// Sample data for the line chart
const trendData = [
  { date: '03/01', passRate: 90, satisfaction: 4.5 },
  { date: '03/07', passRate: 88, satisfaction: 4.6 },
  { date: '03/14', passRate: 92, satisfaction: 4.7 },
  { date: '03/21', passRate: 91, satisfaction: 4.8 },
  { date: '03/28', passRate: 94, satisfaction: 4.7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === 'Pass Rate' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function QualityDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const metrics = mockMetrics[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quality Metrics</h1>
          <p className="text-muted-foreground">
            Monitor installation quality and performance
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Pass Rate</p>
            <p className="text-2xl font-bold">{metrics.passRate}%</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg Defects</p>
            <p className="text-2xl font-bold">
              {metrics.averageDefectsPerInstall.toFixed(1)}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Warranty Claims</p>
            <p className="text-2xl font-bold">{metrics.warrantyClaimRate}%</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Satisfaction</p>
            <p className="text-2xl font-bold">
              {metrics.customerSatisfactionScore}/5
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Quality Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="passRate"
                  name="Pass Rate"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS.primary, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  name="Satisfaction"
                  stroke={CHART_COLORS.success}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS.success, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Top Defects</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.topDefects}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {metrics.topDefects.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? CHART_COLORS.primary
                          : index === 1
                          ? CHART_COLORS.warning
                          : CHART_COLORS.error
                      }
                      className="stroke-background hover:opacity-80 transition-opacity"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {metrics.topDefects.map((defect, index) => (
                <div
                  key={defect.type}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full',
                        index === 0
                          ? 'bg-primary'
                          : index === 1
                          ? 'bg-[hsl(48,96%,53%)]'
                          : 'bg-destructive'
                      )}
                    />
                    <span>{defect.type}</span>
                  </div>
                  <span className="font-medium">{defect.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}