import axios from 'axios';

const baseUrl = 'http://localhost:8087';

export async function fetchData() {
  try {
    const response = await axios.get(`${baseUrl}/fetchTableData`);
    return response.data;
  } catch(error) {
    throw error;
  }
}
