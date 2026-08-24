import { Cpu, Code, Lock, type LucideIcon } from 'lucide-react'

export type SectionId = 'overview' | 'projects' | 'resume' | (string & {});

// --- 1. הגדרת סוגי הבלוקים האפשריים ---
export type TextBlock = { type: 'text'; title?: string; content: string }
export type VideoBlock = { type: 'video'; title?: string; url: string }
export type CodeBlock = { type: 'code'; title?: string; language: string; code: string; description?: string }
export type StepsBlock = { type: 'steps'; title: string; steps: { title: string; description: string }[] }
export type FeaturesBlock = { type: 'features'; title: string; features: string[] }

// סוג כללי שמאגד את כולם
export type ContentBlock = TextBlock | VideoBlock | CodeBlock | StepsBlock | FeaturesBlock;

// --- 2. הממשק החדש של הפרויקט ---
export interface Project {
  id: string;
  category: 'software' | 'hardware' | 'learning';
  label: string;
  title: string;
  description: string;
  pageDescription?: string;
  tags: string[];
  icon: LucideIcon;
  glyph: string;
  image?: string;
  contentBlocks: ContentBlock[]; // המערך הדינמי החדש במקום השדות הקשיחים
}

// --- 3. מאגר הפרויקטים ---
export const projectCards: Project[] = [
  {
    id: 'hdl',
    category: 'hardware',
    label: 'HARDWARE ARCHITECTURE',
    title: 'CPU & Computer HDL Implementation',
    description:
      'A from-scratch computer platform — from elementary logic gates to a functional CPU and memory hierarchy — demonstrating computer architecture and digital design principles.',
    tags: ['HDL', 'CPU', 'LOGIC'],
    icon: Cpu,
    glyph: 'ALU · REG · MUX',
    image: '/images/hdl.png',
    contentBlocks: [
      {
        type: 'text',
        title: 'The Problem',
        content: 'Here you can describe the main challenge or objective of building a CPU from scratch.'
      },
      {
        type: 'text',
        title: 'The Solution',
        content: 'Describe your approach, the architecture you chose, and how you solved the problem.'
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          { title: 'Step 1: Logic Gates', description: 'Built basic NAND/NOR gates...' },
          { title: 'Step 2: ALU', description: 'Assembled the Arithmetic Logic Unit...' }
        ]
      },
      {
        type: 'features',
        title: 'Key Features',
        features: ['ALU Design', 'Memory Hierarchy', 'Instruction Set', 'Logic Gates']
      }
    ]
  },
  {
    id: 'apple-pay-tracker',
    category: 'software',
    label: 'SOFTWARE & AUTOMATION',
    title: 'Automated Apple Pay Expense Tracker',
    description:
      'A zero-friction financial tracking system that automatically captures Apple Pay transactions, processes the data, and organizes it into a personalized monthly budget dashboard.',
    tags: ['IOS SHORTCUTS', 'MAKE', 'GOOGLE SHEETS API'],
    icon: Code,
    glyph: 'AUTOMATION · API · SHEETS',
    image: '/images/apple-pay-tracker.png',
    contentBlocks: [
      {
        type: 'text',
        title: 'The Problem',
        content: 'Manual expense tracking is tedious and prone to human error. Keeping a budget usually requires saving receipts or manually entering every purchase into an app at the end of the day, which often leads to missing data and abandoned tracking habits.'
      },
      {
        type: 'text',
        title: 'The Solution',
        content: 'I built a completely seamless automation that runs entirely in the background. Every time a transaction is made using Apple Pay, the system automatically captures the vendor, amount, and date, categorizes the expense, and logs it directly into a tracking sheet.'
      },
      {
        type: 'video',
        title: 'Demo & Walkthrough',
        url: '/clips/apple-pay-tracker.mp4'
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          { title: 'Trigger (iOS Shortcuts)', description: 'An iOS Personal Automation listens for any Apple Wallet transaction. Upon payment, it extracts the raw text containing the purchase details.' },
          { title: 'Data Transmission', description: 'The Shortcut automatically sends a silent POST request containing the transaction payload to a dedicated Webhook.' },
          { title: 'Processing (Make)', description: 'Make.com receives the webhook, parses the text to extract exact values (Price, Currency, Business Name), and applies logic to determine the expense category.' },
          { title: 'Storage & Analytics', description: 'The structured data is pushed via API to a Google Sheet, instantly updating monthly budget graphs and calculation formulas.' }
        ]
      },
      {
        type: 'features',
        title: 'Key Features',
        features: [
          'Zero manual data entry',
          'Real-time syncing',
          'Smart categorization logic',
          'Regex-based text extraction',
          'Custom budget dashboard'
        ]
      }
    ]
  },
  {
    id: 'fsm',
    category: 'hardware',
    label: 'EMBEDDED LOGIC',
    title: 'Digital Safe Lock: FSM Implementation',
    description:
      'Hardware-focused FSM architecture demonstrating discrete input processing, signal conditioning, and deterministic state transitions in embedded C with minimal MCU software overhead.',
    pageDescription:
      'A hardware-centric Finite State Machine (FSM) implementation designed to demonstrate low-level digital control logic with minimal software dependency. Built around an Arduino platform, the system relies on hardware debouncing, structured GPIO signal handling, and a strict deterministic state transition model written in low-level C to manage input validation and access control.',
    tags: ['ARDUINO', 'FSM', 'EMBEDDED C', 'HARDWARE'],
    icon: Lock,
    glyph: 'FSM · I/O · LOGIC',
    image: '/images/fsm.jpeg', 
    contentBlocks: [
      {
        type: 'text',
        title: 'The Objective',
        content: 'Gaining hands-on experience in building a physical, discrete digital circuit from the ground up on a breadboard. The project focused on working directly with fundamental building blocks—combining discrete logic gates with D Flip-Flops for state storage, alongside developing formal state tables and deriving excitation equations to implement a synchronous Finite State Machine without relying on microcontroller software execution.'
      },
      {
        type: 'text',
        title: 'The Implementation',
        content: 'The physical circuit was implemented using discrete logic ICs and D Flip-Flop registers to handle state memory and Next-State gating. An Arduino microcontroller was utilized exclusively as a stable 5V power supply and an edge-controlled clock generator. Instead of a free-running oscillator, the Arduino generated deterministic clock pulses triggered by user keypad inputs—introducing a calculated delay to ensure input signals and setup times fully stabilize at the D Flip-Flop inputs before pulsing the clock, preventing metastability and ensuring reliable state transitions.'
      },
      {
        type: 'video',
        title: 'Demo & Walkthrough',
        url: '/clips/fsm.mp4'
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          { title: 'Binary Input Reception', description: 'The FSM system receives a 0/1 input directly from the user via the input buttons.' },
          { title: 'Controlled Clock Pulse', description: 'Following the input keystroke, a precise and synchronized clock pulse is generated by the Arduino controller.' },
          { title: 'Hardware Logic Execution', description: 'Based on the previous state and the derived excitation equations, the signal propagates entirely through the hardware.' },
          { title: 'Unlock Validation', description: 'Upon reaching the correct final state, the indicator light illuminates to signal the safe is unlocked.' }
        ]
      },
      {
        type: 'code',
        title: 'System Synchronization Code',
        description: 'Using AI tools to generate the Arduino code that synchronizes the system',
        language: 'C++ / Arduino',
        code: `// Replace this with your actual Arduino code
const int buttonPin = 2;
const int clockPin = 13;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(clockPin, OUTPUT);
  digitalWrite(clockPin, LOW);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    delay(50); // Signal stabilization & debouncing
    digitalWrite(clockPin, HIGH); // Clock rising edge
    delay(10);
    digitalWrite(clockPin, LOW); // Clock falling edge
    
    while(digitalRead(buttonPin) == LOW); // Wait for release
    delay(50);
  }
}`
      },
      {
        type: 'features',
        title: 'Key Features',
        features: ['Discrete State Memory', 'Hardware Logic Gating', 'Signal Stabilization', 'Metastability Prevention']
      }
    ]
  },
]
