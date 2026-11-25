import { Cpu, Code, Lock, Zap, type LucideIcon } from 'lucide-react'
import type { LocalizableText, LocalizedString } from '@/lib/i18n'
import { getMediaUrl } from '@/lib/media'

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
    id: 'smartec',
    category: 'hardware',
    label: {
      en: 'IOT · ENERGY HARVESTING · PCB',
      he: 'IoT · קצירת אנרגיה · PCB',
    },
    title: {
      en: 'SmartEC: Non-Invasive Smart Electricity Meter',
      he: 'SmartEC: מונה חשמל חכם ללא פלישה ללוח',
    },
    description: {
      en: 'Battery-powered IoT smart electricity meter built around an ESP32-C3 and a custom energy-harvesting PCB. Reads optical meter pulses, harvests power via a clip-on CT clamp, buffers 48h telemetry in RTC memory, and streams over MQTTS to a self-hosted ThingsBoard server.',
      he: 'מונה חשמל חכם מבוסס ESP32-C3 ו-PCB ייעודי עם קצירת אנרגיה. קורא פולסים אופטיים מהמונה, קוצר אנרגיה משנאי זרם לא-פולשני על הגיד, אוגר מדידות ל-48 שעות בזיכרון RTC ומשדר באופן מאובטח לשרת ThingsBoard עצמאי.',
    },
    pageDescription: {
      en: 'An end-to-end hardware, firmware, and cloud IoT system engineered to bring remote real-time energy monitoring to private sub-meters in split apartments without modifying the electrical panel. Combines a custom EasyEDA energy-harvesting PCB, ultra-low-power ESP32-C3 SuperMini firmware with adaptive pulse calibration and 48-hour RTC batching, a dedicated UART diagnostic sniffer node, and a self-hosted ThingsBoard server.',
      he: 'מערכת IoT שלמה מקצה לקצה (חומרה, קושחה וענן) שתוכננה להוסיף ניטור צריכת חשמל מרחוק בזמן אמת למוני חשמל פרטיים בדירות מחולקות ויחידות דיור — ללא כל שינוי במבנה לוח החשמל. הפרויקט משלב PCB ייעודי שתוכנן ב-EasyEDA לקצירת אנרגיה וסינון אותות, קושחת חיסכון-אנרגיה על גבי ESP32-C3 SuperMini עם כיול פולס אוטומטי ואגירת RTC ל-48 שעות, בקר Sniffer ייעודי לתיעוד UART, ושרת ThingsBoard עצמאי בענן.',
    },
    tags: [
      'ESP32-C3',
      { en: 'ENERGY HARVESTING', he: 'קצירת אנרגיה' },
      'EASYEDA PCB',
      'MQTTS / THINGSBOARD',
      'IOT',
    ],
    icon: Zap,
    glyph: 'ESP32-C3 · CT · MQTTS',
    image: getMediaUrl('/images/smartec/hero.png'),
    contentBlocks: [
      {
        type: 'text',
        title: { en: 'The Problem & Engineering Goal', he: 'הבעיה והיעד ההנדסי' },
        content: {
          en: 'Split apartments and housing units rely on private sub-meters inside the electrical panel that have no remote connectivity, forcing manual physical readings. The core goal was a zero-maintenance, plug-and-play device that installs without altering panel wiring—reading optical meter pulses passively while harvesting its own operating power directly from a clip-on Current Transformer (CT) around an existing conductor.',
          he: 'בדירות מחולקות וביחידות דיור מותקנים לרוב מוני חשמל פרטיים בתוך הלוח ללא קישוריות מרחוק, מה שמחייב קריאה פיזית ידנית. היעד המרכזי היה לפתח מוצר להתקנה פשוטה עם אפס התעסקות שוטפת וללא שום שינוי במבנה לוח החשמל — קריאה פסיבית של פולסים אופטיים מהמונה, לצד קצירת אנרגיה עצמאית באמצעות קליפס שנאי זרם (CT) המתלבש על הגיד ומטעין סוללת LiPo.',
        },
      },
      {
        type: 'text',
        title: { en: 'Hardware & Custom PCB Design', he: 'תכנון החומרה וה-PCB הייעודי' },
        content: {
          en: 'The custom PCB (designed in EasyEDA Pro) integrates three stages around an ESP32-C3 SuperMini: (1) a non-invasive CT energy-harvesting front-end with Schottky (1N5817) and DB107 bridge rectification feeding a BQ-series energy-harvesting charger module and LiPo battery; (2) a hardware RC low-pass filter (100 kΩ + 100 nF) conditioning the optical pulse input into GPIO 4; and (3) a high-impedance resistor divider on GPIO 0 (ADC1_CH0) for idle and RF-load battery voltage telemetry. Wi-Fi TX power is tuned to 8.5 dBm to prevent regulator brownout dips during TLS bursts.',
          he: 'המעגל המודפס הייעודי (תוכנן ב-EasyEDA Pro) מאחד שלוש תתי-מערכות סביב בקר ESP32-C3 SuperMini: (1) דרגת קצירת אנרגיה לא-פולשנית הכוללת חיבור CT, יישור בדיודות שוטקי (1N5817) וגשרי יישור (DB107), קבלי סינון, מודול ניהול טעינה מסדרת BQ וסוללת LiPo; (2) מסנן RC חומרתי (100 kΩ + 100 nF) לייצוב וניקוי פולסי המונה בכניסה ל-GPIO 4; ו-(3) מחלק מתח בעכבה גבוהה על GPIO 0 (ADC1_CH0) לדגימת מתח סוללה במנוחה ותחת עומס שידור. עוצמת השידור הוגבלה ל-8.5 dBm למניעת נפילות מתח ברגולטור הזעיר.',
        },
      },
      {
        type: 'steps',
        title: { en: 'System Architecture & Development Journey', he: 'ארכיטקטורת המערכת ותהליך הפיתוח' },
        steps: [
          {
            title: {
              en: 'Captive Portal & Adaptive Pulse Calibration',
              he: 'פורטל הגדרה וכיול אוטומטי של אורך הפולס',
            },
            description: {
              en: 'On initial setup (or BOOT button trigger), the device launches a SmartMeter-Setup Captive Portal (192.168.4.1). A live test measures two consecutive optical pulse widths via microsecond interrupts, automatically computes optimal debounce (pulse width + 30 ms), and lets the installer configure meter constants (e.g., 100 Imp/kWh for NISKO) and starting kWh reading.',
              he: 'בהתקנה ראשונית (או בלחיצת כפתור BOOT) הבקר פותח פורטל הגדרה מקומי (Captive Portal בכתובת 192.168.4.1). בדיקת תקינות חיה מודדת שני פולסים רצופים ברזולוציית מיקרו-שניות, מחשבת אוטומטית את זמן סינון הרעשים האופטימלי (אורך הפולס + 30ms), ומאפשרת הזנת קבוע המונה (כגון 100 Imp/kWh במוני NISKO) וסנכרון קריאת הפתיחה.',
            },
          },
          {
            title: {
              en: 'Ultra-Low-Power Deep Sleep & Pulse Counting',
              he: 'ספירת פולסים מדויקת בשינה עמוקה (Deep Sleep)',
            },
            description: {
              en: 'Migrated from dual-core ESP32-WROOM to ESP32-C3 SuperMini for lower sleep power. Routine pulse wakeups on GPIO 4 bypass Serial initialization, ADC sampling, and floating-point math entirely—incrementing RTC memory, waiting for physical pulse settle, and returning directly to deep sleep.',
              he: 'הפרויקט עבר מ-ESP32-WROOM דו-ליבתי אל ESP32-C3 SuperMini לצמצום צריכת הזרם. התעוררות מפולס שגרתי ב-GPIO 4 מדלגת לחלוטין על אתחול Serial, דגימות ADC וחישובי float — סופרת בזיכרון ה-RTC, ממתינה לסיום הפולס הפיזי וחוזרת מיידית לשינה עמוקה.',
            },
          },
          {
            title: {
              en: '48-Hour RTC Batch Buffering & Flash Backup',
              he: 'אגירת נתונים ב-RTC ל-48 שעות וגיבוי ל-Flash',
            },
            description: {
              en: 'Every hour, the firmware wakes from an RTC timer to log a 16-byte HourlyRecord (Unix timestamp, cumulative kWh, average watts, battery voltage) into an RTC buffer holding up to 48 hours and backs up pulse counts to NVS Flash. Wi-Fi turns on only once every 12 hours (or via manual TX button on GPIO 5) to transmit in a single batch.',
              he: 'מדי שעה הבקר מתעורר מטיימר RTC, דוגם מתח סוללה במנוחה, מתעד רשומת HourlyRecord בת 16 בתים (חותמת זמן, קוט"ש מצטבר, הספק ממוצע ומתח סוללה) בבאפר RTC של עד 48 שעות, ומגבה מונה פולסים ל-Flash. מודם ה-Wi-Fi מופעל רק פעם ב-12 שעות (או בלחיצת שידור ידני ב-GPIO 5).',
            },
          },
          {
            title: {
              en: 'Self-Hosted ThingsBoard Cloud over MQTTS',
              he: 'מעבר מ-Blynk לשרת ThingsBoard עצמאי ב-MQTTS',
            },
            description: {
              en: 'To eliminate commercial IoT SaaS costs and maintain full control, the backend was migrated from Blynk to a self-hosted open-source ThingsBoard instance on a Google Cloud VM. Devices auto-provision secure credentials, sync time via NTP, and publish batch JSON arrays over encrypted MQTTS (port 8883).',
              he: 'כדי לחסוך עלויות פלטפורמות IoT ולשלוט בתשתית, המערכת הועברה מ-Blynk לשרת ThingsBoard קוד פתוח שהוקם על VM בענן של Google. הבקר מבצע הקצאה אוטומטית (Auto-Provisioning) של טוקן מאובטח, מסנכרן זמן מול NTP ומשדר מערכי JSON מרוכזים ב-MQTTS מוצפן (פורט 8883).',
            },
          },
          {
            title: {
              en: 'Dedicated UART Diagnostic Sniffer Node',
              he: 'בקר Sniffer ייעודי לדיבאגינג ותיעוד בשטח',
            },
            description: {
              en: 'Built a companion firmware (logger_c3) on a second ESP32-C3 running at 80 MHz with Wi-Fi off by default. It passively captures UART logs from the meter node, strips Espressif ROM bootloader noise, persists useful wakeup sessions to LittleFS (up to 1.5 MB), and exposes a toggleable Wi-Fi AP web console for field diagnostics.',
              he: 'פותחה קושחה נלווית (logger_c3) לבקר ESP32-C3 נוסף הפועל בתדר 80MHz עם Wi-Fi כבוי כברירת מחדל. הלוגר מאזין פסיבית לקו ה-UART של בקר המונה, מסנן רעשי Bootloader של Espressif, שומר סשנים רלוונטיים ב-LittleFS (עד 1.5MB) ומאפשר פתיחת ממשק Web ב-Wi-Fi בלחיצת כפתור לצפייה בלוגים בשטח.',
            },
          },
          {
            title: {
              en: 'Lab Stress Testing & Edge-Case Hardening',
              he: 'בדיקות מעבדה קשיחות וטיפול במקרי קצה',
            },
            description: {
              en: 'Validated against 100-pulse accuracy benchmarks (1.000 kWh), sub-80 ms bounce bursts, maximum pulse-rate saturation, repeated deep-sleep single-pulse wakes, Wi-Fi/internet drops mid-transmission, and power cuts during Flash writes and sleep cycles.',
              he: 'המערכת נבחנה מול תרחישי מעבדה ומקרי קצה: בדיקת דיוק 100 פולסים (1.000 kWh), הזרקת רעשים מתחת ל-80ms, עומסי קצב פולסים גבוהים, מאות התעוררויות Deep Sleep, ניתוק Wi-Fi/אינטרנט באמצע שידור והפסקות מתח בזמן כתיבה ל-Flash ובזמן שינה.',
            },
          },
        ],
      },
      {
        type: 'code',
        title: {
          en: 'Core Firmware: RTC Batch Record & Adaptive Pulse ISR',
          he: 'ליבת הקושחה: מבנה האגירה ב-RTC ופסיקת פולסים מותאמת',
        },
        description: {
          en: 'Excerpt from src/main_c3.cpp showing persistent RTC telemetry structs and calibrated ISR debouncing',
          he: 'קטע מקורי מתוך src/main_c3.cpp המציג את אגירת הרשומות בזיכרון ה-RTC ופסיקת החומרה המכוילת',
        },
        language: 'C++ / PlatformIO (ESP32-C3)',
        code: `struct HourlyRecord
{
  uint32_t ts_epoch_sec; // Unix timestamp (seconds)
  float total_kwh;       // Cumulative meter reading (kWh)
  float avg_power_watts; // Average power in interval (W)
  float battery_voltage; // Battery voltage sample (V)
};

RTC_DATA_ATTR volatile uint32_t pulse_count = 0;
RTC_DATA_ATTR uint16_t pulses_per_kwh_rtc = 100;
RTC_DATA_ATTR uint32_t debounce_time_ms = 80;
RTC_DATA_ATTR HourlyRecord rtc_records[MAX_HOURLY_RECORDS];
RTC_DATA_ATTR uint8_t rtc_records_count = 0;

void IRAM_ATTR onPulse()
{
  if (!pulse_interrupt_enabled)
    return;

  uint32_t now = millis();
  if (now - last_isr_millis > debounce_time_ms)
  {
    last_isr_millis = now;
    pulse_count++;
  }
}`,
      },
      {
        type: 'features',
        title: { en: 'Key Features', he: 'מאפיינים מרכזיים' },
        features: [
          { en: 'Non-invasive CT energy harvesting + LiPo', he: 'קצירת אנרגיה לא-פולשנית מ-CT + סוללת LiPo' },
          { en: 'Custom EasyEDA PCB with RC pulse filter', he: 'PCB ייעודי ב-EasyEDA כולל מסנן RC לפולסים' },
          { en: 'Auto-calibrated pulse-width debounce', he: 'כיול אוטומטי של זמן סינון רעשים לפי אורך פולס' },
          { en: 'ESP32-C3 deep sleep & 48h RTC batching', he: 'שינה עמוקה ב-ESP32-C3 ואגירת RTC ל-48 שעות' },
          { en: 'Self-hosted ThingsBoard MQTTS (port 8883)', he: 'שרת ThingsBoard עצמאי בתקשורת MQTTS מאובטחת' },
          { en: 'Captive Portal setup & dynamic Imp/kWh', he: 'פורטל הגדרה מובנה עם תמיכה בקבועי Imp/kWh' },
          { en: 'Companion LittleFS UART diagnostic sniffer', he: 'בקר Sniffer משלים לתיעוד לוגים ודיאגנוסטיקה בשטח' },
        ],
      },
    ],
  },
  /*
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
    image: getMediaUrl('/images/hdl/hero.png'),
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
  */
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
    image: getMediaUrl('/images/apple-pay-tracker/hero.png'),
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
        url: getMediaUrl('/clips/apple-pay-tracker/demo.mp4'),
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
    image: getMediaUrl('/images/fsm/hero.png'),
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
        url: getMediaUrl('/clips/fsm/demo.mp4'),
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
