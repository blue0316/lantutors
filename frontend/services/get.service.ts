import axios from 'axios';
/**
 * Get requests for tutors, students, tutorstudents and notifications endpoints.
 * All `get` views are public.
 *
 * @file defines all get methods to retrieve data from backend
 * @see ProfileDataProvider
 * @see AppDataProvider
 */

/**
 * Api backend base URL DEVELOPMENT.
 */
const axiosConfig = {
  baseURL: 'http://127.0.0.1:4000/api',
  withCredentials: true,
};

/**
 * Get search results data.
 *
 * SearchApi, `/api/getcommonstudents`
 * @param {string} tutor1
 * @param {string} tutor2
 * @param {string} tutor3
 * @param {number} page
 */
function getResultsData(
  tutor1: string,
  tutor2: string,
  tutor3: string,
  page = 1
) {
  const querystring = tutor1
    ? `getcommonstudents?tutor=${tutor1}`
    : tutor2
    ? `getcommonstudents?tutor=${tutor1}&tutor=${tutor2}`
    : tutor3
    ? `getcommonstudents?tutor=${tutor1}&tutor=${tutor2}&tutor=${tutor3}`
    : `getcommonstudents?tutor=`;
  return axios.get(`/${querystring}&page=${page}`, axiosConfig);
}

/**
 * Get Tutor-Student associations (commonstudents) as initial data.
 *
 * tutorStudentsApi, `/api/commonstudents`
 */
function getCommonStudents() {
  return axios.get(`commonstudents`, axiosConfig);
}

/**
 * Get one Tutor-Student association (commonstudents) as initial data.
 *
 * tutorStudentsApi, `/api/commonstudents`
 */
function getCommonStudent(tutorName: string) {
  return axios.get(`commonstudents/${tutorName}`, axiosConfig);
}

/**
 * Get all students data.
 *
 * studentsApi, `/api/students`
 */
function getStudents() {
  return axios.get(`students`, axiosConfig);
}

/**
 * Get one student from the database.
 *
 * @param {string} username database document `username` of student
 */
function getStudent(username: any) {
  return axios.get(`students/${username}`, axiosConfig);
}

/**
 * Get all tutors data.
 *
 * tutorsApi, `/api/tutors`
 */
function getTutors() {
  return axios.get(`tutors`, axiosConfig);
}

/**
 * Get one tutor from the database.
 *
 * @param {string} username database document `username` of student
 */
function getTutor(username: any) {
  return axios.get(`tutors/${username}`, axiosConfig);
}

/**
 * Get all notifications data.
 *
 * tutorsApi, `/api/notifications`
 */
function getNotifications() {
  return axios.get(`notifications`, axiosConfig);
}

/**
 * Get one notification from the database.
 *
 * @param {string} tutorName database document `username` of tutor
 */
function getNotificationByTutor(tutorName: string) {
  return axios.get(`notifications/${tutorName}`);
}

/**
 * Get one notification from the database.
 *
 * @param {string} id database document `id` of notification
 */
function getNotificationById(id: number) {
  return axios.get(`notifications/${id}`);
}

export {
  getResultsData,
  getCommonStudents,
  getCommonStudent,
  getStudents,
  getStudent,
  getTutors,
  getTutor,
  getNotifications,
  getNotificationByTutor,
  getNotificationById,
};
