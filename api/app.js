import express from "express";
import postRoute from "./routes/post.route";

const app = express();


app.use("")

console.log("test")

app.use("/api/test", (req,res) => {
    res.send("Works")
})

app.use("/api/auth/register", (req, res) => {
  res.send("Works");
});

app.use("/api/auth/login", (req, res) => {
  res.send("Works");
});

app.use("/api/auth/logout", (req, res) => {
  res.send("Works");
});

app.use("/api/auth/post", (req, res) => {
  res.send("Works");
});

app.use("/api/auth/register", (req, res) => {
  res.send("Works");
});

app.use("/api/auth/post/1212", (req, res) => {
  res.send("Works");
});





app.listen(8800, () => {
    console.log("Server is Running")
})