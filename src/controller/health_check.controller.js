import { async_handler } from "../utils/async_handler.js";
import { ApiResponse } from "../utils/api_response.js";


const health_check = async_handler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, "OK", "Health check passed!!"));
});


export { health_check };
