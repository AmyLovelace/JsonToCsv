import axios, { AxiosError, AxiosResponse } from 'axios';
import { Response } from 'express';
import fs from 'fs';
import { ApiData } from './interface';


export async function apiCall(res: Response): Promise<void> {
 try {
  const response: AxiosResponse<ApiData> = await axios.get('https://api.kanye.rest');

  if (response.status !== 200) {
    throw new Error(`Error in API call: ${response.statusText}`);
  }

  const data: ApiData = response.data;
  console.log('Data:', data.quote);

  res.status(200).json({ quote: data.quote });

  addToCSV(data);
 } catch (error) {
  if ((error as AxiosError).response) {
    const axiosError = error as AxiosError;
    console.error('Error in API response:', axiosError.response?.data);
    res.status(500).json({ error: 'Error in API response' });
  } else {
    console.error('Error when making request:', error);
    res.status(500).json({ error: 'Error when making request' });
  }
 }
}

function addToCSV(newData: ApiData): void {
 const filePath = 'jsonTo.csv';

 const fileExist = fs.existsSync(filePath);

 let csvData = '';
 if (!fileExist) {
    csvData += 'Quote;Title\n'; 
}
 csvData += `content;${newData.quote}\n`;
 //csvData += `${newData.title};${newData.quote}\n`; 


 fs.appendFile(filePath, csvData, err => {
  if (err) {
    console.error('Error writing to CSV file:', err);
  } else {
    console.log('CSV data added successfully');
  }
 });
}
