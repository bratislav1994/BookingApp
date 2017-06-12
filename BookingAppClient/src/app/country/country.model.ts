import { Region } from "app/region/region.model"

export class Country {
    Id: number;
    Name: string;
    Code: string;
    Regions : Region[];

    constructor(Id?: number, Name?: string, Code?: string, regions?: Region[]) {
        this.Id = Id;
        this.Name = Name;
        this.Code = Code;
        this.Regions = regions;
    }
}