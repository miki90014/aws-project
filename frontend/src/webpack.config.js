const path = require('path');

module.exports = {
  // Your existing configuration...
  
  devServer: {
    proxy: 'http://1.1.1.1:3000', // Add your proxy configuration here
  },
  
  // Other configurations like entry, output, etc.
};
