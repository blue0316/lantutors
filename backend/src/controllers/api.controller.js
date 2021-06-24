/**
 * Controllers for Post requests to `/api/<endpoints>`
 * @see api.validators.js
 * @file defines http request controllers
 * @requires all available service classes/methods
 */

import { successResponse, errorResponse } from '../helpers';
import RegisterTutor from '../services/RegisterTutor';
import RegisterStudents from '../services/RegisterStudents';
import RetrieveNotifications from '../services/RetrieveNotifications';
import SuspendStudent from '../services/SuspendStudent';
import GetCommonStudents from '../services/GetCommonStudents';

/**
 * Endpoint: `POST /api/account`
 * @see RegisterTutor
 */
export const registerTutor = async (req, res) => {
  try {
    const service = new RegisterTutor(req.body);
    const response = await service.call();
    return successResponse(req, res, response, response.code);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

/**
 * Endpoint: `POST /api/register`
 * @see RegisterStudents
 */
export const registerStudents = async (req, res) => {
  try {
    const service = new RegisterStudents(req.body);
    const response = await service.call();

    return successResponse(req, res, response, response.code);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

/**
 * Endpoint: `POST /api/retrievenotifications`
 * @see RetrieveNotifications
 */
export const retrieveNotifications = async (req, res) => {
  try {
    const service = new RetrieveNotifications(req.body);
    const response = await service.call();
    return successResponse(req, res, response, response.code);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

/**
 * Endpoint: `POST /api/suspend`
 * @see SuspendStudent
 */
export const suspendStudent = async (req, res) => {
  try {
    const service = new SuspendStudent(req.body);
    const response = await service.call();
    return successResponse(req, res, response, response.code);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

/**
 * Endpoint: `GET /api/getcommonstudents`
 * @see GetCommonStudents
 */
export const getCommonStudents = async (req, res) => {
  try {
    const service = new GetCommonStudents(req.body);
    const response = await service.call(req, res);
    return successResponse(req, res, response, response.code);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
