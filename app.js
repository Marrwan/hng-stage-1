require('dotenv').config();
const express = require('express');
const axios = require('axios');

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
    const currentDay = daysOfWeek[new Date().getDay()];

    // Get the current UTC time
    const utcTime = new Date().toISOString();

    // Get the GitHub file URL and repository URL
    const githubFileURL = "https://github.com/username/repo/blob/main/file_name.ext"; // Replace with your actual URLs
    const githubRepoURL = "https://github.com/username/repo"; // Replace with your actual URLs

    // Validate UTC time within +/-2 minutes
    const currentTime = new Date();
    const utcTimeDate = new Date(utcTime);
    const timeDifference = Math.abs(currentTime - utcTimeDate) / 1000 / 60; // in minutes

    if (timeDifference > 2) {
      return res.status(500).json({ error: "UTC time is not within the allowed window of +/-2 minutes" });
    }

    const responseData = {
      slack_name,
      current_day: currentDay,
      utc_time: utcTime,
      track,
      github_file_url: githubFileURL,
      github_repo_url: githubRepoURL,
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
