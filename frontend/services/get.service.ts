/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-return-assign */
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
 * Api backend base URL
 * In development change to `http://127.0.0.1:4000/api`
 */
const axiosConfig = {
  baseURL: 'https://fsdisraelias.df.r.appspot.com/api',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

/**
 * Get search results data.
 *
 * SearchApi, `/api/commonstudents`
 * @param {string} tutor1
 * @param {string} tutor2
 * @param {string} tutor3
 * @param {number} page
 */
export function getCommonStudentsBySearchParam(
  params?: Array<string>
) {
  /**
   * New URLSearchParams object
   */
  let queries = '';
  params && params.length > 0
    ? params.forEach((param) => (queries += `&tutor=${param}`))
    : '';

  // const makeQueries = (q: Array<string>) => {
  //   let queries = '';
  //   p && p.length > 0
  //     ? p.forEach((p) => (queries += `&tutor=${p}`))
  //     : '';
  //   return queries
  // }
  // const tutorParams = new URLSearchParams(queries)

  // let queryParams = '';
  // tutorParams.forEach(function (tutor, email) {
  //   console.log(tutor, email);
  //   queryParams += `&tutor=${email}`;
  // });
  return axios.get(
    `commonstudents?${
      params && params.length > 0
        ? params.forEach((param) => (queries += `&tutor=${param}`))
        : ''
    }`,
    axiosConfig
  );
}

/**
 * Get Tutor-Student associations (commonstudents) as initial data.
 *
 * tutorStudentsApi, `/api/commonstudents`
 */
export function getCommonStudents() {
  return axios.get(`commonstudents`, axiosConfig);
}

/**
 * Get one students association (commonstudents) with `tutor`.
 *
 * tutorStudentsApi, `/api/commonstudents`
 * @param {string} tutor database document `email` of tutor
 */
export function getCommonStudentsByTutor(tutor: any) {
  return axios.get(`commonstudents/${tutor}`, axiosConfig);
}

/**
 * Get raw Tutor-Student associations (commonstudents) as initial data.
 *
 * tutorStudentsApi, `/api/alltutorstudents`
 */
export function getRawCommonStudents() {
  return axios.get(`alltutorstudents`, axiosConfig);
}

/**
 * Get all Student students as raw data.
 *
 * allstudentsapi, `/api/allstudents`
 */
export function getRawStudents() {
  return axios.get(`allstudents`, axiosConfig);
}

/**
 * Get all students data.
 *
 * studentsApi, `/api/students`
 */
export function getStudents() {
  return axios.get(`students`, axiosConfig);
}

/**
 * Get one student from the database.
 *
 * @param {string} email database document `email` of student
 */
export function getStudent(email: any) {
  return axios.get(`students/${email}`, axiosConfig);
}

/**
 * Get all tutors data.
 *
 * tutorsApi, `/api/tutors`
 */
export function getTutors() {
  return axios.get(`tutors`, axiosConfig);
}

/**
 * Get one tutor from the database.
 *
 * @param {string} email database document `email` of student
 */
export function getTutor(email: any) {
  return axios.get(`tutors/${email}`, axiosConfig);
}

/**
 * Get all notifications data.
 *
 * tutorsApi, `/api/allnotifications`
 */
export function getNotifications() {
  return axios.get(`allnotifications`, axiosConfig);
}

/**
 * Get one notification from the database.
 *
 * @param {string} tutor database document `email` of tutor
 */
export function getNotificationsByTutor(tutor: any) {
  return axios.get(`notifications/${tutor}`, axiosConfig);
}
