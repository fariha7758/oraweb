const mongoose = require('mongoose');

const LayoutSchema = new mongoose.Schema({
  components: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Layout', LayoutSchema);
