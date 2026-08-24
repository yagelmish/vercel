import { Cpu, Code, Lock, type LucideIcon } from 'lucide-react'

export type SectionId = 'overview' | 'projects' | 'resume' | 'hdl' | 'apple-pay-tracker' | 'fsm'

export type ProjectStep = {
  title: string
  description: string
}

export type ProjectCard = {
  id: string
  category: 'software' | 'hardware' | 'learning'
  label: string
  title: string
  description: string
  pageDescription?: string
  tags: string[]
  icon: LucideIcon
  glyph: string
  image?: string
  problem?: string
  solution?: string
  features?: string[]
  steps?: ProjectStep[]
  codeSnippet?: string
}

export const projectCards: ProjectCard[] = [
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
    problem: 'To construct a general-purpose 16-bit computer architecture from the ground up starting from primitive NAND logic gates.',
    solution: 'Designed and simulated combinational and sequential chips in HDL, implemented an ALU, register files, and program counter, and integrated them into a functional CPU capable of executing machine language binaries.',
    features: ['Custom 16-bit ALU', 'Memory Hierarchy & RAM', 'Fetch-Decode-Execute CPU', 'Assembly Compatibility'],
    steps: [
      { title: 'Elementary Logic Gates', description: 'Constructed basic Boolean logic gates (AND, OR, XOR, Mux, DMux) solely from elementary NAND gates.' },
      { title: 'Combinational & ALU Logic', description: 'Built multibit adders, incrementors, and the core Arithmetic Logic Unit (ALU).' },
      { title: 'Sequential Logic & Memory', description: 'Implemented D Flip-Flop registers, RAM hierarchies, and the Program Counter (PC).' },
      { title: 'CPU & System Integration', description: 'Combined memory, ALU, and instruction registers into a unified synchronous CPU architecture.' }
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
    problem: 'Manual expense tracking is tedious and prone to human error. Keeping a budget usually requires saving receipts or manually entering every purchase into an app at the end of the day, which often leads to missing data and abandoned tracking habits.',
    solution: 'I built a completely seamless automation that runs entirely in the background. Every time a transaction is made using Apple Pay, the system automatically captures the vendor, amount, and date, categorizes the expense, and logs it directly into a tracking sheet.',
    features: [
      'Zero manual data entry',
      'Real-time syncing',
      'Smart categorization logic',
      'Regex-based text extraction',
      'Custom budget dashboard'
    ],
    steps: [
      { title: 'Trigger (iOS Shortcuts)', description: 'An iOS Personal Automation listens for any Apple Wallet transaction. Upon payment, it extracts the raw text containing the purchase details.' },
      { title: 'Data Transmission', description: 'The Shortcut automatically sends a silent POST request containing the transaction payload to a dedicated Webhook.' },
      { title: 'Processing (Make)', description: 'Make.com receives the webhook, parses the text to extract exact values (Price, Currency, Business Name), and applies logic to determine the expense category.' },
      { title: 'Storage & Analytics', description: 'The structured data is pushed via API to a Google Sheet, instantly updating monthly budget graphs and calculation formulas.' }
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
    glyph: 'CLK · D-FF · LOGIC',
    image: '/images/fsm.jpeg', 
    problem: 'Gaining hands-on experience in building a physical, discrete digital circuit from the ground up on a breadboard. The project focused on working directly with fundamental building blocks—combining discrete logic gates with D Flip-Flops for state storage, alongside developing formal state tables and deriving excitation equations to implement a synchronous Finite State Machine without relying on microcontroller software execution.',
    solution: 'The physical circuit was implemented using discrete logic ICs and D Flip-Flop registers to handle state memory and Next-State gating. An Arduino microcontroller was utilized exclusively as a stable 5V power supply and an edge-controlled clock generator. Instead of a free-running oscillator, the Arduino generated deterministic clock pulses triggered by user keypad inputs—introducing a calculated delay to ensure input signals and setup times fully stabilize at the D Flip-Flop inputs before pulsing the clock, preventing metastability and ensuring reliable state transitions.',
    features: ['Discrete State Memory', 'Hardware Logic Gating', 'Signal Stabilization', 'Metastability Prevention'],
    steps: [
      { title: 'Binary Input Reception', description: 'The FSM system receives a 0/1 input directly from the user via the input buttons.' },
      { title: 'Controlled Clock Pulse', description: 'Following the input keystroke, a precise and synchronized clock pulse is generated by the Arduino controller.' },
      { title: 'Hardware Logic Execution', description: 'Based on the previous state and the derived excitation equations, the signal propagates entirely through the hardware.' },
      { title: 'Unlock Validation', description: 'Upon reaching the correct final state, the indicator light illuminates to signal the safe is unlocked.' }
    ],
    codeSnippet: `// Replace this with your actual Arduino code
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
]
