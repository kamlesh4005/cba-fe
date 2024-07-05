// src/components/BettingInfo.js
import React, { useEffect, useState } from 'react';
import api from '../services/axios/api';

const BettingInfo = () => {
  const [bettingData, setBettingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBettingData = async () => {
      try {
        const response = await api.get('/v1/dummy-betting-endpoint'); // Replace with actual endpoint
        setBettingData(response.data);
      } catch (error) {
        setError('Error fetching betting data');
        console.error('Error fetching betting data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBettingData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Betting Information</h2>
      {bettingData.map((bet, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-bold">{bet.match}</h3>
          <p>{bet.odds}</p>
          <p>{bet.stake}</p>
        </div>
      ))}
    </div>
  );
};

export default BettingInfo;
