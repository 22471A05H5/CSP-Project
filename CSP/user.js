const express = require('express');
const router = express.Router();
const connection = require('./connection');

const nodemailer = require('nodemailer');


// Get all students (for example purposes)
/*router.get('/get', (req, res) => {
    var query = "SELECT * FROM stu";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });
});

// Delete a student by name
router.delete('/student/:name', (req, res) => {
    const studentId = req.params.name;
    var query = "DELETE FROM student WHERE name = ?";
    connection.query(query, [studentId], (err, result) => {
        if (err) {
            console.error('Error deleting data: ', err);
            return res.status(500).send('Error deleting data', err);
        }
        console.log('Data deleted successfully');
        res.status(200).send('Data deleted successfully');
    });
});

// Update a student by name
router.patch('/update', (req, res) => {
    let user = req.body;
    var query = "UPDATE student SET age = ? WHERE name = ?";
    connection.query(query, [user.age, user.name], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User name not found" });
            }
            return res.status(200).json({ message: "User updated successfully" });
        } else {
            return res.status(500).json({ error: err.message });
        }
    });
});

// Insert a new student
router.post('/use', (req, res) => {
    const use = req.body;
    var query = "INSERT INTO stu (name, age) VALUES (?, ?)";
    connection.query(query, [use.name, use.age], (err) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).send('Error inserting data', err);
        } else {
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully');
        }
    });
});

// Register a new user
router.post('/register', (req, res) => {
    const { username, email, password, } = req.body;
    const query = "INSERT INTO stu (username, email,password) VALUES (?, ?, ?)";
    connection.query(query, [username, email, password], (err) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).send('Error registering user');
      } else {
        console.log('User registered successfully');
        return res.status(200).send('User registered successfully');
      }
    });
  })

module.exports = router;*/



router.post('/register', (req, res) => {
  const user = req.body;
  console.log("success");
  const query = 'INSERT INTO users (username, password,email) VALUES (?, ?,?)';
  connection.query(query, [user.username, user.password,user.email], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User registered!' });
  });
});

router.post('/login', (req, res) => {
  const user = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [user.username, user.password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send({ message: 'Login successful!' });
    } else {
      res.send({ message: 'Invalid credentials' });
    }
  });
});

router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [userId], (err, result) => {
      if (err) throw err;
      res.send({ message: 'User deleted!' });
    });
  });


  

  router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, email } = req.body;
  
    // Validate inputs
    if (!userId || !username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    const query = 'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?';
    
    connection.query(query, [username, password, email, userId], (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'An error occurred while updating user.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.send({ message: 'User updated!' });
    });
  });
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services like 'hotmail', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER,  // Email address from .env
      pass: process.env.EMAIL_PASS   // App-specific password from .env
    }
  });
  
  // Define the POST route for contact form submission
  router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Configure email options
    const mailOptions = {
      from: email,
      to: 'pulagorlamounica@gmail.com',  // Your email address
      subject: 'New Contact Form Submission',
      text: `You have a new message from ${name} (${email}):\n\n${message}`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
      }
      res.send({ message: 'Message sent successfully!' });
    });});
module.exports=router;