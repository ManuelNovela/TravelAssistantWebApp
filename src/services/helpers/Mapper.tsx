import { countryCurrencyMapping } from '../interfaces/countryCurrencyMapping';

export const getCurrencyByCountryCode = (countryCode: string): string | undefined => {
  return countryCurrencyMapping[countryCode];
};
