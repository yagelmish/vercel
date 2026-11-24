import { Cpu, Code, Lock, type LucideIcon } from 'lucide-react'
import type { LocalizableText, LocalizedString } from '@/lib/i18n'

export type SectionId = 'overview' | 'projects' | 'resume' | (string & {});

// --- 1. Content Block Definitions ---
export type TextBlock = { type: 'text'; title?: LocalizedString; content: LocalizedString }
export type VideoBlock = { type: 'video'; title?: LocalizedString; url: string }
export type CodeBlock = { type: 'code'; title?: LocalizedString; language: string; code: string; description?: LocalizedString }
export type StepsBlock = { type: 'steps'; title: LocalizedString; steps: { title: LocalizedString; description: LocalizedString }[] }
export type FeaturesBlock = { type: 'features'; title: LocalizedString; features: LocalizedString[] }
export type ImageBlock = { type: 'image'; title?: LocalizedString; url: string; alt?: LocalizedString }

// Union of supported blocks
export type ContentBlock = TextBlock | VideoBlock | CodeBlock | StepsBlock | FeaturesBlock | ImageBlock;

// --- 2. Project Interface ---
export interface Project {
  id: string;
  category: 'software' | 'hardware' | 'learning';
  label: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  pageDescription?: LocalizedString;
  tags: LocalizableText[];
  icon: LucideIcon;
  glyph: string;
  image?: string;
  contentBlocks: ContentBlock[];
}

