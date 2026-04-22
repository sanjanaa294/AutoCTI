import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useThreatStore } from '@/stores/threatStore';
import { AlertTriangle, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';

export const ThreatKPICards = () => {
  const { threats, stats } = useThreatStore();

  // Calculate threats in last hour
  const threatsLastHour = useMemo(() => {
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return threats.filter(threat => new Date(threat.timestamp) >= hourAgo).length;
  }, [threats]);

  // Prepare time series data (last 24 hours)
  const timeSeriesData = useMemo(() => {
    const now = new Date();
    const data = [];
    
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourStart = new Date(hour);
      hourStart.setMinutes(0, 0, 0);
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);
      
      const hourThreats = threats.filter(threat => {
        const threatTime = new Date(threat.timestamp);
        return threatTime >= hourStart && threatTime < hourEnd;
      });

      const critical = hourThreats.filter(t => t.severity === 'critical').length;
      const high = hourThreats.filter(t => t.severity === 'high').length;
      const medium = hourThreats.filter(t => t.severity === 'medium').length;
      const low = hourThreats.filter(t => t.severity === 'low').length;

      data.push({
        time: hourStart.getHours().toString().padStart(2, '0') + ':00',
        timestamp: hourStart.getTime(),
        total: hourThreats.length,
        critical,
        high,
        medium,
        low
      });
    }
    
    return data;
  }, [threats]);

  const kpiCards = [
    {
      title: 'Total Threats',
      value: stats.total,
      description: 'All time detections',
      icon: AlertTriangle,
      trend: threatsLastHour > 0 ? `+${threatsLastHour} last hour` : 'No new threats',
      color: 'text-primary'
    },
    {
      title: 'Last Hour',
      value: threatsLastHour,
      description: 'Recent detections',
      icon: Clock,
      trend: 'Real-time monitoring',
      color: 'text-warning'
    },
    {
      title: 'Critical Threats',
      value: stats.critical,
      description: 'Immediate attention required',
      icon: AlertTriangle,
      trend: stats.critical > 0 ? 'Action required' : 'All clear',
      color: 'text-destructive'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      description: 'Successfully handled',
      icon: CheckCircle2,
      trend: `${((stats.resolved / Math.max(stats.total, 1)) * 100).toFixed(1)}% resolution rate`,
      color: 'text-success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{card.trend}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Time Series Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Threat Activity (24h)</span>
          </CardTitle>
          <CardDescription>
            Threat detections over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-sm" style={{ color: entry.color }}>
                              {entry.name}: {entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="critical" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Critical"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="high" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="High"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="medium" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Medium"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="low" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  name="Low"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};