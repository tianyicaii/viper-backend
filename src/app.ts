// src/app.ts - 简单的 Express 应用

import express from 'express';

const app = express();

// 中间件
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 存储数据（简单内存存储）
let messages: any[] = [];

// 处理消息
app.post('/api/message', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ 
      success: false, 
      error: '需要 name' 
    });
  }
  
  // 生成回应
  let response = `你好 ${name}`;
  
  // 保存记录
  const record = {
    id: Date.now(),
    input: { name, timestamp: new Date() },
    output: response,
    timestamp: new Date(),
  };
  messages.push(record);
  
  // 限制历史记录数量
  if (messages.length > 100) {
    messages = messages.slice(-50);
  }

  res.json({ 
    success: true, 
    data: {
      message: response,
    }
  });
});

// 获取历史
app.get('/api/history', (req, res) => {
  const { limit = 20 } = req.query;
  const limitNum = parseInt(limit as string) || 20;
  
  const recentMessages = messages
    .slice(-limitNum)
    .reverse(); // 最新的在前面
  
  res.json({ 
    success: true, 
    data: {
      history: recentMessages,
      total: messages.length,
      limit: limitNum
    }
  });
});

// 清空历史
app.delete('/api/history', (req, res) => {
  const count = messages.length;
  messages = [];
  res.json({ 
    success: true, 
    message: `已清空 ${count} 条历史记录` 
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

export default app;