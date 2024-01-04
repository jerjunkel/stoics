enum STATUSCODE {
  OK = 200,
  BAD_REQUEST = 400,
  UN_AUTHORISED = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

class APIError extends Error {
  statusCode: STATUSCODE;

  constructor(message: string, statusCode: STATUSCODE) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { APIError };
