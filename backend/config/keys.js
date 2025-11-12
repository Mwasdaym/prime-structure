module.exports = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/primevideo',
  jwtSecret: process.env.JWT_SECRET || 'primevideo_secret_key_2024',
  jwtExpire: process.env.JWT_EXPIRE || '30d'
};
