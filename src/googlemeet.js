// src/googleMeet.js

import { gapi } from 'gapi-script';

const CLIENT_ID = '512538371782-rfps8e7p7arig3npc7jh7u1vm809kal5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBAnl4Lm1xh3OCZTUj5huvnTqO3zHfpz0Y';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initClient = (updateSignInStatus) => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  });
};

export const handleAuthClick = () => {
  gapi.auth2.getAuthInstance().signIn();
};

export const handleSignoutClick = () => {
  gapi.auth2.getAuthInstance().signOut();
};

export const createGoogleMeet = (event) => {
  return gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });
};
