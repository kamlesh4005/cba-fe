// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3005';

export const fetchMenuData = async () => {
  try {
    const response = await axios.get(`${API_URL}/marketprovider/Markets/menu`, {
      headers: {
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vY2xpZW50Iiwicm9sZSI6IkRlbW9DbGllbnQiLCJpc3MiOiJSREUiLCJleHAiOjE3MjAxNDQ3MjYxMTQsInB3ZGNoIjpmYWxzZSwiaXAiOiI0OS4zNi4yMzguMjIyIn0.Sehm9MPxhSNzB8QIwlFxGjFlQroimm8VKoz1yZkykMI',
        'content-type': 'application/json',
        'origin': 'https://www.radheexch.xyz',
        'priority': 'u=1, i',
        'referer': 'https://www.radheexch.xyz/',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'x-op-key': 'RDE'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return [];
  }
};

export const fetchEventDetails = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}/events/detail/${eventId}`, {
        headers: {
            'accept': '*/*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vY2xpZW50Iiwicm9sZSI6IkRlbW9DbGllbnQiLCJpc3MiOiJSREUiLCJleHAiOjE3MjAxNDQ3MjYxMTQsInB3ZGNoIjpmYWxzZSwiaXAiOiI0OS4zNi4yMzguMjIyIn0.Sehm9MPxhSNzB8QIwlFxGjFlQroimm8VKoz1yZkykMI',
            'content-type': 'application/json',
            'origin': 'https://www.radheexch.xyz',
            'priority': 'u=1, i',
            'referer': 'https://www.radheexch.xyz/',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'x-op-key': 'RDE'
          }
    });
    return response.data;
    } catch (error) {
        console.error('Error fetching event details:', error);
        throw error;
    }
};
