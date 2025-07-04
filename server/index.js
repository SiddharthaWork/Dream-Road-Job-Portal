import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";

dotenv.config({});    

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Creating Cors Option
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;



// APIS
app.use("/api/user",userRoute);
app.use("/api/company", companyRoute);

// For Testing
// localhost:4000/api/user/register
// localhost:4000/api/user/login
// localhost:4000/api/user/logout
// localhost:4000/api/user/update-profile

// For Company
// localhost:4000/api/company/register
// localhost:4000/api/company/login
// localhost:4000/api/company/getallcompanies
// localhost:4000/api/company/getcompany/:id
// localhost:4000/api/company/updatecompany/:id






app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
}); 

app.get("/", (req, res) => {
    res.send("Server is running");
});
