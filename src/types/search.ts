export interface Participants {
  adults: number;
  children: number;
}

export interface SearchParams {
  from: string;
  destination: string;
  date: string;
  nights: number;
  participants: Participants;
  travelType: 'package' | 'hotel' | 'flight';
}

export interface Filters {
  from: string;
  destination: string;
  participants: Participants;
  date: string;
  nights: number;
  hotelConcepts: string[];
  flightConcepts: string[];
  stars: number[];
}
