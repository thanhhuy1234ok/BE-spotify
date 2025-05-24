// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']; // Lấy header Authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Không có access token' });
    }

    // Authorization header thường có dạng: "Bearer token"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token không hợp lệ' });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET chưa được cấu hình trong .env');
    }

    // Verify token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Access token không hợp lệ hoặc đã hết hạn' });
      }

      // Lưu dữ liệu user vào req để controller có thể dùng
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(500).json({ error: 'Lỗi server' });
  }
};

export default authMiddleware;
