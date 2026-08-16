function createResponseHandler(req, res) {
  function sender(code, message, data, success) {
    res.status(code).json({
      message: message || "",
      data: data || {},
      success
    })
  }

  return {
    success(message, data, success = true) {
      sender(200, message, data, success)
    },

    badRequest(message, data, success = false) {
      sender(400, message, data, success)
    },

    notFound(message, data, success = false) {
      sender(404, message, data, success)
    },

    internalServerError(message, data, success = false) {
      sender(500, message, data, success)
    },
  }
}

export default createResponseHandler;