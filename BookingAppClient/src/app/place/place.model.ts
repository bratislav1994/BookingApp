import { Region } from "app/region/region.model";

export class Place {
    
    Id: number;
    Name: string;
    RegionId: number;
    Region: Region;

    constructor (id?: number, name?: string, regionId?: number) {
        this.Id = id;
        this.Name = name;
        this.RegionId = regionId;
    }
}