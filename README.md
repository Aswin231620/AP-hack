# Firebase Studio

This is a NextJS starter in Firebase Studio.

Project Objective

You have built a complete : crop protection system for corn fields that detects, identifies, and responds to different intruders automatically, while notifying the farmer in real time.

This is not a concept — it is a working intelligent system.

🔹 Detection & Identification (IMPORTANT UPDATE)

Your system uses TWO detection methods working together:

1️⃣ Ultrasonic Sensor

Performs continuous scanning

Detects any object within 15 cm

Acts as the trigger mechanism

2️⃣ Camera + Machine Learning (ALREADY IMPLEMENTED ✅)

Uses laptop camera

Runs a pre-trained ML model

Identifies the intruder type, such as:

Monkey

Cow

Birds

Wild boar

Once the camera identifies the object, it confirms the intrusion

👉 Detection + identification together reduce false alerts.
This is a big technical strength.

🔹 Intelligent Decision Logic

Based on ML classification output, the system:

Selects intruder-specific deterrent actions

Example:

Monkey → dog sound

Cow / wild boar → firecracker sound

Birds → eagle sound

This is adaptive & intelligent response, not generic alarms.

🔹 Automatic Actions (ALL REAL, NOT FUTURE)

Once an intruder is confirmed:

🔊 Sound deterrent activated

💡 LED ON

🔄 Servo motor rotates

📸 Image captured and stored

With timestamp

With distance value

📲 Alert sent directly to farmer’s phone

🌐 Data updated on web dashboard (Firebase)

All actions are event-driven and automatic.
