// src/server.ts - 独立运行
import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
