class ApiResponse {
    static success(message, data = null) {
        return {
            success: true,
            message,
            data,
            error: null
        };
    }

    static error(message, code, details = null) {
        return {
            success: false,
            message,
            data: null,
            error: {
                code,
                details
            }
        };
    }
}

export default ApiResponse;
