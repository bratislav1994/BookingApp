import { Country } from "app/country/country.model";

export class Region {
    Id: number;
    Name: string;
    CountryId: number;
    Country: Country;

    constructor (id: number, name: string, countryId: number) {
        this.Id = id;
        this.Name = name;
        this.CountryId = countryId;
    }
}