// --- 3. Portfolio Projects Repository (Single Source of Truth) ---
export const projectCards: Project[] = [
  {
    id: 'hdl',
    category: 'hardware',
    label: {
      en: 'HARDWARE ARCHITECTURE',
      he: 'ארכיטקטורת חומרה',
    },
    title: {
      en: 'CPU & Computer HDL Implementation',
      he: 'מימוש מעבד ומחשב ב-HDL',
    },
    description: {
      en: 'A from-scratch computer platform — from elementary logic gates to a functional CPU and memory hierarchy — demonstrating computer architecture and digital design principles.',
      he: 'פלטפורמת מחשב שנבנתה מאפס — משערים לוגיים בסיסיים ועד מעבד פונקציונלי והיררכיית זיכרון — המדגימה עקרונות של ארכיטקטורת מחשבים ותכנון ספרתי.',
    },
    tags: ['HDL', 'CPU', { en: 'LOGIC', he: 'לוגיקה' }],
    icon: Cpu,
    glyph: 'ALU · REG · MUX',
    image: '/images/hdl/hero.png',
    contentBlocks: [
      {
        type: 'text',
        title: { en: 'The Problem', he: 'האתגר' },
        content: {
          en: 'Here you can describe the main challenge or objective of building a CPU from scratch.',
          he: 'כאן ניתן לתאר את האתגר המרכזי או את המטרה בבניית מעבד מאפס.',
        },
      },
      {
        type: 'text',
        title: { en: 'The Solution', he: 'הפתרון' },
        content: {
          en: 'Describe your approach, the architecture you chose, and how you solved the problem.',
          he: 'תיאור הגישה ההנדסית, הארכיטקטורה שנבחרה ואופן פתרון האתגר.',
        },
      },
      {
        type: 'steps',
        title: { en: 'How It Works', he: 'איך זה עובד' },
        steps: [
          {
            title: { en: 'Step 1: Logic Gates', he: 'שלב 1: שערים לוגיים' },
            description: {
              en: 'Built basic NAND/NOR gates...',
              he: 'בניית שערי NAND/NOR בסיסיים...',
            },
          },
          {
            title: { en: 'Step 2: ALU', he: 'שלב 2: יחידה אריתמטית-לוגית (ALU)' },
            description: {
              en: 'Assembled the Arithmetic Logic Unit...',
              he: 'הרכבת היחידה האריתמטית-לוגית...',
            },
          },
        ],
      },
      {
        type: 'features',
        title: { en: 'Key Features', he: 'מאפיינים מרכזיים' },
        features: [
          { en: 'ALU Design', he: 'תכנון ALU' },
          { en: 'Memory Hierarchy', he: 'היררכיית זיכרון' },
          { en: 'Instruction Set', he: 'סט פקודות (Instruction Set)' },
          { en: 'Logic Gates', he: 'שערים לוגיים' },
        ],
      },
    ],
  },
  {
    id: 'apple-pay-tracker',
    category: 'software',
    label: {
      en: 'SOFTWARE & AUTOMATION',
      he: 'תוכנה ואוטומציה',
    },
    title: {
      en: 'Automated Apple Pay Expense Tracker',
      he: 'מעקב הוצאות אוטומטי מ-Apple Pay',
    },
    description: {
      en: 'A zero-friction financial tracking system that automatically captures Apple Pay transactions, processes the data, and organizes it into a personalized monthly budget dashboard.',
      he: 'מערכת מעקב פיננסי ללא חיכוך הלוכדת אוטומטית עסקאות Apple Pay, מעבדת את הנתונים ומארגנת אותם בלוח בקרה חודשי מותאם אישית.',
    },
    tags: ['IOS SHORTCUTS', 'MAKE', 'GOOGLE SHEETS API'],
    icon: Code,
    glyph: 'AUTOMATION · API · SHEETS',
    image: '/images/apple-pay-tracker/hero.png',
    contentBlocks: [
      {
        type: 'text',
        title: { en: 'The Problem', he: 'הבעיה' },
        content: {
          en: 'Manual expense tracking is tedious and prone to human error. Keeping a budget usually requires saving receipts or manually entering every purchase into an app at the end of the day, which often leads to missing data and abandoned tracking habits.',
          he: 'מעקב ידני אחר הוצאות הוא מתיש ונוטה לטעויות אנוש. ניהול תקציב דורש לרוב שמירת קבלות או הזנה ידנית של כל רכישה לאפליקציה בסוף היום, מה שמוביל לעיתים קרובות לנתונים חסרים ולזניחת הרגל המעקב.',
        },
      },
      {
        type: 'text',
        title: { en: 'The Solution', he: 'הפתרון' },
        content: {
          en: 'I built a completely seamless automation that runs entirely in the background. Every time a transaction is made using Apple Pay, the system automatically captures the vendor, amount, and date, categorizes the expense, and logs it directly into a tracking sheet.',
          he: 'בניתי אוטומציה חלקה לחלוטין הפועלת באופן שקוף ברקע. בכל פעם שמתבצעת עסקה באמצעות Apple Pay, המערכת לוכדת אוטומטית את שם בית העסק, הסכום והתאריך, מסווגת את ההוצאה ומתעדת אותה ישירות בגיליון המעקב.',
        },
      },
      {
        type: 'video',
        title: { en: 'Demo & Walkthrough', he: 'הדגמה והסבר' },
        url: '/clips/apple-pay-tracker/demo.mp4',
      },
      {
        type: 'steps',
        title: { en: 'How It Works', he: 'איך זה עובד' },
        steps: [
          {
            title: { en: 'Trigger (iOS Shortcuts)', he: 'טריגר (iOS Shortcuts)' },
            description: {
              en: 'An iOS Personal Automation listens for any Apple Wallet transaction. Upon payment, it extracts the raw text containing the purchase details.',
              he: 'אוטומציה אישית ב-iOS מאזינה לכל עסקה ב-Apple Wallet. מיד עם ביצוע התשלום, היא מחלצת את הטקסט הגולמי המכיל את פרטי הרכישה.',
            },
          },
          {
            title: { en: 'Data Transmission', he: 'שידור הנתונים' },
            description: {
              en: 'The Shortcut automatically sends a silent POST request containing the transaction payload to a dedicated Webhook.',
              he: 'הקיצור שולח אוטומטית בקשת POST שקטה הכוללת את נתוני העסקה אל כתובת Webhook ייעודית.',
            },
          },
          {
            title: { en: 'Processing (Make)', he: 'עיבוד וסיווג (Make)' },
            description: {
              en: 'Make.com receives the webhook, parses the text to extract exact values (Price, Currency, Business Name), and applies logic to determine the expense category.',
              he: 'פלטפורמת Make.com מקבלת את ה-Webhook, מנתחת את הטקסט לחילוץ הערכים המדויקים (מחיר, מטבע, שם העסק) ומפעילה לוגיקה לקביעת קטגוריית ההוצאה.',
            },
          },
          {
            title: { en: 'Storage & Analytics', he: 'שמירה וניתוח נתונים' },
            description: {
              en: 'The structured data is pushed via API to a Google Sheet, instantly updating monthly budget graphs and calculation formulas.',
              he: 'הנתונים המובנים נשלחים באמצעות API אל Google Sheets, ומעדכנים מיידית את גרפי התקציב החודשיים ונוסחאות החישוב.',
            },
          },
        ],
      },
      {
        type: 'features',
        title: { en: 'Key Features', he: 'מאפיינים מרכזיים' },
        features: [
          { en: 'Zero manual data entry', he: 'אפס הזנה ידנית של נתונים' },
          { en: 'Real-time syncing', he: 'סנכרון בזמן אמת' },
          { en: 'Smart categorization logic', he: 'לוגיקת סיווג חכמה לקטגוריות' },
          { en: 'Regex-based text extraction', he: 'חילוץ טקסט מבוסס Regex' },
          { en: 'Custom budget dashboard', he: 'לוח בקרה מותאם אישית לתקציב' },
        ],
      },
    ],
  },
  {
    id: 'fsm',
    category: 'hardware',
    label: {
      en: 'EMBEDDED LOGIC',
      he: 'לוגיקה משובצת חומרה',
    },
    title: {
      en: 'Digital Safe Lock: FSM Implementation',
      he: 'מנעול כספת דיגיטלי: מימוש מכונת מצבים (FSM)',
    },
    description: {
      en: 'Hardware-focused FSM architecture demonstrating discrete input processing, signal conditioning, and deterministic state transitions in embedded C with minimal MCU software overhead.',
      he: 'ארכיטקטורת מכונת מצבים (FSM) ממוקדת חומרה, המדגימה עיבוד קלט דיסקרטי, ייצוב אותות ומעברי מצבים דטרמיניסטיים ב-C משובצת עם תקורת תוכנה מינימלית בבקר.',
    },
    pageDescription: {
      en: 'A hardware-centric Finite State Machine (FSM) implementation designed to demonstrate low-level digital control logic with minimal software dependency. Built around an Arduino platform, the system relies on hardware debouncing, structured GPIO signal handling, and a strict deterministic state transition model written in low-level C to manage input validation and access control.',
      he: 'מימוש מכונת מצבים סופית (FSM) מבוססת חומרה, שתוכנן כדי להדגים לוגיקת בקרה ספרתית ברמה נמוכה עם תלות מינימלית בתוכנה. המערכת, המשולבת עם פלטפורמת Arduino, מתבססת על סינון רעשים, טיפול מובנה באותות GPIO ומודל דטרמיניסטי קפדני למעברי מצבים לניהול אימות קלט ובקרת גישה.',
    },
    tags: ['ARDUINO', 'FSM', 'EMBEDDED C', { en: 'HARDWARE', he: 'חומרה' }],
    icon: Lock,
    glyph: 'FSM · I/O · LOGIC',
    image: '/images/fsm/hero.png',
    contentBlocks: [
      {
        type: 'text',
        title: { en: 'The Objective', he: 'מטרת הפרויקט' },
        content: {
          en: 'Gaining hands-on experience in building a physical, discrete digital circuit from the ground up on a breadboard. The project focused on working directly with fundamental building blocks—combining discrete logic gates with D Flip-Flops for state storage, alongside developing formal state tables and deriving excitation equations to implement a synchronous Finite State Machine without relying on microcontroller software execution.',
          he: 'צבירת ניסיון מעשי בבניית מעגל ספרתי פיזי ודיסקרטי מאפס על גבי מטריצה (Breadboard). הפרויקט התמקד בעבודה ישירה עם אבני הבניין הבסיסיות — שילוב שערים לוגיים דיסקרטיים עם דלגלגי D לשמירת מצב, לצד פיתוח טבלאות מצבים פורמליות וגזירת משוואות עירור למימוש מכונת מצבים סינכרונית (FSM) ללא תלות בהרצת לוגיקת המצבים בתוכנת המיקרו-בקר.',
        },
      },
      {
        type: 'text',
        title: { en: 'The Implementation', he: 'אופן המימוש' },
        content: {
          en: 'The physical circuit was implemented using discrete logic ICs and D Flip-Flop registers to handle state memory and Next-State gating. An Arduino microcontroller was utilized exclusively as a stable 5V power supply and an edge-controlled clock generator. Instead of a free-running oscillator, the Arduino generated deterministic clock pulses triggered by user keypad inputs—introducing a calculated delay to ensure input signals and setup times fully stabilize at the D Flip-Flop inputs before pulsing the clock, preventing metastability and ensuring reliable state transitions.',
          he: 'המעגל הפיזי מומש באמצעות רכיבי לוגיקה דיסקרטיים ואוגרי D Flip-Flop לניהול זיכרון המצבים ולוגיקת המצב הבא. מיקרו-בקר ה-Arduino שימש אך ורק כספק מתח יציב של 5V וכמחולל שעון מבוקר-קצה. במקום מתנד חופשי, ה-Arduino יצר פעימות שעון דטרמיניסטיות בתגובה ללחיצות המשתמש — תוך הוספת השהיה מחושבת המבטיחה שאותות הקלט וזמני ה-Setup יתייצבו לחלוטין בכניסות ה-D Flip-Flop לפני עליית השעון, למניעת מטא-יציבות ולהבטחת מעברי מצבים אמינים.',
        },
      },
      {
        type: 'video',
        title: { en: 'Demo & Walkthrough', he: 'הדגמה והסבר' },
        url: '/clips/fsm/demo.mp4',
      },
      {
        type: 'steps',
        title: { en: 'How It Works', he: 'איך זה עובד' },
        steps: [
          {
            title: { en: 'Binary Input Reception', he: 'קליטת קלט בינארי' },
            description: {
              en: 'The FSM system receives a 0/1 input directly from the user via the input buttons.',
              he: 'מערכת ה-FSM קולטת קלט של 0 או 1 ישירות מהמשתמש באמצעות לחצני הקלט.',
            },
          },
          {
            title: { en: 'Controlled Clock Pulse', he: 'פעימת שעון מבוקרת' },
            description: {
              en: 'Following the input keystroke, a precise and synchronized clock pulse is generated by the Arduino controller.',
              he: 'לאחר הלחיצה, בקר ה-Arduino מייצר פעימת שעון מדויקת ומסונכרנת.',
            },
          },
          {
            title: { en: 'Hardware Logic Execution', he: 'ביצוע לוגיקה בחומרה' },
            description: {
              en: 'Based on the previous state and the derived excitation equations, the signal propagates entirely through the hardware.',
              he: 'בהתבסס על המצב הקודם ומשוואות העירור שנגזרו, האות מתקדם ומעובד כולו ברמת החומרה.',
            },
          },
          {
            title: { en: 'Unlock Validation', he: 'אימות פתיחת הכספת' },
            description: {
              en: 'Upon reaching the correct final state, the indicator light illuminates to signal the safe is unlocked.',
              he: 'עם ההגעה למצב הסופי התקין, נורית החיווי נדלקת ומסמנת שהכספת פתוחה.',
            },
          },
        ],
      },
      {
        type: 'code',
        title: { en: 'System Synchronization Code', he: 'קוד סנכרון המערכת' },
        description: {
          en: 'Using AI tools to generate the Arduino code that synchronizes the system',
          he: 'שימוש בכלי AI ליצירת קוד ה-Arduino המסנכרן את המערכת',
        },
        language: 'C++ / Arduino',
        code: `/*
  Synchronous code lock system - Code 1101 with overlap
  Mixed button version:
  - Button '1' is Normally Open (Pressed = LOW, Released = HIGH)
  - Button '0' is Normally Closed (Pressed = HIGH, Released = LOW)
*/

// Input pin definitions (Buttons)
const int button1Pin = 6; // Button '1' (Normally Open - connected to GND)
const int button0Pin = 7; // Button '0' (Normally Closed - works in reverse!)

// Output pin definitions (to matrix)
const int dataPin = 2;    // Data line X (connected to 1D, pin 2 on 74HC74)
const int clockPin = 3;   // Clock line CLK (connected to pins 3 and 11 on 74HC74)

void setup() {
  // Set buttons as inputs with internal pull-up resistors (INPUT_PULLUP)
  pinMode(button1Pin, INPUT_PULLUP);
  pinMode(button0Pin, INPUT_PULLUP);

  // Set output pins for the matrix
  pinMode(dataPin, OUTPUT);
  pinMode(clockPin, OUTPUT);

  // Initialize output lines to LOW
  digitalWrite(clockPin, LOW);
  digitalWrite(dataPin, LOW);

  // Open serial communication for monitoring
  Serial.begin(9600);
  Serial.println("--- System Ready (Mixed Button Mode) ---");
  Serial.println("Button '1' is Normally Open (NO)");
  Serial.println("Button '0' is Normally Closed (NC)");

  // Perform synchronous reset for the state machine on power-up (send two zeros)
  softwareReset();
}

void loop() {
  // --- Check Button '1' (Normally Open - standard) ---
  if (digitalRead(button1Pin) == LOW) { // Pressed = LOW
    delay(50); // Debounce
    if (digitalRead(button1Pin) == LOW) {
      Serial.println("Button '1' Pressed! Setting X = HIGH");
      
      digitalWrite(dataPin, HIGH); // Set input to 1 (The LED will turn on if we are in state S3)
      
      while (digitalRead(button1Pin) == LOW) { // Wait for release (return to HIGH)
        delay(10); 
      }
      
      Serial.println("Button '1' Released! Triggering Clock Pulse");
      triggerClock();
    }
  }

  // --- Check Button '0' (Normally Closed - works in reverse!) ---
  if (digitalRead(button0Pin) == HIGH) { // Pressed = HIGH
    delay(50); // Debounce
    if (digitalRead(button0Pin) == HIGH) {
      Serial.println("Button '0' Pressed! Setting X = LOW");
      
      digitalWrite(dataPin, LOW); // Set input to 0
      
      while (digitalRead(button0Pin) == HIGH) { // Wait for release (return to LOW)
        delay(10); 
      }
      
      Serial.println("Button '0' Released! Triggering Clock Pulse");
      triggerClock();
    }
  }
}

// Function to generate a controlled clock pulse
void triggerClock() {
  digitalWrite(clockPin, HIGH);
  delay(10); 
  digitalWrite(clockPin, LOW);
  delay(10); 
}

// Software synchronous reset function
void softwareReset() {
  digitalWrite(dataPin, LOW);
  triggerClock();
  triggerClock();
  Serial.println("Software Reset Complete. Current State: S0 (00)");
}
  }
}
`,
      },
      {
        type: 'features',
        title: { en: 'Key Features', he: 'מאפיינים מרכזיים' },
        features: [
          { en: 'Discrete State Memory', he: 'זיכרון מצבים דיסקרטי' },
          { en: 'Hardware Logic Gating', he: 'שערים לוגיים בחומרה' },
          { en: 'Signal Stabilization', he: 'ייצוב אותות ומניעת רעשים' },
          { en: 'Metastability Prevention', he: 'מניעת מטא-יציבות (Metastability)' },
        ],
      },
    ],
  },
]
