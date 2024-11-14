import { Driver } from "./driver";

export interface Race {
    raceId: string,
    season: string,
    raceName: string,
    location: string,
    driver : Driver;
    
}
