// API Configuration
export const API_CONFIG = {
  // Google Apps Script Web App URL
  GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxSJFkX6Bj8xqP0ByL54JTSGws3OXEhIbiMtCBDLpCUk3m1WRGBoyPYTH8Rr_6Kdi5N/exec',
  
  // Timeout for API requests (in milliseconds)
  REQUEST_TIMEOUT: 30000,
};

// Application Constants
export const APP_CONSTANTS = {
  // Student Levels
  LEVELS: [
    { value: 'ابتدائي', label: 'المرحلة الابتدائية' },
    { value: 'متوسط', label: 'المرحلة المتوسطة' },
    { value: 'ثانوي', label: 'المرحلة الثانوية' },
  ],
  
  // Student Grades
  GRADES: {
    ابتدائي: ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'],
    متوسط: ['الأول', 'الثاني', 'الثالث'],
    ثانوي: ['الأول', 'الثاني', 'الثالث'],
  },
  
  // Guardian Relationship
  GUARDIAN_RELATIONSHIPS: [
    { value: 'أب', label: 'أب' },
    { value: 'أخ', label: 'أخ' },
    { value: 'عم', label: 'عم' },
    { value: 'خال', label: 'خال' },
    { value: 'غير ذلك', label: 'غير ذلك' },
  ],
  
  // Student Status
  STUDENT_STATUS: [
    { value: 'نشط', label: 'نشط' },
    { value: 'متوقف', label: 'متوقف' },
    { value: 'متخرج', label: 'متخرج' },
  ],
  
  // Request Status
  REQUEST_STATUS: [
    { value: 'جديد', label: 'جديد' },
    { value: 'قيد الانتظار', label: 'قيد الانتظار' },
    { value: 'مقبول', label: 'مقبول' },
    { value: 'مرفوض', label: 'مرفوض' },
  ],
  
  // Warning Types
  WARNING_TYPES: [
    { value: 'تعليمي', label: 'تعليمي' },
    { value: 'تأخر', label: 'تأخر' },
    { value: 'غياب', label: 'غياب' },
    { value: 'غياب_بعذر', label: 'غياب بعذر' },
  ],
};

// Form Validation Rules
export const VALIDATION_RULES = {
  STUDENT_ID: {
    min: 8,
    max: 12,
    pattern: /^[0-9]+$/,
    message: 'يجب أن تكون الهوية أرقام فقط بين 8 و 12 رقم',
  },
  PHONE: {
    min: 10,
    max: 10,
    pattern: /^[0-9]{10}$/,
    message: 'يجب أن يكون رقم الجوال 10 أرقام',
  },
  NAME: {
    min: 3,
    max: 100,
    pattern: /^[\u0600-\u06FF\s]+$/,
    message: 'يجب أن يكون الاسم بالعربية فقط',
  },
};

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  BASE_URL: 'https://wa.me',
  // Format: https://wa.me/[country_code][phone_number]
  // Example: https://wa.me/966501234567
};

// Default admin users (for initial setup)
export const DEFAULT_USERS = [
  {
    name: 'مدير النظام',
    role: 'مدير',
    email: 'admin@quran-center.local',
    code: '1234',
    permissions: 'جميع الصلاحيات'
  },
  {
    name: 'مشرف تعليمي',
    role: 'مشرف_تعليمي',
    email: 'supervisor@quran-center.local',
    code: '5678',
    permissions: 'إدارة الإنذارات والطلاب'
  }
];

// Message templates
export const MESSAGE_TEMPLATES = [
  {
    type: 'تعليمي',
    name: 'إنذار تعليمي',
    text: 'السلام عليكم ورحمة الله وبركاته\nالطالب: {studentName}\nتم إصدار إنذار تعليمي بسبب: {reason}\nالإجراء المتخذ: {action}',
    variables: '{studentName}, {reason}, {action}'
  },
  {
    type: 'إداري',
    name: 'إنذار إداري - تأخر',
    text: 'السلام عليكم ورحمة الله وبركاته\nالطالب: {studentName}\nعدد التأخرات: {count}\nتم إصدار إنذار إداري',
    variables: '{studentName}, {count}'
  }
];
