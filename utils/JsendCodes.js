const SUCCESS = "success";
const FAIL = "fail";
const ERROR = "error";

function success(data = null) {
  return {
    status: SUCCESS,
    data,
  };
}
function fail(data = {}) {
  return {
    status: FAIL,
    data,
  };
}
function error(message = "Internal Server Error", code = 500, data = null) {
  return {
    status: ERROR,
    message,
    code,
    // Conditional Object Property
    ...(data !== null && { data }),
  };
}

module.exports = {
  SUCCESS,
  FAIL,
  ERROR,
  success,
  fail,
  error,
};
