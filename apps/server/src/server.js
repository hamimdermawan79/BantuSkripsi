import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(` Bantu Skripsimu Backend API Running`);
  console.log(` Port: ${PORT}`);
  console.log(` URL : http://localhost:${PORT}`);
  console.log(` Mode: Anti-SLOP / Monorepo Standards`);
  console.log(`==========================================`);
});
