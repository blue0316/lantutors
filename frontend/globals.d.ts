/**
 * `api/allstudents`
 */
interface Student {
  id: number;
  email: string;
  suspended: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * `api/alltutors`
 * `api/tutors`
 */
interface Tutor {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * `api/alltutorstudents`
 */
interface TutorStudent {
  id: number;
  tutor: Tutor['email'];
  students: Student['email'][];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * `api/allnotifications`
 */
interface Notification {
  id?: number;
  students: Student['email'][];
  tutor: Tutor['email'];
  title?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

interface NotificationResponse {
  id?: number;
  recipients: Student['email'][];
  tutor: Tutor['email'];
  title?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * `api/students`
 */
interface StudentsApi {
  students: Student['email'][];
}

/**
 * `api/tutors`
 */
type TutorsApi = Tutor[];

/**
 * `api/commonstudents`
 */
interface CommonStudentsApi {
  tutor: Tutor['email'];
  students: Student['email'][];
}

/**
 * `api/retrievenotifications`
 */
interface RetrieveNotificationsPost {
  tutor: string;
  notification: string;
}

/**
 * `api/retrievenotifications`
 */
interface RetrieveNotificationsResponse {
  tutor: string;
  recipients: Student['email'][];
  message: string;
}
