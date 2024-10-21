import { async_handler } from './async_handler.js';
import { insert_logs_in_sql } from '../model/logger.model.js';


const custom_logs = async_handler(async (req, res, next) => {
    req.startTime = Date.now();
    const originalSend = res.send;
    let responseBody = '';

    res.send = function (body) {
        responseBody = body;
        return originalSend.call(this, body);
    };

    next();

    res.on('finish', async () => {
        const method = req.method;
        const url_path = req.path;
        const status = res.statusCode;
        const correlation_id = req.headers['nonce'] || 'N/A';

        const response_time = Date.now() - (req.startTime || Date.now());
        const body_params = req.body ? req.body : req.query;

        // Mask sensitive data
        ['password', 'access_token', 'refresh_token', 'token'].forEach(key => {
            if (body_params.hasOwnProperty(key)) body_params[key] = '*';
        });

        const logObject = {
            method_type: method,
            url: url_path,
            status: status,
            correlation_id: correlation_id,
            response_time: response_time,
            request_body: JSON.stringify(body_params) || 'N/A',
            response_body: typeof (responseBody) === 'string' ? responseBody || 'N/A' : JSON.stringify(responseBody) || 'N/A',
        };

        await insert_logs_in_sql(logObject).catch(err => {
            console.error(`Failed to insert log into MySQL: ${err}`);
        });
    });
});


export { custom_logs };
