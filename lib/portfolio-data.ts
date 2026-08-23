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
  tags: string[]
  icon: LucideIcon
  glyph: string
  image?: string
  // שדות דינמיים חדשים לתוכן המפורט
  problem?: string
  solution?: string
  features?: string[]
  steps?: ProjectStep[]
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
    problem: 'Here you can describe the main challenge or objective of building a CPU from scratch.',
    solution: 'Describe your approach, the architecture you chose, and how you solved the problem.',
    features: ['ALU Design', 'Memory Hierarchy', 'Instruction Set', 'Logic Gates'],
    steps: [
      { title: 'Step 1: Logic Gates', description: 'Built basic NAND/NOR gates...' },
      { title: 'Step 2: ALU', description: 'Assembled the Arithmetic Logic Unit...' }
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
      'An embedded hardware project demonstrating a Finite State Machine (FSM) utilizing an Arduino microcontroller. The system simulates a secure digital safe that processes sequential user inputs, transitioning through strictly defined logical states to validate a passcode before triggering the unlock mechanism. Written entirely in C.',
    tags: ['ARDUINO', 'FSM', 'EMBEDDED C'],
    icon: Lock,
    glyph: 'FSM · I/O · LOGIC',
    image: '/images/fsm.jpeg', 
    problem: 'Describe the issue or the academic requirement for building a secure FSM lock.',
    solution: 'Explain how you used states and C programming on Arduino to manage the inputs safely.',
    features: ['State Machine Logic', 'Debouncing', 'Hardware Interfacing', 'C Programming'],
    steps: [
      { title: 'Input Reading', description: 'Explain how buttons or inputs are read...' },
      { title: 'State Transition', description: 'Explain how the FSM moves from state to state...' }
    ]
  },
]