const createResponse = (status, message, data) => {
  return {
    status,
    message,
    data,
  };
};

const successResponse = (res, message, data) => {
  const response = createResponse(200, message || 'Success', data);
  res.status(200).json(response);
};

const createdResponse = (res, message, data) => {
  const response = createResponse(201, message || 'Resource created successfully', data);
  res.status(201).json(response);
};

const dataAlreadyExistsResponse = (res, message) => {
  const response = createResponse(409, message || 'Data already exists');
  res.status(409).json(response);
};

const noContentResponse = (res, message) => {
  const response = createResponse(204, message || 'No content');
  res.status(204).json(response);
};

const badRequestResponse = (res, message) => {
  const response = createResponse(400, message || 'Bad request');
  res.status(400).json(response);
};

const notFoundResponse = (res, message) => {
  const response = createResponse(404, message || 'Not found');
  res.status(404).json(response);
};

const internalServerErrorResponse = (res, message) => {
  const response = createResponse(500, message || 'Internal server error');
  res.status(500).json(response);
};

export  {
  successResponse,
  createdResponse,
  noContentResponse,
  badRequestResponse,
  notFoundResponse,
  internalServerErrorResponse,
  dataAlreadyExistsResponse
};
