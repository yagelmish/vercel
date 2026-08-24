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
  category: string;
  title: string;
  label: string;
  description: string;
  pageDescription?: string;
  tags: string[];
  image?: string;
  icon: any;
  glyph?: string;
  contentBlocks: ContentBlock[]; // המערך הדינמי החדש!
}

// --- 3. מאגר הפרויקטים ---
export const projectCards: Project[] = [
  {
    id: 'fsm',
    category: 'hardware',
    label: 'EMBEDDED LOGIC',
    title: 'Digital Safe Lock: FSM Implementation',
    description: 'Hardware-focused FSM architecture demonstrating discrete input processing...',
    pageDescription: 'A hardware-centric Finite State Machine (FSM) implementation designed...',
    tags: ['ARDUINO', 'FSM', 'EMBEDDED C', 'HARDWARE'],
    icon: Lock,
    glyph: 'FSM · I/O · LOGIC',
    image: '/images/fsm.jpeg', 
    
    // כאן אתה בונה את הדף בצורה חופשית לגמרי!
    contentBlocks: [
      {
        type: 'text',
        title: 'The Objective',
        content: 'Gaining hands-on experience in building a physical, discrete digital circuit from the ground up...'
      },
      {
        type: 'text',
        title: 'The Implementation',
        content: 'The physical circuit was implemented using discrete logic ICs and D Flip-Flop registers...'
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
          { title: 'Binary Input Reception', description: 'The FSM system receives a 0/1 input directly...' },
          { title: 'Controlled Clock Pulse', description: 'Following the input keystroke, a precise clock pulse...' }
        ]
      },
      {
        type: 'code',
        title: 'System Synchronization Code',
        description: 'Using AI tools to generate the Arduino code that synchronizes the system',
        language: 'C++ / Arduino',
        code: `const int buttonPin = 2;\nconst int clockPin = 13;\n\nvoid setup() {\n  pinMode(buttonPin, INPUT_PULLUP);\n}`
      },
      {
        type: 'features',
        title: 'Key Features',
        features: ['Discrete State Memory', 'Hardware Logic Gating', 'Signal Stabilization']
      }
    ]
  },
  // תוכל להוסיף כאן את שאר הפרויקטים באותה שיטה...
]
