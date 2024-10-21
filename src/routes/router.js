import { Router } from "express";
import health_check_routes from "./health_check.routes.js";
import { ApiError } from "../utils/api_response.js";


const router = Router();


router.use("/admin/v1/health-check", health_check_routes);


// Wildcard route to handle undefined routes
router.use('*', (req, res) => {
    res.status(404).json(new ApiError(404, 'Something went wrong !!'));
});


export { router };
