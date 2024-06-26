// src/App.js

import React, { useEffect, useState } from 'react';
import { initClient, handleAuthClick, handleSignoutClick, createGoogleMeet } from './googlemeet.js';
import { Button, TextField, Container, Typography } from '@mui/material';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [meetLink, setMeetLink] = useState('');

  const updateSignInStatus = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
  };

  useEffect(() => {
    initClient(updateSignInStatus);
  }, []);

  const createMeet = () => {
    const event = {
      summary: 'Google Meet',
      description: 'One-on-one meeting',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(new Date().getTime() + 30 * 60000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      conferenceData: {
        createRequest: {
          requestId: "sample123",
          conferenceSolutionKey: {
            type: "hangoutsMeet"
          },
        },
      },
    };

    createGoogleMeet(event).then((response) => {
      const meetUrl = response.result.hangoutLink;
      setMeetLink(meetUrl);
    });
  };

  return (
    <Container>
      <Typography variant="h4">Google Meet Integration</Typography>
      {!isSignedIn ? (
        <Button variant="contained" color="primary" onClick={handleAuthClick}>
          Sign In
        </Button>
      ) : (
        <div>
          <Button variant="contained" color="secondary" onClick={handleSignoutClick}>
            Sign Out
          </Button>
          <Button variant="contained" color="primary" onClick={createMeet}>
            Create Google Meet
          </Button>
          {meetLink && (
            <Typography variant="body1">
              Join the meeting: <a href={meetLink}>{meetLink}</a>
            </Typography>
          )}
        </div>
      )}
    </Container>
  );
};

export default App;
