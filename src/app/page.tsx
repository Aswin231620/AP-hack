'use client';

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Zap,
  ShieldCheck,
  ShieldAlert,
  History,
  Activity,
  Ruler,
} from 'lucide-react';

import type { SensorData, HistoryLogEntry } from '@/lib/types';

import { DashboardHeader } from '@/components/dashboard/header';
import { StatusIndicator } from '@/components/dashboard/status-indicator';
import { DataCard } from '@/components/dashboard/data-card';
import { HistoryLog } from '@/components/dashboard/history-log';
import { DailyIntrusionsChart } from '@/components/dashboard/daily-intrusions-chart';
import { IntrusionTrendsChart } from '@/components/dashboard/intrusion-trends-chart';
import { SpeciesIdentifier } from '@/components/dashboard/species-identifier';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const generateMockData = (): SensorData => {
  const isAnimalDetected = Math.random() > 0.8; // 20% chance of detection
  return {
    isAnimalDetected,
    distance: isAnimalDetected ? Math.floor(Math.random() * (450 - 50 + 1)) + 50 : 0,
    repellentStatus: isAnimalDetected ? 'ACTIVE' : 'IDLE',
    timestamp: Date.now(),
  };
};

export default function Home() {
  const { toast } = useToast();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<HistoryLogEntry[]>([]);
  const [alertSentForCurrentEvent, setAlertSentForCurrentEvent] = useState(false);
  const [dailyIntrusions, setDailyIntrusions] = useState(
    Array(7).fill(0).map((_, i) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date().getDay() - 6 + i + 7) % 7],
      intrusions: Math.floor(Math.random() * 5),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      setSensorData(newData);

      if (newData.isAnimalDetected) {
        if (!alertSentForCurrentEvent) {
          const newEntry: HistoryLogEntry = {
            id: newData.timestamp.toString(),
            timestamp: newData.timestamp,
            status: 'INTRUSION DETECTED',
            distance: newData.distance,
          };
          setHistory(prev => [newEntry, ...prev].slice(0, 10));

          toast({
            variant: "destructive",
            title: "🚨 Intrusion Alert!",
            description: `Animal detected at ${newData.distance} cm.`,
          });
          setAlertSentForCurrentEvent(true);
          
          setDailyIntrusions(prev => {
            const today = new Date().getDay();
            const dayIndex = (today + 6) % 7; // Convert Sunday=0 to Sat=6
            const newDaily = [...prev];
            newDaily[dayIndex].intrusions += 1;
            return newDaily;
          });
        }
      } else {
        if (alertSentForCurrentEvent) {
           setAlertSentForCurrentEvent(false);
        }
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [toast, alertSentForCurrentEvent]);

  const lastDetection = history.find(entry => entry.status === 'INTRUSION DETECTED');
  const isDetected = sensorData?.isAnimalDetected ?? false;

  return (
    <main className="min-h-screen bg-muted/20 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <Card className="xl:col-span-1 flex flex-col items-center justify-center p-6 bg-card">
            <StatusIndicator isDetected={isDetected} />
            <div className="text-center mt-4">
              <p className={`text-3xl font-bold ${isDetected ? 'text-destructive' : 'text-primary'}`}>
                {isDetected ? 'INTRUSION' : 'ALL CLEAR'}
              </p>
              <p className="text-muted-foreground">Live System Status</p>
            </div>
          </Card>
          
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-6 xl:col-span-2">
             <DataCard 
              title="System Status"
              icon={isDetected ? ShieldAlert : ShieldCheck}
              value={isDetected ? 'Active Defense' : 'Monitoring'}
              loading={!sensorData}
              variant={isDetected ? 'destructive' : 'default'}
            />
            <DataCard 
              title="Repellent"
              icon={Zap}
              value={sensorData?.repellentStatus ?? null}
              loading={!sensorData}
            />
            <DataCard 
              title="Detection Distance" 
              icon={Ruler} 
              value={sensorData?.isAnimalDetected ? sensorData.distance : 'N/A'}
              unit="cm"
              loading={!sensorData} 
            />
            <DataCard 
              title="Last Intrusion" 
              icon={History} 
              value={lastDetection ? new Date(lastDetection.timestamp).toLocaleTimeString() : 'None today'}
              loading={!sensorData} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
             <SpeciesIdentifier />
            <HistoryLog logs={history} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <DailyIntrusionsChart data={dailyIntrusions} />
            <IntrusionTrendsChart />
          </div>
        </div>
      </div>
    </main>
  );
}
