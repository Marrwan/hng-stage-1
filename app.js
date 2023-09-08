require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse query parameters
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Define the endpoint
app.get('/api', async (req, res) => {
  try {
    const { slack_name, track } = req.query; 

    // Get the current day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const current_day = daysOfWeek[new Date().getDay()];

    // Get the current UTC time
    const utc_time = new Date().toISOString();

    // Get the GitHub file URL and repository URL
    const github_file_url = "https://github.com/Marrwan/hng-stage-1/blob/master/app.js";
    const github_repo_url = "https://github.com/Marrwan/hng-stage-1"; 

    // Validate UTC time within +/-2 minutes
    const currentTime = new Date();
    const utcTimeDate = new Date(utc_time);
    const timeDifference = Math.abs(currentTime - utcTimeDate) / 1000 / 60; // in minutes

    if (timeDifference > 2) {
      return res.status(500).json({ error: "UTC time is not within the allowed window of +/-2 minutes" });
    }

    const responseData = {
      slack_name,
      current_day,
      utc_time,
      track,
      github_file_url,
      github_repo_url,
      status_code: 200,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
