'use client';

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';

import {
  Zap,
  ShieldCheck,
  ShieldAlert,
  History,
  Activity,
  Ruler,
} from 'lucide-react';

import type { HistoryLogEntry } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from '@/components/dashboard/header';
import { StatusIndicator } from '@/components/dashboard/status-indicator';
import { DataCard } from '@/components/dashboard/data-card';
import { HistoryLog } from '@/components/dashboard/history-log';
import { DailyIntrusionsChart } from '@/components/dashboard/daily-intrusions-chart';
import { IntrusionTrendsChart } from '@/components/dashboard/intrusion-trends-chart';
import { SpeciesIdentifier } from '@/components/dashboard/species-identifier';
import { Card, CardContent } from '@/components/ui/card';

type RealtimeData = {
    animalDetected: boolean;
    distance_cm: number;
    status: 'INTRUDER' | 'CLEAR';
};

export default function Home() {
  const { toast } = useToast();
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [history, setHistory] = useState<HistoryLogEntry[]>([]);
  const [alertSentForCurrentEvent, setAlertSentForCurrentEvent] = useState(false);
  const [dailyIntrusions, setDailyIntrusions] = useState(
    Array(7).fill(0).map((_, i) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date().getDay() - 6 + i + 7) % 7],
      intrusions: 0,
    }))
  );

  useEffect(() => {
    const cropGuardianRef = ref(database, 'CropGuardian');
    
    const unsubscribe = onValue(cropGuardianRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newData: RealtimeData = {
          animalDetected: data.animalDetected,
          distance_cm: data.distance_cm,
          status: data.status,
        };
        setRealtimeData(newData);

        if (newData.animalDetected) {
          if (!alertSentForCurrentEvent) {
            const intrusionEntry: HistoryLogEntry = {
              id: new Date().toISOString(),
              timestamp: Date.now(),
              status: 'INTRUSION DETECTED',
              distance: newData.distance_cm,
            };
            setHistory(prev => [intrusionEntry, ...prev].slice(0, 10));

            toast({
              variant: "destructive",
              title: "🚨 Intrusion Alert!",
              description: `Animal detected at ${newData.distance_cm} cm. Verification recommended.`,
            });
            setAlertSentForCurrentEvent(true);
            
            setDailyIntrusions(prev => {
              const todayIndex = new Date().getDay();
              const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              const today = days[todayIndex];

              const newDaily = [...prev];
              const dayEntry = newDaily.find(d => d.day === today);
              if(dayEntry) {
                dayEntry.intrusions += 1;
              }
              return newDaily;
            });
          }
        } else {
          if (alertSentForCurrentEvent) {
             setAlertSentForCurrentEvent(false);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [toast, alertSentForCurrentEvent]);

  const lastDetection = history.find(entry => entry.status === 'INTRUSION DETECTED');
  const isDetected = realtimeData?.animalDetected ?? false;
  const repellentStatus = isDetected ? 'ACTIVE' : 'IDLE';

  return (
    <main className="min-h-screen bg-muted/20 dark:bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <Card className="xl:col-span-1 flex flex-col items-center justify-center p-6 bg-card">
            <StatusIndicator isDetected={isDetected} />
            <div className="text-center mt-4">
              <p className={`text-4xl font-bold ${isDetected ? 'text-destructive' : 'text-primary'}`}>
                {isDetected ? 'INTRUSION' : 'ALL CLEAR'}
              </p>
              <p className="text-lg text-muted-foreground">Live Field Status</p>
            </div>
          </Card>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 xl:col-span-2">
             <DataCard 
              title="Defense System"
              icon={isDetected ? ShieldAlert : ShieldCheck}
              value={isDetected ? 'Active' : 'Monitoring'}
              loading={!realtimeData}
              variant={isDetected ? 'destructive' : 'default'}
            />
            <DataCard 
              title="Deterrent Status"
              icon={Zap}
              value={repellentStatus}
              loading={!realtimeData}
            />
            <DataCard 
              title="Detection Distance" 
              icon={Ruler} 
              value={isDetected ? realtimeData?.distance_cm : 'N/A'}
              unit="cm"
              loading={!realtimeData}
            />
            <DataCard 
              title="Last Intrusion" 
              icon={History} 
              value={lastDetection ? new Date(lastDetection.timestamp).toLocaleTimeString() : 'None'}
              loading={!realtimeData}
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
