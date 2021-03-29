module.exports = {
    "/api/auth": {
        "/api/auth/login": {
            input: {
                username: {
                    type: "string",
                    required: true
                },
                password: {
                    type: "string",
                    required: true
                },
            }
        },
        "/api/auth/register": {
            input: {
                name: {
                    type: "string",
                    required: true
                },
                username: {
                    type: "string",
                    required: true,
                    unique: true
                },
                password: {
                    type: "string",
                    required: true
                },
                gender: {
                    type: "enum",
                    default: "male",
                    options: ["male", "female", "other"]
                }
            }
        },
    }
}