const axios = require('axios');
const { expect } = require('chai');

const baseUrl = 'http://localhost:5000'; 

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
  
