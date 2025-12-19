# **App Name**: CropGuardian Dashboard

## Core Features:

- Real-time Data Display: Display real-time data from the ESP32 sensors, including animal detection status, distance, detection time, servo status, and vibration status.
- Live Status Indicator: Implement a live status indicator (Green/Red) based on real-time sensor data.
- Data History Log: Maintain a historical log of sensor readings with timestamps, including distance and detection status. This log should be stored in the Firestore database.
- Data Visualization: Show charts for daily animal intrusions and intrusion trends over time. Use libraries suitable for time-series data.
- Automated SMS Alerts: Automatically send SMS alerts to the farmer when animal is detected. Implement logic to ensure alerts are only sent once per detection event.
- ML-Powered Species Identification: Leverage a pre-trained image recognition model to identify the intruding species. This can be configured as a 'tool' that an LLM considers when triggering certain sound/light responses.
- Sensor Data Ingestion: Set up a backend to receive ESP32 sensor data via HTTP POST requests or WebSocket, store data in the Firestore database, and manage data streams from multiple sensors in real-time.

## Style Guidelines:

- Primary color: Dark midnight blue (#191970) to suit night-time monitoring.
- Background color: Very dark gray (#2E2E2E) to enhance contrast and reduce eye strain.
- Accent color: Bright gold (#FFD700) to draw attention to important information and actions.
- Body and headline font: 'Inter', a sans-serif font for modern and readable text.
- Use flat, minimalistic icons suitable for a dark theme to represent different data points and actions.
- Employ floating cards or panels with rounded edges to present data in an organized manner. Ensure responsive design for both mobile and desktop.
- Use subtle, non-intrusive animations to highlight new alerts and updates.