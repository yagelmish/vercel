import type { LocalizableText, LocalizedString } from '@/lib/i18n'

export type ContactIconKey = 'mail' | 'briefcase' | 'code' | 'pin'

export interface HighlightItem {
  label: LocalizedString
  value: LocalizableText
}

export interface ContactItem {
  id: string
  iconKey: ContactIconKey
  label: LocalizedString
  value: LocalizableText
  href?: string
  ltrValue?: boolean
}

export const siteContent = {
  meta: {
    title: {
      en: 'Yagel Mishalov | Portfolio',
      he: 'יגל מישלוב | תיק עבודות',
    },
    description: {
      en: 'Hardware & Software Engineering Portfolio',
      he: 'תיק עבודות בהנדסת חומרה ותוכנה',
    },
  },
  brand: {
    ownerName: {
      en: 'Yagel Mishalov',
      he: 'יגל מישלוב',
    },
    portfolioTitle: {
      en: 'Projects Portfolio',
      he: 'תיק פרויקטים',
    },
  },
  sidebar: {
    navAriaLabel: {
      en: 'Portfolio sections',
      he: 'אזורי תיק העבודות',
    },
    openMenuAriaLabel: {
      en: 'Open navigation menu',
      he: 'פתח תפריט ניווט',
    },
    closeMenuAriaLabel: {
      en: 'Close navigation menu',
      he: 'סגור תפריט ניווט',
    },
    controlPanel: {
      en: 'Control Panel',
      he: 'לוח בקרה',
    },
    nav: {
      overview: {
        en: 'Overview',
        he: 'סקירה כללית',
      },
      projects: {
        en: 'Projects',
        he: 'פרויקטים',
      },
      resume: {
        en: 'Resume / Contact',
        he: 'קורות חיים / יצירת קשר',
      },
    },
    categories: {
      hardware: {
        en: 'Hardware',
        he: 'חומרה',
      },
      software: {
        en: 'Software',
        he: 'תוכנה',
      },
      learning: {
        en: 'Learning',
        he: 'למידה',
      },
    } satisfies Record<'hardware' | 'software' | 'learning', LocalizedString>,
    noProjects: {
      en: 'No projects',
      he: 'אין פרויקטים',
    },
    availability: {
      en: 'Available for Opportunities',
      he: 'זמין להזדמנויות חדשות',
    },
    languageSwitch: {
      switchToLabel: {
        en: 'עברית',
        he: 'English',
      },
      ariaLabel: {
        en: 'Switch site language to Hebrew',
        he: 'החלף את שפת האתר לאנגלית',
      },
    },
  },
  overview: {
    eyebrow: {
      en: 'OVERVIEW',
      he: 'סקירה כללית',
    },
    heading: {
      en: 'B.Sc. Electrical & Electronics Engineering Student',
      he: 'סטודנט לתואר ראשון (B.Sc.) בהנדסת חשמל ואלקטרוניקה',
    },
    bio: {
      en: 'I am a second-year Electrical and Electronics Engineering undergraduate student at Ariel University, focusing on hardware, embedded systems, and IoT. My hands-on experience includes custom PCB design (EasyEDA), microcontroller development (ESP32), energy harvesting, and sensor integration. I am currently seeking a student engineering position (available 2–3 days a week) to contribute my practical prototyping and hardware integration skills within a dynamic R&D team.',
      he: 'אני סטודנט שנה ב׳ לתואר ראשון בהנדסת חשמל ואלקטרוניקה באוניברסיטת אריאל, המתמקד בחומרה, מערכות משובצות (Embedded) ו-IoT. הניסיון המעשי שלי כולל תכנון מעגלים מודפסים מותאמים אישית (EasyEDA), פיתוח על גבי מיקרו-בקרים (ESP32), קצירת אנרגיה ושילוב חיישנים. בימים אלה אני מחפש משרת סטודנט בהנדסה (זמינות של 2–3 ימים בשבוע) כדי לתרום מכישורי הפרוטוטייפינג והאינטגרציה שלי במסגרת צוות מו״פ דינמי.',
    },
    location: {
      en: 'Israel',
      he: 'ישראל',
    },
    status: {
      en: 'Seeking a Student Position / Junior Role',
      he: 'מחפש משרת סטודנט / תפקיד ג\'וניור',
    },
    highlights: [
      {
        label: { en: 'Focus', he: 'תחום התמקדות' },
        value: {
          en: 'Hardware, Microcontrollers & PCB Design',
          he: 'חומרה, מיקרו-בקרים ועריכת מעגלים מודפסים',
        },
      },
      {
        label: { en: 'Skills', he: 'כישורים' },
        value: 'C · C++ · EasyEDA · uC · Prototyping',
      },
      {
        label: { en: 'Hardware', he: 'חומרה' },
        value: {
          en: 'ESP32, IoT, Energy Harvesting & Sensors',
          he: 'ESP32, IoT, קצירת אנרגיה וחיישנים',
        },
      },
      {
        label: { en: 'University', he: 'אוניברסיטה' },
        value: {
          en: 'Ariel University',
          he: 'אוניברסיטת אריאל',
        },
      },
    ] satisfies HighlightItem[],
  },
  projectsGrid: {
    eyebrow: {
      en: 'Academic & Personal Projects',
      he: 'פרויקטים אקדמיים ואישיים',
    },
    heading: {
      en: 'Demonstrations of Competency',
      he: 'פרויקטים נבחרים והוכחת יכולת',
    },
  },
  projectDetail: {
    backToIndex: {
      en: 'Return_To_Index',
      he: 'חזרה לאינדקס',
    },
    videoUnavailable: {
      en: 'Video Unavailable',
      he: 'הסרטון אינו זמין',
    },
    defaultFeaturesTitle: {
      en: 'Key Features',
      he: 'מאפיינים מרכזיים',
    },
    codeSnippetSuffix: {
      en: 'snippet',
      he: 'קטע קוד',
    },
  },
  resume: {
    eyebrow: {
      en: 'RESUME / CONTACT',
      he: 'קורות חיים / יצירת קשר',
    },
    heading: {
      en: "Let's build something at the hardware–software boundary",
      he: 'בואו נבנה יחד משהו על התפר שבין חומרה לתוכנה',
    },
    bio: {
      en: "I'm actively seeking a student or junior engineering position. Reach out and I'll respond promptly — I'd be glad to share code, schematics, and project write-ups.",
      he: 'אני מחפש באופן פעיל משרת סטודנט או תפקיד מהנדס ג\'וניור. מוזמנים ליצור קשר ואחזור אליכם בהקדם — אשמח לשתף קוד, סכמות חשמליות ותיעוד פרויקטים.',
    },
    contactItems: [
      {
        id: 'email',
        iconKey: 'mail',
        label: { en: 'Email', he: 'אימייל' },
        value: 'student@ariel.ac.il',
        href: 'mailto:student@ariel.ac.il',
        ltrValue: true,
      },
      {
        id: 'linkedin',
        iconKey: 'briefcase',
        label: { en: 'LinkedIn', he: 'לינקדאין' },
        value: '/in/ee-student',
        href: '#',
        ltrValue: true,
      },
      {
        id: 'github',
        iconKey: 'code',
        label: { en: 'GitHub', he: 'גיטהאב' },
        value: '@ee-student',
        href: '#',
        ltrValue: true,
      },
      {
        id: 'location',
        iconKey: 'pin',
        label: { en: 'Location', he: 'מיקום' },
        value: { en: 'Israel', he: 'ישראל' },
      },
    ] satisfies ContactItem[],
    coreSkillsLabel: {
      en: 'CORE SKILLS',
      he: 'כישורי ליבה',
    },
    skills: [
      'C',
      'Assembly',
      'HDL',
      'Embedded C',
      'Arduino',
      { en: 'Digital Logic', he: 'לוגיקה ספרתית' },
      'Git',
      'Linux',
    ] satisfies LocalizableText[],
    downloadResume: {
      en: 'Download Résumé (PDF)',
      he: 'הורדת קורות חיים (PDF)',
    },
  },
} as const
