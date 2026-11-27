import { Cpu, Code, Lock, Zap, Home, type LucideIcon } from 'lucide-react'
import type { LocalizableText, LocalizedString } from '@/lib/i18n'
import { getMediaUrl } from '@/lib/media'

export type SectionId = 'overview' | 'projects' | 'resume' | (string & {});

// --- 1. Content Block Definitions ---
export type TextBullet = { title?: LocalizedString; text: LocalizedString }
export type TextBlock = { type: 'text'; title?: LocalizedString; content: LocalizedString; bullets?: TextBullet[] }
export type VideoBlock = { type: 'video'; title?: LocalizedString; url: string }
export type CodeBlock = { type: 'code'; title?: LocalizedString; language: string; code: string; description?: LocalizedString }
export type StepsBlock = { type: 'steps'; title: LocalizedString; steps: { title: LocalizedString; description: LocalizedString }[] }
export type FeaturesBlock = { type: 'features'; title: LocalizedString; features: LocalizedString[] }
export type ImageBlock = { type: 'image'; title?: LocalizedString; url: string; alt?: LocalizedString }
export type SpecsBlock = { type: 'specs'; title: LocalizedString; description?: LocalizedString; rows: { label: LocalizedString; value: LocalizedString }[] }

// Union of supported blocks
export type ContentBlock = TextBlock | VideoBlock | CodeBlock | StepsBlock | FeaturesBlock | ImageBlock | SpecsBlock;

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
      en: 'SmartEC: Automated Meter Reader for Landlords',
      he: 'SmartEC: קורא מוני חשמל אוטומטי לבעלי דירות מושכרות',
    },
    description: {
      en: 'Low-cost, one-time DIN-rail IoT meter reader for rental unit owners—requiring no electrician or panel power outlet. Harvests energy from a clip-on CT on the water-heater phase (SCT-013-000 + BQ25570) into an 800 mAh LiPo, reads internal optocoupler pulses, and runs at 45–60 µA in deep sleep.',
      he: 'מערכת IoT זולה יחסית להתקנה חד-פעמית על פס DIN עבור בעלי יחידות דיור מושכרות — ללא חשמלאי וללא שקע בארון החשמל. קוצרת אנרגיה משנאי זרם על קו הדוד (SCT-013-000 + BQ25570) לסוללת 800mAh, קוראת פולסים מהאופטוקופלר של המונה, וצורכת 45–60 µA בשינה.',
    },
    pageDescription: {
      en: 'An autonomous, low-cost IoT device that brings automated remote electricity meter reading to rental units—with a one-time installation that requires no electrician and no wall outlet in the panel. Powered by harvesting energy directly from the phase wire, it runs maintenance-free and streams usage straight to the cloud.',
      he: 'מכשיר IoT עצמאי וזול יחסית המיועד לבעלי דירות מושכרות, ומאפשר קריאת מוני חשמל אוטומטית מרחוק בהתקנה חד-פעמית ללא חשמלאי וללא שקע בארון החשמל. המערכת קוצרת אנרגיה ישירות מגיד הפאזה, פועלת לאורך זמן ללא תחזוקה ומשדרת את נתוני הצריכה ישירות לענן.',
    },
    tags: [
      'ESP32-C3',
      'BQ25570 · SCT-013-000',
      { en: 'ENERGY HARVESTING', he: 'קצירת אנרגיה' },
      'EASYEDA PCB',
      'THINGSBOARD / MQTTS',
    ],
    icon: Zap,
    glyph: 'SCT-013 · BQ25570 · ESP32-C3',
    image: getMediaUrl('/images/smart-meter/%D7%94%D7%93%D7%9E%D7%99%D7%94.jpg'),
    contentBlocks: [
      {
        type: 'text',
        title: {
          en: 'The Need: Eliminating Monthly Tenant Meter Chasing',
          he: 'הצורך: סוף לבקשות הקריאה החודשיות מהשוכר',
        },
        content: {
          en: 'Landlords of rented apartments and split housing units typically have to ask their tenants for a manual electricity meter reading every single month—a tedious, friction-filled routine that depends on reminders, photos, and manual billing.\n\nThe goal of SmartEC was to build a product that removes that burden completely through automated remote reading. Unlike existing off-the-shelf smart meters or commercial telemetry gateways, SmartEC is designed so anyone can install it in minutes inside a DIN-rail box—without hiring an electrician—and at a fraction of the cost of commercial shelf products.',
          he: 'בעלי דירות מושכרות ויחידות דיור נדרשים מדי חודש לבקש מהשוכר לצלם או לשלוח את קריאת מונה החשמל — תהליך מתיש, מסורבל ותלוי בתזכורות חוזרות משני הצדדים.\n\nהמטרה של SmartEC היא לחסוך לחלוטין את הצורך הזה באמצעות קריאת מונים אוטומטית מרחוק. בשונה ממוצרי מדף קיימים בשוק שדורשים בעל מקצוע או עלויות גבוהות, המערכת תוכננה כך שכל אחד יוכל להתקין אותה בעצמו בהתקנה חד-פעמית על פס DIN — ללא צורך בחשמלאי ובמחיר זול משמעותית ביחס לפתרונות המדף.',
        },
      },
      {
        type: 'text',
        title: {
          en: 'The Engineering Problem: Autonomous Power & Bulletproof Accuracy',
          he: 'הבעיה ההנדסית: אספקת אנרגיה עצמאית ומדידה אמינה ומדויקת',
        },
        content: {
          en: 'Designing for a DIY, electrician-free installation creates two core engineering problems that standard ESPHome/Wi-Fi readers (which draw 50–80 mA continuously) cannot solve:\n\n1. Powering the hardware without tapping live mains: Because the installer must never touch 230 V panel wiring—and Israeli electrical panels rarely have a free outlet—the system has to harvest its own energy non-invasively from inside the panel and survive on ultra-low quiescent power.\n2. Ultra-reliable, accurate metering and transmission: Every pulse from the private sub-meter’s internal optocoupler must be captured with zero false counts and zero missed pulses across deep-sleep wakeups, electromagnetic panel noise, power interruptions, and attenuated Wi-Fi behind metal cabinet doors.',
          he: 'הדרישה להתקנה פשוטה ללא חשמלאי מייצרת שתי בעיות הנדסיות מרכזיות שפתרונות Wi-Fi רגילים (שצורכים 50–80mA ברציפות) לא פותרים:\n\n1. השגת אנרגיה ללא חיבור לרשת החשמל: מכיוון שאסור לחבר את המוצר ישירות לקווי מתח חי בארון החשמל (ובארון גם אין שקע פנוי), המערכת חייבת לקצור אנרגיה באופן לא-פולשני מתוך הארון עצמו ולעבוד במאזן אנרגטי חיובי על סוללה.\n2. מעקב מונה ושידור אמינים ומדויקים ביותר: קליטת כל פולס ופולס מהאופטוקופלר הפנימי של המונה הפרטי ללא כפילויות וללא פספוסים — גם מול רעשים אלקטרומגנטיים בלוח, מחזורי Deep Sleep, הפסקות חשמל וקליטת Wi-Fi מוחלשת מאחורי דלת ארון מתכתית.',
        },
      },
      {
        type: 'video',
        title: { en: 'Demo & Walkthrough', he: 'הדגמה והסבר' },
        url: getMediaUrl('/clips/smart-meter/final.mp4'),
      },
      {
        type: 'text',
        title: {
          en: 'Hurdle 1: Current Source (CT) vs. Voltage-Source MPPT (BQ25570)',
          he: 'אתגר 1: התנגשות פיזיקלית — שנאי זרם מול שבב MPPT',
        },
        content: {
          en: 'The energy subsystem pairs a split-core SCT-013-000 current transformer (1:2000 ratio, no internal burden resistor) clamped onto the water-heater phase wire with a TI BQ25570 (CJMCU-25570) harvesting into a 3.7 V, 800 mAh lithium battery. Because the BQ25570 was designed for voltage sources like solar cells, every 16 s it disconnects the load for 256 ms to sample open-circuit voltage (Voc). Unloading a current transformer drives an immediate voltage spike that exceeds the IC’s 5.5 V destruction threshold within seconds (before the CT’s internal ±7.5 V to ±22 V zeners clamp), while the ferrite core saturates above 1.5–2.0 V RMS (Xm ≈ 3,140 Ω at 50 Hz).\n\nThe solution — a custom-designed front-end stage:',
          he: 'לב מערכת האנרגיה מחבר שנאי זרם מתלבש מדגם SCT-013-000 (יחס 1:2000, ללא נגד עומס פנימי) על גיד הפאזה של דוד השמש אל שבב קצירת האנרגיה BQ25570 (מודול CJMCU-25570), הטוען סוללת ליתיום 3.7V בקיבולת 800mAh. הקושי ההנדסי הוא שה-BQ25570 תוכנן למקורות מתח כמו פאנלים סולאריים, ולכן כל 16 שניות הוא מנתק את העומס ל-256ms כדי לדגום את מתח המעגל הפתוח (Voc). ניתוק עומס משנאי זרם מקפיץ מיד את המתח מעבר לסף ההרס של השבב (5.5V) עוד לפני שהזנרים הפנימיים נפתחים (±7.5V עד ±22V), ובמקביל ליבת הפריט נכנסת לרוויה מגנטית מעל 1.5–2.0V RMS (Xm ≈ 3,140 Ω ב-50Hz).\n\nהפתרון לבעיה — דרגת כניסה מותאמת אישית:',
        },
        bullets: [
          {
            title: {
              en: 'Solution 1 — Low-Drop Schottky Rectification',
              he: 'פתרון 1 — יישור דל-מפל',
            },
            text: {
              en: 'Replaced standard ~1.4 V silicon bridges with a 4× 1N5817 Schottky Graetz bridge (~0.22 V per diode), verified on the bench converting 550 mV AC into 330 mV DC.',
              he: 'במקום גשר סיליקון סטנדרטי שהיה מפיל ~1.4V, נבנה גשר גרץ מארבע דיודות שוטקי 1N5817 עם מפל של ~0.22V לדיודה בלבד (אומת במדידה: 550mV AC מומרים ל-330mV DC).',
            },
          },
          {
            title: {
              en: 'Solution 2 — Dual-Purpose Voltage Clamping & MPPT Lock',
              he: 'פתרון 2 — קטימת מתח, נעילת MPPT ויעילות כפולה עם נורת הלד',
            },
            text: {
              en: 'Two DB107 silicon bridges wired in series forward-biased alongside a red LED and 47 µF smoothing capacitor clamp voltage cleanly around 2.4–2.5 V. Since CJMCU-25570 is fixed at 80% MPPT, this protects the IC from overvoltage and locks operating voltage at ~1.9–2.0 V right before core saturation. Using the LED achieves double efficiency: it acts directly as part of the voltage-clamping diode path while simultaneously serving as a live visual indicator that the harvesting/charging circuit is active.',
              he: 'שני גשרי יישור סיליקון (DB107) חוברו בטור בקוטביות קדמית לצד נורת LED אדומה וקבל החלקה של 47µF ליצירת קטימה מדויקת סביב 2.4–2.5V. מכיוון שמודול CJMCU-25570 מכויל קבוע ל-80% MPPT, הקטימה מגנה על השבב משריפה ונועלת את מתח העבודה סביב 1.9–2.0V — בדיוק בנקודת ההספק המקסימלי לפני רוויית הליבה. שילוב נורת הלד מעניק יעילות כפולה: היא משמשת גם כדיודה קוטמת מתח במעגל ההגנה, וגם כחיווי ויזואלי מיידי לכך שמעגל הטעינה נמצא בפעולה.',
            },
          },
        ],
      },
      {
        type: 'image',
        title: {
          en: 'Rectification & Clamping Stage (Breadboard Test)',
          he: 'דרגת היישור וקטימת המתח (בדיקה על מטריצה)',
        },
        url: getMediaUrl('/images/smart-meter/diode-bridge.png'),
        alt: {
          en: 'Custom 1N5817 Schottky bridge and DB107 voltage clamping circuit with LED indicator',
          he: 'גשר שוטקי 1N5817 ומעגל קטימת המתח עם DB107 ונורת הלד',
        },
      },
      {
        type: 'text',
        title: {
          en: 'Hurdle 2: Hunting Microamps to Reach Net-Positive Balance',
          he: 'אתגר 2: המלחמה על המיקרו-אמפרים — לצוד זליגות סמויות',
        },
        content: {
          en: 'Under a 10–12 A water heater load, the circuit harvests ~1.85–2.05 mA into the battery (~2.5–3.0 mAh per 1–1.5 h daily heating cycle). For net-positive autonomy, total average consumption had to fall well below 100 µA—yet early field runs showed 11–14 mV overnight voltage drops (~1.0–1.3 mA average draw). Systematic isolation revealed two hidden quiescent drains.\n\nThe solution — eliminating both quiescent drains:',
          he: 'כאשר דוד השמש פועל (10–12A), המערכת קוצרת לסוללה ~1.85–2.05mA — כלומר שעה עד שעה וחצי של דוד ביום מכניסות כ-2.5–3.0mAh. כדי לשמור על עודף אנרגטי, הצריכה הממוצעת של המעגל כולו חייבת לרדת מתחת ל-100µA. בניסויי השטח הראשונים נמדדה ירידת מתח לילית של 11–14mV (צריכה ממוצעת של ~1.0–1.3mA) לאחר שהתגלו שני "גנבי אנרגיה" שקטים.\n\nהפתרון לבעיה — נטרול שתי הזליגות:',
        },
        bullets: [
          {
            title: {
              en: 'Solution 1 — Removing the ESP32-C3 Onboard Power LED',
              he: 'פתרון 1 — הסרת נורת ה-Power האדומה ב-ESP32-C3',
            },
            text: {
              en: 'The SuperMini’s red power LED alone drew 0.64–1.40 mA continuously—15× to 30× more than the rest of the sleeping system. Physically removing it extended standalone battery autonomy (zero charging) from ~24 days to ~267 days.',
              he: 'נורת ה-Power על לוח ה-SuperMini משכה לבדה 0.64–1.40mA ברציפות — פי 15 עד 30 מכל שאר המערכת במצב שינה. הסרתה הפיזית האריכה את אוטונומיית הסוללה (ללא טעינה כלל) מכ-24 ימים לכ-267 ימים.',
            },
          },
          {
            title: {
              en: 'Solution 2 — Disabling the BQ25570 Idle Buck Converter',
              he: 'פתרון 2 — ניתוק ממיר ה-Buck הפנימי של ה-BQ25570',
            },
            text: {
              en: 'Tying V_OK to V_EN kept the BQ25570’s internal Buck regulator idling at 200 µA constantly. Disconnecting V_EN and powering the ESP32-C3 directly from VBAT through its low-dropout LDO cut total sleep draw down to ~45–60 µA.',
              he: 'חיבור פין V_OK אל V_EN השאיר את ממיר המתח הפנימי דולק בסרק וצרך 200µA קבועים. ניתוק V_EN והזנת ה-ESP32-C3 ישירות מהסוללה דרך מייצב ה-LDO הפנימי חתכו את זרם השינה הכולל ל-45–60 µA בלבד.',
            },
          },
        ],
      },
      {
        type: 'image',
        title: {
          en: 'Working Harvesting & ESP32-C3 Prototype',
          he: 'אב-הטיפוס הפעיל: קצירת אנרגיה, טעינה ובקר ESP32-C3',
        },
        url: getMediaUrl('/images/smart-meter/prototype.png'),
        alt: {
          en: 'SmartEC prototype with SCT-013-000 CT, BQ25570 charger, 800 mAh LiPo battery, and ESP32-C3',
          he: 'אב-טיפוס SmartEC הכולל שנאי זרם SCT-013-000, רכיב BQ25570, סוללת 800mAh ובקר ESP32-C3',
        },
      },
      {
        type: 'text',
        title: {
          en: 'Hurdle 3: Wi-Fi RF Stability, Brownouts & Batch Telemetry',
          he: 'אתגר 3: יציבות שידור Wi-Fi, מניעת Brownout ואמינות נתונים',
        },
        content: {
          en: 'Waking from deep sleep into Wi-Fi transmission drives sharp 150–250 mA current pulses that initially triggered brownout resets. Overnight logs also exposed missing early-morning samples (04:00–07:00)—a known SuperMini issue where the ceramic antenna sits adjacent to the 40 MHz crystal and disrupts RF lock at maximum TX power.\n\nThe solution — combined hardware & firmware hardening:',
          he: 'במעבר משינה עמוקה לשידור Wi-Fi, צריכת ה-ESP32-C3 קופצת ממיקרו-אמפרים לפולסים חדים של 150–250mA שגרמו בתחילה לאתחולי נפילת מתח (Brownout). בנוסף, מדידות לילה גילו אובדן דגימות בשעות הקרות לפנות בוקר (04:00–07:00), תופעה מוכרת בלוחות SuperMini שבהם האנטנה הקרמית צמודה לגביש ה-40MHz ומשבשת את נעילת ה-RF בהספק שידור מרבי.\n\nהפתרון לבעיה — שילוב חומרה וקושחה יחד:',
        },
        bullets: [
          {
            title: {
              en: 'Solution 1 — Local 220 µF Bulk Cap + 8.5 dBm TX Cap',
              he: 'פתרון 1 — קבל גיבוי 220µF + כיול הספק שידור ל-8.5dBm',
            },
            text: {
              en: 'Placed a 220 µF capacitor directly across the ESP32-C3 supply pins to absorb RF transients, and capped TX power at WIFI_POWER_8_5dBm—eliminating crystal interference and cutting peak TX current nearly in half (~250 mA → ~130 mA).',
              he: 'הוצב קבל 220µF בצמוד לפיני ההזנה לספיגת פולסי ה-RF, והגבלת המשדר ל-WIFI_POWER_8_5dBm העלימה את הפרעות ה-RF לגביש וחתכה את זרם השיא בכמעט חצי (מ-~250mA ל-~130mA).',
            },
          },
          {
            title: {
              en: 'Solution 2 — RTC Batching & MQTTS to Self-Hosted ThingsBoard',
              he: 'פתרון 2 — אגירת RTC ל-48 שעות ושידור מרוכז ל-ThingsBoard',
            },
            text: {
              en: 'Eliminated silent MQTT drops by expanding PubSubClient’s buffer to 8 KB, flushing client.loop(), and disconnecting cleanly before sleep. Waking hourly for <10 ms with Wi-Fi OFF to log NTP-timestamped HourlyRecord structs in RTC_DATA_ATTR—then transmitting every 12 hours to a self-hosted ThingsBoard VM—cuts up to 95% of Wi-Fi energy and prevents data loss during outages.',
              he: 'נפתרו נפילות שקטות של חבילות MQTT ע"י הגדלת חוצץ PubSubClient ל-8KB, קריאות client.loop() וניתוק יזום לפני שינה. הבקר מתעורר מדי שעה עם רדיו כבוי לפחות מ-10ms לשמירת דגימות ב-RTC_DATA_ATTR עם חותמת זמן NTP, ומשדר מרוכז כל 12 שעות אל שרת ThingsBoard עצמאי בענן — מה שחוסך עד 95% מאנרגיית ה-Wi-Fi ומונע אובדן מידע בניתוקי רשת.',
            },
          },
        ],
      },
      {
        type: 'steps',
        title: {
          en: 'From Prototype to Custom PCB & End-to-End Architecture',
          he: 'מאב-טיפוס ל-PCB ייעודי וארכיטקטורת המערכת',
        },
        steps: [
          {
            title: {
              en: 'Custom 2-Layer EasyEDA PCB & RF Keepout (In Fabrication)',
              he: 'תכנון PCB דו-שכבתי ב-EasyEDA ואזור Keepout ל-RF (הודפס וממתין להגעה)',
            },
            description: {
              en: 'Converted the validated prototype into smartMeterPCB in EasyEDA Pro (Through-Hole components for easy assembly inside a DIN-rail housing, with JLCPCB Gerbers). Rotated the ESP32-C3 90° so the ceramic antenna sits over a dual-layer copper-free RF Keepout zone, accommodated CJMCU-25570’s mixed 3.50 mm / 2.54 mm pin pitch, and added a manual TX trigger on GPIO 5. The PCB has been fabricated and is awaiting delivery.',
              he: 'האב-טיפוס הומר ללוח מודפס ייעודי (smartMeterPCB) ב-EasyEDA Pro ברכיבי Through-Hole נוחים להרכבה בתוך קופסת פס DIN (עם קובצי Gerber ל-JLCPCB). בקר ה-ESP32-C3 סובב ב-90° מעל אזור Keepout נקי מנחושת בשתי השכבות, טופלו מרווחי הרגליים השונים של מודול ה-CJMCU-25570 (3.50mm מול 2.54mm), ונוסף כפתור שידור ידני על GPIO 5. הלוח כבר הודפס וממתין להגעה להרכבה סופית.',
            },
          },
          {
            title: {
              en: 'Optocoupler Pulse Conditioning & Dual Battery Protection',
              he: 'קליטת פולסים מהאופטוקופלר והגנת סוללה דו-שכבתית',
            },
            description: {
              en: 'The private sub-meter’s internal optocoupler output connects to GPIO 4 (RTC wakeup) through a hardware RC filter (series resistor + 100 nF ceramic cap) against panel EMI and bounce. BQ25570 enforces hardware overcharge stop (4.07 V) and V_OK (2.85 V), while firmware samples an ADC1 divider on GPIO 0 via eFuse-calibrated analogReadMilliVolts() (±5–15 mV accuracy in ~4 ms) and skips Wi-Fi transmission below 3.2 V.',
              he: 'יציאת האופטוקופלר הפנימית של המונה הפרטי מחוברת ל-GPIO 4 דרך מסנן RC חומרתי (נגד טורי + קבל קרמי 100nF) לסינון הפרעות אלקטרומגנטיות ו-Bounce. ה-BQ25570 מגן בחומרה (עצירת טעינה ב-4.07V ודגל V_OK ב-2.85V), ובמקביל הקושחה דוגמת מחלק מתח ב-GPIO 0 באמצעות כיול eFuse הפנימי (analogReadMilliVolts, דיוק ±5–15mV ב-4ms בלבד) ומדלגת על שידור מתחת ל-3.2V.',
            },
          },
          {
            title: {
              en: 'Captive Portal & Dynamic Pulse Calibration (SmartMeter-Setup)',
              he: 'פורטל הגדרה מובנה וכיול אוטומטי של אורך הפולס',
            },
            description: {
              en: 'On first boot or BOOT press, launches SmartMeter-Setup (192.168.4.1). A live test measures two consecutive optocoupler pulse widths via microsecond interrupts, sets adaptive debounce (pulse width + 30 ms), and configures per-meter Imp/kWh constants (e.g., 100 Imp/kWh for NISKO) plus starting kWh synchronization.',
              he: 'בהתקנה ראשונית או לחיצת BOOT נפתח פורטל SmartMeter-Setup (בכתובת 192.168.4.1). בדיקת חיבור חיה מודדת שני פולסים רצופים ברזולוציית מיקרו-שניות, קובעת זמן סינון רעשים מותאם (אורך הפולס + 30ms), ומאפשרת הזנת קבוע המונה (כגון 100 Imp/kWh במוני NISKO) וסנכרון קריאה התחלתית.',
            },
          },
          {
            title: {
              en: 'Companion UART Diagnostic Sniffer (logger_c3) & Lab Stress Tests',
              he: 'בקר Sniffer פסיבי לדיבאגינג בשטח ובדיקות מעבדה',
            },
            description: {
              en: 'Built a companion ESP32-C3 logger (80 MHz, Wi-Fi off by default) that passively sniffs UART logs, strips Espressif ROM bootloader noise, persists up to 1.5 MB of wakeup sessions to LittleFS, and exposes a toggleable Wi-Fi web console. Validated with 100-pulse accuracy benchmarks, <80 ms bounce injection, mid-TX network drops, and power-loss Flash tests.',
              he: 'פותח בקר לוגר משלים (ESP32-C3 ב-80MHz, Wi-Fi כבוי כברירת מחדל) המאזין פסיבית לקו ה-UART, מסנן רעשי Bootloader, שומר עד 1.5MB ב-LittleFS ופותח ממשק Web ב-Wi-Fi בלחיצת כפתור. המערכת אומתה בבדיקות דיוק 100 פולסים, הזרקת רעשים מתחת ל-80ms, ניתוקי רשת באמצע שידור והפסקות מתח בזמן כתיבה ל-Flash.',
            },
          },
        ],
      },
      {
        type: 'image',
        title: {
          en: '2-Layer PCB Layout (EasyEDA Pro)',
          he: 'פריסת ה-PCB הדו-שכבתית (EasyEDA Pro)',
        },
        url: getMediaUrl('/images/smart-meter/PCBlayout.png'),
        alt: {
          en: 'Custom 2-layer EasyEDA Pro PCB layout with RF keepout zone and RC pulse filter',
          he: 'פריסת ה-PCB הדו-שכבתית ב-EasyEDA Pro עם אזור RF Keepout ומסנן RC',
        },
      },
      {
        type: 'specs',
        title: {
          en: 'Technical Specifications & Field Validation',
          he: 'מפרט טכני ותוצאות אימות בשטח',
        },
        description: {
          en: 'Full 24-hour field trials confirmed a net-positive energy balance—1 to 1.5 hours of daily water heater usage covers the entire 24-hour system budget and yields a net battery gain of +2 mV/day or more.',
          he: 'ניסויי שטח לאורך מחזורי יממה שלמים הוכיחו שהמערכת מתייצבת על מאזן אנרגטי חיובי (Net Positive) — שעה עד שעה וחצי של הפעלת דוד שמש ביום מכסות את צריכת היממה כולה ומייצרות עלייה נטו של מתח הסוללה (+2mV ומעלה ליממה).',
        },
        rows: [
          {
            label: { en: 'MCU & Communication', he: 'בקר ותקשורת' },
            value: {
              en: 'ESP32-C3 SuperMini, TX-limited Wi-Fi (8.5 dBm), MQTTS (port 8883) to self-hosted ThingsBoard',
              he: 'ESP32-C3 SuperMini, Wi-Fi בהספק מבוקר (8.5dBm), תקשורת MQTTS לשרת ThingsBoard עצמאי',
            },
          },
          {
            label: { en: 'Energy Source', he: 'מקור אנרגיה' },
            value: {
              en: 'SCT-013-000 split-core CT (1:2000) on water-heater phase — zero contact with live AC conductors',
              he: 'שנאי זרם SCT-013-000 (1:2000) על פאזת הדוד — ללא מגע במוליך חי',
            },
          },
          {
            label: { en: 'Harvesting & Clamping Stage', he: 'דרגת קצירה וייצוב' },
            value: {
              en: '4× 1N5817 Schottky bridge, 2× DB107 clamping + 47 µF cap, TI BQ25570 (CJMCU-25570)',
              he: 'גשר שוטקי 4×1N5817, קטימת 2×DB107 + קבל 47µF, בקר BQ25570',
            },
          },
          {
            label: { en: 'Storage & Protection', he: 'מאגר אנרגיה והגנה' },
            value: {
              en: '3.7 V LiPo (800 mAh), 220 µF local cap, HW V_OK (2.85 V) / stop (4.07 V) + FW ADC cutoff (3.2 V)',
              he: 'סוללת LiPo 3.7V (800mAh), קבל גיבוי 220µF, הגנת V_OK (2.85V) + סף ADC תוכנתי (3.2V)',
            },
          },
          {
            label: { en: 'Harvesting Rate (Heater ON)', he: 'קצב טעינה (דוד פעיל)' },
            value: {
              en: '~1.85–2.05 mA (~2.5–3.0 mAh per average 1–1.5 h daily cycle)',
              he: '~1.85mA–2.05mA (כ-2.5mAh–3.0mAh ליום עבודה ממוצע)',
            },
          },
          {
            label: { en: 'Average Sleep Current', he: 'צריכת שינה ממוצעת' },
            value: {
              en: '~45–60 µA (after removing onboard Power LED and disconnecting internal Buck)',
              he: '~45µA–60µA (לאחר הסרת נורת ה-Power וניתוק ממיר ה-Buck הפנימי)',
            },
          },
          {
            label: { en: 'Zero-Charge Autonomy', he: 'עמידות ללא טעינה' },
            value: {
              en: '~267 days continuous operation on the 800 mAh battery alone',
              he: 'כ-267 ימי עבודה רצופים על סוללת ה-800mAh כמאגר גישור',
            },
          },
          {
            label: { en: 'Hardware & Enclosure', he: 'תכנון חומרה ומארז' },
            value: {
              en: 'Custom 2-layer EasyEDA Pro PCB with RF Keepout & RC pulse filter, built for DIN-rail enclosure',
              he: 'PCB דו-שכבתי ייעודי ב-EasyEDA Pro עם אזור Keepout ל-RF ומסנן RC לפולסים, בקופסה לפס DIN',
            },
          },
        ],
      },
      {
        type: 'features',
        title: { en: 'Key Features', he: 'מאפיינים מרכזיים' },
        features: [
          { en: 'No electrician or panel outlet required (DIN-rail)', he: 'ללא חשמלאי וללא שקע בארון החשמל (פס DIN)' },
          { en: 'SCT-013-000 + BQ25570 phase energy harvesting', he: 'קצירת אנרגיה מפאזה: SCT-013-000 + BQ25570' },
          { en: '45–60 µA sleep draw (~267 days no-charge runtime)', he: 'צריכת שינה 45–60 µA (~267 ימים ללא טעינה)' },
          { en: 'Net-positive daily energy balance (+2 mV/day+)', he: 'מאזן אנרגטי יומי חיובי (+2mV ומעלה ליממה)' },
          { en: 'Reads internal optocoupler + HW RC filter', he: 'קריאה מאופטוקופלר פנימי + מסנן RC חומרתי' },
          { en: 'Custom 2-layer EasyEDA PCB with RF Keepout', he: 'PCB דו-שכבתי ייעודי ב-EasyEDA עם RF Keepout' },
          { en: '48h RTC batching to self-hosted ThingsBoard', he: 'אגירת RTC ל-48 שעות ושידור MQTTS ל-ThingsBoard' },
          { en: 'Captive Portal auto-calibration + UART sniffer', he: 'כיול פולס אוטומטי בפורטל + בקר Sniffer לדיבאג' },
        ],
      },
    ],
  },
  {
    id: 'smart-home',
    category: 'hardware',
    label: {
      en: 'HOME AUTOMATION · IOT · ESP32',
      he: 'בית חכם · IoT · ESP32',
    },
    title: {
      en: 'Custom Smart Home System: Raspberry Pi & ESP32',
      he: 'מערכת בית חכם מותאמת אישית: Raspberry Pi ו-ESP32',
    },
    description: {
      en: 'DIY smart-home ecosystem built on a Raspberry Pi (HAOS) hub and ESP32-C3 nodes over MQTT. Retrofits legacy non-IoT appliances—live Shabbat automation for the refrigerator via Jewish Calendar with phone alerts, plus in-progress IR ceiling fan control.',
      he: 'מערכת בית חכם עצמאית המבוססת על רכזת Raspberry Pi (HAOS) ובקרי ESP32-C3 בתקשורת MQTT. מחברת מכשירי חשמל רגילים לשליטה חכמה, אוטומציית שבת מבוססת Jewish Calendar והתראות לטלפון — כולל מקרר מחובר ושליטת IR למאוורר תקרה בפיתוח.',
    },
    pageDescription: {
      en: 'A custom smart-home platform centered around a Raspberry Pi running Home Assistant OS (HAOS) and compact ESP32-C3 controllers. It brings unified control, mobile notifications, and automated Jewish Calendar Shabbat scheduling to everyday appliances that lack built-in IoT support.',
      he: 'מערכת בית חכם מותאמת אישית שבמרכזה רכזת Raspberry Pi עם Home Assistant OS (HAOS) ובקרי ESP32-C3 זעירים. הפרויקט מחבר מכשירי חשמל ביתיים שאינם תומכים ב-IoT מהמפעל לשליטה מרוכזת, התראות לטלפון ואוטומציית מצב שבת אוטומטית.',
    },
    tags: [
      'RASPBERRY PI (HAOS)',
      'HOME ASSISTANT',
      'ESP32-C3',
      'MQTT AUTO-DISCOVERY',
      'OTA / IR',
    ],
    icon: Home,
    glyph: 'HAOS · ESP32-C3 · MQTT',
    image: getMediaUrl('/images/smart-home/hero.png'),
    contentBlocks: [
      {
        type: 'text',
        title: {
          en: 'The Need: Smart Control & Shabbat Automation for Legacy Appliances',
          he: 'הצורך: הפיכת מכשירי חשמל רגילים לחכמים ואוטומציית שבת',
        },
        content: {
          en: 'Most standard household appliances—refrigerators, water dispensers, ceiling fans, and washing machines—ship without native IoT connectivity or automated Shabbat-mode scheduling. Replacing working appliances with smart models is expensive and unnecessary.\n\nThe goal of this project is to retrofit existing non-IoT appliances with tiny, low-cost ESP32-C3 controllers managed from a single local hub on a Raspberry Pi, enabling automated Jewish Calendar Shabbat transitions, remote control, and mobile alerts without changing how the appliances work day-to-day.',
          he: 'רוב מכשירי החשמל הביתיים — מקררים, ברי מים, מאווררי תקרה ומכונות כביסה — מגיעים מהמפעל ללא תמיכה ב-IoT או באוטומציית מצב שבת, והחלפת מכשירים תקינים בדגמים חכמים יקרה ומיותרת.\n\nמטרת הפרויקט היא לחבר את המכשירים הקיימים באמצעות בקרי ESP32-C3 זעירים וזולים המנוהלים מרכזת ביתית מקומית על גבי Raspberry Pi — כדי לאפשר מעבר אוטומטי למצב שבת לפי לוח השנה העברי, שליטה מרחוק והתראות לטלפון.',
        },
      },
      {
        type: 'text',
        title: {
          en: 'Hub & Firmware Architecture: HAOS, MQTT Auto-Discovery & OTA',
          he: 'ארכיטקטורת הרכזת והקושחה: HAOS, גילוי אוטומטי ו-OTA',
        },
        content: {
          en: 'A Raspberry Pi running Home Assistant OS (HAOS) serves as the local brain and MQTT broker—firing Jewish Calendar automations around candle-lighting and Havdalah and pushing status notifications directly to the phone. On the edge, all controllers share a unified PlatformIO codebase (common/config.h and common/ota.h) built around two core capabilities:',
          he: 'המוח המרכזי הוא Raspberry Pi המריץ Home Assistant OS (HAOS) ושרת MQTT מקומי, המפעיל אוטומציות דרך אינטגרציית Jewish Calendar ושולח התראות Push לטלפון. בצד הקצה, כל הבקרים חולקים תשתית PlatformIO משותפת (common/config.h ו-common/ota.h) המבוססת על שני עקרונות:',
        },
        bullets: [
          {
            title: {
              en: 'MQTT Auto-Discovery & Availability (LWT)',
              he: 'גילוי אוטומטי ב-Home Assistant וניטור זמינות (LWT)',
            },
            text: {
              en: 'Each ESP32-C3 node publishes JSON discovery payloads (homeassistant/.../config) on connection so switches, fans, lights, buttons, and sensors register automatically inside Home Assistant with Last-Will online/offline tracking.',
              he: 'כל בקר משדר עם ההתחברות הגדרות JSON בפורמט Auto-Discovery של Home Assistant, כך שהמתגים, המאוורר, התאורה והחיישנים מופיעים אוטומטית במערכת כולל חיווי זמינות (Online/Offline).',
            },
          },
          {
            title: {
              en: 'Wireless OTA Firmware Updates',
              he: 'עדכוני קושחה אלחוטיים (OTA)',
            },
            text: {
              en: 'Configured with min_spiffs.csv (1.9 MB app partition) and ArduinoOTA, allowing firmware upgrades over Wi-Fi without opening appliance enclosures or reconnecting USB cables.',
              he: 'מחיצות הזיכרון (min_spiffs.csv) ומימוש ArduinoOTA מאפשרים צריבת גרסאות חדשות דרך ה-Wi-Fi, בלי לפרק את הבקרים מתוך מכשירי החשמל.',
            },
          },
        ],
      },
      {
        type: 'video',
        title: {
          en: 'Live Demo: Refrigerator Shabbat Mode Control',
          he: 'הדגמה חיה: שליטה במצב שבת במקרר',
        },
        url: getMediaUrl('/clips/smart-home/demo.mp4'),
      },
      {
        type: 'steps',
        title: {
          en: 'Connected Devices & Development Stages',
          he: 'הבקרים במערכת ושלבי הפיתוח',
        },
        steps: [
          {
            title: {
              en: 'Refrigerator Shabbat Controller — Live & Connected (kitchen_controller)',
              he: 'בקר מקרר למצב שבת — מחובר ופועל (kitchen_controller)',
            },
            description: {
              en: 'Connected in series to the refrigerator’s door-switch circuit through a galvanically isolated optocoupler on GPIO 5 (HIGH conducts on weekdays; LOW disconnects the circuit for Shabbat so opening the door does not trigger lights/electronics). The unified firmware also integrates non-blocking 5.5 s parallel button-press logic (GPIO 4) for a water dispenser synced on the shared smartHome/shabbat/set channel.',
              he: 'מחובר בטור למעגל מפסק הדלת של המקרר דרך אופטוקופלר לבידוד גלווני על GPIO 5 (מוציא HIGH ביום חול ומנתק את המעגל ב-LOW במצב שבת כדי שפתיחת הדלת לא תפעיל נורה/חיווי). הקושחה המאוחדת כוללת גם שליטה לבר מים (לחיצה מקבילית לא-חוסמת של 5.5 שניות ב-GPIO 4) המסונכרנת בערוץ שבת משותף.',
            },
          },
          {
            title: {
              en: 'Ceiling Fan IR Bridge — Currently in Development (ceiling_fan)',
              he: 'בקר מאוורר תקרה באינפרא-אדום — בפיתוח פעיל (ceiling_fan)',
            },
            description: {
              en: 'Emulates the ceiling fan’s original infrared remote using an IR transmitter LED on GPIO 3 alongside a VS1838B IR receiver on GPIO 2 in continuous learning mode (IRremote). Incoming remote presses are decoded and printed as ready-to-paste IRCode structs over Serial, exposing 3-speed fan control (off/low/medium/high) and smart Toggle light synchronization to Home Assistant.',
              he: 'מחקה את שידורי שלט ה-IR המקורי של מאוורר התקרה באמצעות דיודת שידור IR ב-GPIO 3 ומקלט VS1838B ב-GPIO 2 במצב למידה רציף (IRremote). לחיצות מהשלט המקורי מפוענחות ומודפסות להעתקה ישירה לקוד, וחושפות ל-Home Assistant שליטה ב-3 מהירויות ובמצב התאורה (כולל לחצן היפוך לסנכרון).',
            },
          },
          {
            title: {
              en: 'Jewish Calendar Automations & Mobile Alerts (HAOS)',
              he: 'אוטומציות Jewish Calendar והתראות לטלפון (HAOS)',
            },
            description: {
              en: 'Home Assistant on the Raspberry Pi uses the Jewish Calendar integration to trigger Shabbat entry and exit commands automatically over MQTT and send push notifications to the phone confirming appliance status changes.',
              he: 'מערכת Home Assistant על ה-Raspberry Pi משתמשת באינטגרציית Jewish Calendar כדי להפעיל ולכבות מצב שבת אוטומטית לפני כניסת שבת ובצאתה דרך MQTT, ולשלוח התראות אישור לטלפון הנייד.',
            },
          },
          {
            title: {
              en: 'Washing Machine Cycle Monitor — Firmware Scaffold (washing_machine)',
              he: 'בקר מכונת כביסה — תשתית קושחה מוכנה (washing_machine)',
            },
            description: {
              en: 'Prepared a dedicated state-machine controller (IDLE → RUNNING → FINISHED) with 10 s startup debounce, 90 s quiet completion detection, and a Home Assistant binary_sensor for cycle-done phone alerts—abstracted behind isSensorDetectingActivity() for future vibration, CT current, or I2C accelerometer attachment.',
              he: 'הוכנה קושחת מכונת מצבים (IDLE → RUNNING → FINISHED) עם סינון תחילת עבודה (10 שניות), זיהוי סיום לאחר 90 שניות שקט, וחיישן בינארי להתראות סיום כביסה — עם שכבת חומרה גמישה (isSensorDetectingActivity) לחיבור עתידי של חיישן רטט, זרם או תאוצה.',
            },
          },
        ],
      },
      {
        type: 'specs',
        title: {
          en: 'System Architecture Summary',
          he: 'סיכום ארכיטקטורה ורכיבים',
        },
        rows: [
          {
            label: { en: 'Central Hub', he: 'רכזת ביתית' },
            value: {
              en: 'Raspberry Pi running Home Assistant OS (HAOS) + Mosquitto MQTT Broker',
              he: 'Raspberry Pi עם מערכת Home Assistant OS (HAOS) ושרת MQTT מקומי',
            },
          },
          {
            label: { en: 'Edge Controllers', he: 'בקרי קצה' },
            value: {
              en: 'ESP32-C3 SuperMini nodes built with multi-environment PlatformIO (Arduino framework)',
              he: 'בקרי ESP32-C3 SuperMini המנוהלים בפרויקט PlatformIO רב-סביבתי',
            },
          },
          {
            label: { en: 'Live Connected Device', he: 'מכשיר מחובר ופועל' },
            value: {
              en: 'Refrigerator Shabbat controller via isolated optocoupler (GPIO 5) synced with HAOS',
              he: 'בקר מקרר למצב שבת דרך אופטוקופלר מבודד (GPIO 5) מסונכרן מול HAOS',
            },
          },
          {
            label: { en: 'In-Progress Node', he: 'בקר בפיתוח נוכחי' },
            value: {
              en: 'Ceiling fan IR emulator (GPIO 3 TX + GPIO 2 VS1838B RX, IRremote library)',
              he: 'בקר חיקוי שלט IR למאוורר תקרה (GPIO 3 שידור + GPIO 2 קליטה, ספריית IRremote)',
            },
          },
          {
            label: { en: 'Automations & Alerts', he: 'אוטומציות והתראות' },
            value: {
              en: 'Home Assistant Jewish Calendar integration + mobile push notifications',
              he: 'אינטגרציית Jewish Calendar לשבת/חג + התראות Push לטלפון הנייד',
            },
          },
          {
            label: { en: 'Communication & Updates', he: 'תקשורת ועדכונים' },
            value: {
              en: 'Local Wi-Fi + MQTT Auto-Discovery (ArduinoJson) + wireless ArduinoOTA',
              he: 'Wi-Fi מקומי + MQTT Auto-Discovery (ArduinoJson) + צריבה אלחוטית ArduinoOTA',
            },
          },
        ],
      },
      {
        type: 'features',
        title: { en: 'Key Features', he: 'מאפיינים מרכזיים' },
        features: [
          { en: 'Raspberry Pi HAOS hub with local MQTT', he: 'רכזת Raspberry Pi עם HAOS ו־MQTT מקומי' },
          { en: 'Jewish Calendar Shabbat automations + alerts', he: 'אוטומציות Jewish Calendar והתראות לטלפון' },
          { en: 'Live optocoupler-isolated fridge controller', he: 'בקר מקרר פעיל ומבודד באופטוקופלר' },
          { en: 'Ceiling fan IR remote cloning (in progress)', he: 'חיקוי שלט IR למאוורר תקרה (בפיתוח)' },
          { en: 'MQTT Auto-Discovery & LWT device status', he: 'גילוי ישויות אוטומטי ב-HA וניטור זמינות LWT' },
          { en: 'Wireless ArduinoOTA firmware updates', he: 'עדכוני קושחה אלחוטיים (ArduinoOTA)' },
          { en: 'Unified multi-node PlatformIO codebase', he: 'קוד בסיס אחיד ורב-סביבתי ב-PlatformIO' },
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
