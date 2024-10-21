import dotenv from "dotenv";
import { connect_db } from "./db/connect_db.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });


const PORT = process.env.PORT || 8000;


// Connect to the database and start the server
connect_db.then(() => {
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
