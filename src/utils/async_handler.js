import { ApiError } from './api_response.js';


/**
 * @name : async_handler
 * @desc : 
 * - This method is a middleware method if we get any error inside it then it will return error response
 * - Every controller has to go through this check
 */


const async_handler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => res.status(500).json(new ApiError(500, 'Something went wrong !!', err)));
    };
};


export { async_handler };
