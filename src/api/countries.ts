import axios from "axios";
import { Country } from "../types/country";

export const getCountries = async (): Promise<Country[]> => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error; // Propagate the error to be handled by the caller
    }
};