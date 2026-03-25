import { API_CONFIG } from './config';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Make a request to the Google Apps Script Web App
 */
async function makeRequest<T = any>(
  action: string,
  data: Record<string, any> = {}
): Promise<ApiResponse<T>> {
  try {
    const formData = new FormData();
    formData.append('action', action);
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
      }
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT);

    const response = await fetch(API_CONFIG.GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    return result as ApiResponse<T>;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'حدث خطأ في الاتصال',
    };
  }
}

/**
 * Register a new student
 */
export async function registerStudent(studentData: {
  studentName: string;
  studentId: string;
  studentPhone: string;
  studentBirthDate: string;
  studentAddress: string;
  studentLevel: string;
  studentGrade: string;
  guardianName: string;
  guardianPhone: string;
  guardianId: string;
  guardianRelationship: string;
}): Promise<ApiResponse> {
  return makeRequest('registerStudent', studentData);
}

/**
 * Get student data by ID or guardian phone
 */
export async function getStudentData(
  studentId?: string,
  guardianPhone?: string
): Promise<ApiResponse> {
  return makeRequest('getStudentData', {
    studentId,
    guardianPhone,
  });
}

/**
 * Update student data
 */
export async function updateStudentData(
  studentId: string,
  updateData: Record<string, any>
): Promise<ApiResponse> {
  return makeRequest('updateStudentData', {
    studentId,
    ...updateData,
  });
}

/**
 * Get all students (for admin)
 */
export async function getAllStudents(
  filters?: {
    circle?: string;
    status?: string;
    memorizedRange?: { min: number; max: number };
  }
): Promise<ApiResponse> {
  return makeRequest('getAllStudents', { filters });
}

/**
 * Add a new student (admin only)
 */
export async function addStudent(studentData: Record<string, any>): Promise<ApiResponse> {
  return makeRequest('addStudent', studentData);
}

/**
 * Update student (admin only)
 */
export async function updateStudent(
  studentId: string,
  updateData: Record<string, any>
): Promise<ApiResponse> {
  return makeRequest('updateStudent', {
    studentId,
    ...updateData,
  });
}

/**
 * Get all incoming requests (admin only)
 */
export async function getIncomingRequests(
  type?: 'registration' | 'modification' | 'all'
): Promise<ApiResponse> {
  return makeRequest('getIncomingRequests', { type });
}

/**
 * Process registration request
 */
export async function processRegistrationRequest(
  requestId: string,
  action: 'approve' | 'reject' | 'pending',
  rejectReason?: string,
  circle?: string
): Promise<ApiResponse> {
  return makeRequest('processRegistrationRequest', {
    requestId,
    action,
    rejectReason,
    circle,
  });
}

/**
 * Get educational warnings
 */
export async function getEducationalWarnings(
  status?: 'pending' | 'all'
): Promise<ApiResponse> {
  return makeRequest('getEducationalWarnings', { status });
}

/**
 * Add educational warning
 */
export async function addEducationalWarning(warningData: {
  studentId: string;
  reason: string;
  action?: string;
}): Promise<ApiResponse> {
  return makeRequest('addEducationalWarning', warningData);
}

/**
 * Get administrative warnings
 */
export async function getAdministrativeWarnings(
  type?: 'lateness' | 'absence' | 'absence_with_excuse'
): Promise<ApiResponse> {
  return makeRequest('getAdministrativeWarnings', { type });
}

/**
 * Get settings
 */
export async function getSettings(
  type?: 'templates' | 'thresholds' | 'actions' | 'users'
): Promise<ApiResponse> {
  return makeRequest('getSettings', { type });
}

/**
 * Update settings
 */
export async function updateSettings(
  type: string,
  data: Record<string, any>
): Promise<ApiResponse> {
  return makeRequest('updateSettings', { type, data });
}

/**
 * User login
 */
export async function login(code: string): Promise<ApiResponse> {
  return makeRequest('login', { code });
}

/**
 * Get user data
 */
export async function getUserData(): Promise<ApiResponse> {
  return makeRequest('getUserData');
}

/**
 * Send WhatsApp message
 */
export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string
): Promise<ApiResponse> {
  return makeRequest('sendWhatsAppMessage', {
    phoneNumber,
    message,
  });
}
