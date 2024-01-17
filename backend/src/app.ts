import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Initilize express app
const app = express();

// middlewares

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes

// import authRoutes from "./routes/auth.routes";
// import userRoutes from "./routes/user.routes";
// import contactRoute from "./routes/contact.routes";

// app.use("/api/v1", userRoutes);
// app.use("/api/v1", authRoutes);
// app.use("/api/v1", contactRoute);

export { app };
