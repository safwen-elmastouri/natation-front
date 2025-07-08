export interface User {
    id: number;
    email: string;
    type: string;
  }
  
  export interface Coach {
    id: number;
    user: User;
    verificationDate: string | null;
    verifiedBy: string | null;
    verified: boolean;
  }
  
  export interface Ranking {
    id: number;
    competitionTitle: string;
    competitionUrl: string;
    eventName: string;
    category: string;
    categoryUrl: string;
    eventTitle: string;
    place: string;
    fullName: string;
    nation: string;
    birthYear: string;
    club: string;
    time: string;
    points: string;
    passageTime: string;
  }
  
  export interface EventAPI {
    id: number;
    eventTitle: string;
    competitionTitle: string;
    damesUrl: string;
    messieursUrl: string;
    mixteUrl: string;
    rankings: Ranking[];
  }
  
  export interface Competition {
    id: number;
    title: string;
    url: string;
    season: string;
    dateStart: string;
    dateEnd: string;
    events: EventAPI[];
  }
  
  export interface Athlete {
    id: number;
    user: User;
    coach: Coach;
    nom: string;
    discipline: string;
    description: string;
    age: number;
    specialite: string;
    record: string;
    titre: string;
    image: string;
    competitions: Competition[];
  }
  