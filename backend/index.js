const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:8080', // Frontend URL
  credentials: true, // To allow cookies if needed
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/oraweb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Oraweb Backend Running');
});

// Routes
const layoutRoutes = require('./routes/layout');
app.use('/api/layout', layoutRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
