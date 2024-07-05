// src/components/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventDetails } from '../services/apiService';

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const details = await fetchEventDetails(eventId);
        setEventDetails(details);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };

    getEventDetails();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!eventDetails) {
    return <div>Error fetching event details.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{eventDetails.eventname}</h1>
      <h2 className="text-xl font-semibold">Market Odds</h2>
      <div>
        {eventDetails.marketDetails.map((market, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{market.marketname}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>Back</div>
              <div>Lay</div>
              {market.odds.map((odd, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <div>{odd.back}</div>
                  <div>{odd.lay}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
