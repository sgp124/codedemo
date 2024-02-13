// import { useState, useEffect } from 'react';

// export interface TimeIOResponse {
//   year: number;
//   month: number;
//   day: number;
//   hour: number;
//   minute: number;
//   seconds: number;
//   milliSeconds: number;
//   dateTime: string;
//   date: string;
//   time: string;
//   timeZone: string;
//   dayOfWeek: string;
//   dstActive: boolean;
// }

// export class TimeIOService {


//    // useEffect(() => {
//     const timeZone = 'Europe/London'; // Adjust the time zone as needed
//     const corsProxy = 'https://cors-anywhere.herokuapp.com/';
//     const apiUrl = `https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`;

//     fetch(`${corsProxy}${apiUrl}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Include additional headers as required by cors-anywhere
//       },
//     })
//     .then(response => response.json())
//     .then(data => {
//       setCurrentTime(data.dateTime);
//       setCurrentDate(data.date);
//     })
//     .catch(error => {
//       console.error('Error fetching time data:', error);
//     });
//   //}, []);

//   // public async getCurrentTime(zone: string): Promise<TimeIOResponse> {
//   //   const url = `https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam`;
//   //   try {
//   //     const spHttpClientOptions: ISPHttpClientOptions = {
//   //       headers: {
//   //         'Accept': 'application/json',
//   //         // Additional headers can be specified here
//   //       }
//   //     };

//   //     console.log("Fetching time for zone:", zone);
//   //     const response: SPHttpClientResponse = await this.spHttpClient.get(url, SPHttpClient.configurations.v1, spHttpClientOptions);
      
//   //     if (response.status >= 200 && response.status < 300) {
//   //       const data: TimeIOResponse = await response.json();
//   //       console.log("API response:", data);
//   //       return data;
//   //     } else {
//   //       throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching time from TimeIO API', error);
//   //     throw error;
//   //   }
//   // }
// }

