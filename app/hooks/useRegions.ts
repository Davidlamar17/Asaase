import countries from "world-countries";

const formattedCountries = countries
  .filter((country) => country.name.common === "Ghana")
  .map((country) => ({ value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}));

const useRegions = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value ===
         value);
    }

      return {
        getAll,
        getByValue,
      }; 
};

export default useRegions;
