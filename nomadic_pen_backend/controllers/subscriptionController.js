// Author: Pakshal Shah

// backend/controllers/subscriptionConts
const subscribeUser = (req, res) => {
    const { email } = req.body;
  
    // Perform subscription logic, e.g., save email to database
  
    // Simulate successful subscription
    res.status(200).json({ message: 'Subscription successful' });
  };
  
  module.exports = {
    subscribeUser
  };
  