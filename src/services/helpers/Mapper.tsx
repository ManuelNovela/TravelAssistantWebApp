import { countryCurrencyMapping } from '../interfaces/countryCurrencyMapping';
import { countryNameMapping } from '../interfaces/countryNameMapping';

export const getCurrencyByCountryCode = (countryCode: string): string | undefined => {
  return countryCurrencyMapping[countryCode];
};

export const getCountryNameByCode = (countryCode: string): string | undefined => {
  return countryNameMapping[countryCode];
};
