import app from "./app";

app.listen(3001, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Server running on port 3001");
  }
});
