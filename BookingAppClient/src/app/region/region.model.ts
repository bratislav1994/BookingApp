import { Country } from "app/country/country.model";
import { Place } from "app/place/place.model";

export class Region {
    Id: number;
    Name: string;
    CountryId: number;
    Country: Country;
    Places: Place[];

    constructor (id?: number, name?: string, countryId?: number, places?: Place[]) {
        this.Id = id;
        this.Name = name;
        this.CountryId = countryId;
        this.Places = places;
    }
}