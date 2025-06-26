# viper-backend


# localhost

# 发送消息
curl -X POST http://localhost:3000/api/message \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","message":"你好，现在几点了？"}'

# 获取历史
curl http://localhost:3000/api/history

# 获取最近5条
curl http://localhost:3000/api/history?limit=5

# 清空历史
curl -X DELETE http://localhost:3000/api/history


# vercel

# 发送消息
curl -X POST https://viper-backend.vercel.app/api/message \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","message":"你好，现在几点了？"}'

# 获取历史
curl https://viper-backend.vercel.app/api/history

# 获取最近5条
curl https://viper-backend.vercel.app/api/history?limit=5

# 清空历史
curl -X DELETE https://viper-backend.vercel.app/api/history

