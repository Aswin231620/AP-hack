'use client';

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Zap,
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
import { Card } from '@/components/ui/card';

const generateMockData = (): SensorData => {
  const isAnimalDetected = Math.random() > 0.8; // 20% chance of detection
  return {
    isAnimalDetected,
    distance: isAnimalDetected ? Math.floor(Math.random() * (450 - 50 + 1)) + 50 : 0,
    servoStatus: isAnimalDetected ? 'ON' : 'OFF',
    vibratorStatus: isAnimalDetected ? 'ON' : 'OFF',
    timestamp: Date.now(),
  };
};

export default function Home() {
  const { toast } = useToast();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<HistoryLogEntry[]>([]);
  const [alertSentForCurrentEvent, setAlertSentForCurrentEvent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      setSensorData(newData);

      if (newData.isAnimalDetected) {
        setHistory(prev => [
          {
            id: newData.timestamp.toString(),
            timestamp: newData.timestamp,
            status: 'INTRUSION DETECTED',
            distance: newData.distance,
          },
          ...prev,
        ].slice(0, 50)); // Keep last 50 entries

        if (!alertSentForCurrentEvent) {
          toast({
            variant: "destructive",
            title: "🚨 Intrusion Alert!",
            description: `Animal detected at ${newData.distance} cm.`,
          });
          setAlertSentForCurrentEvent(true);
        }
      } else {
        if (alertSentForCurrentEvent) {
          // Add a "SAFE" entry when the status changes from detected to not detected
          setHistory(prev => [
            {
              id: newData.timestamp.toString(),
              timestamp: newData.timestamp,
              status: 'SAFE',
              distance: null,
            },
            ...prev,
          ].slice(0, 50));
          setAlertSentForCurrentEvent(false);
        }
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [toast, alertSentForCurrentEvent]);

  const lastDetection = history.find(entry => entry.status === 'INTRUSION DETECTED');

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex items-center justify-center p-6 min-h-[260px] bg-card/50">
                <StatusIndicator isDetected={sensorData?.isAnimalDetected ?? false} />
              </Card>
              <div className="grid grid-cols-2 gap-6">
                <DataCard 
                  title="Distance" 
                  icon={Ruler} 
                  value={sensorData?.isAnimalDetected ? sensorData.distance : null}
                  unit="cm"
                  loading={!sensorData} 
                />
                <DataCard 
                  title="Last Detection" 
                  icon={History} 
                  value={lastDetection ? new Date(lastDetection.timestamp).toLocaleTimeString() : 'N/A'}
                  loading={!sensorData} 
                />
                <DataCard 
                  title="Servo Status" 
                  icon={Activity}
                  value={sensorData?.servoStatus ?? null}
                  loading={!sensorData} 
                />
                <DataCard 
                  title="Vibration Status" 
                  icon={Zap}
                  value={sensorData?.vibratorStatus ?? null}
                  loading={!sensorData} 
                />
              </div>
            </div>
            <HistoryLog logs={history} />
          </div>

          {/* Side content area */}
          <div className="lg:col-span-2 space-y-6">
            <SpeciesIdentifier />
            <DailyIntrusionsChart />
            <IntrusionTrendsChart />
          </div>

        </div>
      </div>
    </main>
  );
}
