const axios = require('axios');
const { expect } = require('chai');

const baseUrl = 'https://hng-stage-1-lzsd.onrender.com'; 

describe('Endpoint Accessibility', () => {
  it('should respond with status 200', async () => {
    const response = await axios.get(`${baseUrl}/api?slack_name=example_name&track=backend`);
    expect(response.status).to.equal(200);
  });
});

describe('JSON Format', () => {
    it('should return a JSON object', async () => {
      const response = await axios.get(`${baseUrl}/api?slack_name=example_name&track=backend`);
      expect(response.headers['content-type']).to.include('application/json');
    });
  
    it('should have all the required properties', async () => {
      const response = await axios.get(`${baseUrl}/api?slack_name=example_name&track=backend`);
      const data = response.data;
  
      expect(data).to.have.property('slack_name');
      expect(data).to.have.property('current_day');
      expect(data).to.have.property('utc_time');
      expect(data).to.have.property('track');
      expect(data).to.have.property('github_file_url');
      expect(data).to.have.property('github_repo_url');
      expect(data).to.have.property('status_code');
    });
  });
  
  describe('Data Validation', () => {
    it('should have a valid slack_name', async () => {
      const response = await axios.get(`${baseUrl}/api?slack_name=example_name&track=backend`);
      const slackName = response.data.slack_name;
      expect(slackName).to.equal('example_name');
    });
  
  
    it('should have a valid track', async () => {
      const response = await axios.get(`${baseUrl}/api?slack_name=example_name&track=backend`);
      const track = response.data.track;
      expect(track).to.equal('backend');
    });
  
   
  
    it('should have a status_code of 200', async () => {
      const response = await axios.get(`${baseUrl}/api?slack_name=example_name&track=backend`);
      const statusCode = response.data.status_code;
      expect(statusCode).to.equal(200);
    });
  });
  