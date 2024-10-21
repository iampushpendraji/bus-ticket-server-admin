import { pool } from "../db/connect_db.js";


/**
 * 
 * @name : insert_logs_in_sql
 * @Desc : For inserting logs
 * 
 */


async function insert_logs_in_sql(new_log) {
    const [rows] = await pool.query('INSERT INTO logs SET ?', new_log);
    return rows.insertId;
}


export { insert_logs_in_sql };