export type Country = {
  name: string;
  code: string;
  dialCode: string,
  flag?: string,
};

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags');

  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data: Country[] = await response.json();

  const countries: Country[] = data
    .filter((c: any) => c.idd?.root && c.idd?.suffixes?.length > 0)
    .map((c: any) => ({
      name: c.name.common,
      code: c.cca2,
      dialCode: `${c.idd.root}${c.idd.suffixes[0] || ''}`, // fallback if suffix missing
      flag: c.flags?.png,
    }))
    .sort((a:Country, b:Country) => a.name.localeCompare(b.name));

  return countries;
};
