import { Region } from "app/region/region.model";
import { Country } from "app/country/country.model";

export class Place {
    
    Id: number;
    Name: string;
    RegionId: number;

    constructor (id: number, name: string, regionId: number) {
        this.Id = id;
        this.Name = name;
        this.RegionId = regionId;
    }
}