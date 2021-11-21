export function getInitialsCountry(nationality: string): string {
  const country = {
    Austria: 'au',
    Brazil: 'br',
    Canadá: 'ca',
    Suica: 'ch',
    Alemanha: 'de',
    Espanha: 'es',
    França: 'fr',
    Irã: 'ira',
    Dinamarca: 'dk',
    Finlândia: 'fi',
    Noruega: 'no',
    Irlanda: 'ie',
    Holanda: 'nl',
    Nova: 'nz',
    Turquia: 'tr',
    Estados: 'us',
    Reino: 'gb',
  };
  function getInitials(countryName: string) {
    return country[countryName];
  }
  return getInitials(nationality);
}

export function getCountry(countryCode: string): string {
  const country = {
    AU: 'Áustria',
    BR: 'Brasil',
    CA: ' Canadá ',
    CH: 'Suíça',
    DE: 'Alemanha',
    ES: 'Espanha',
    FR: 'França',
    GB: 'Reino Unido',
    IR: 'Irã',
    DK: 'Dinamarca',
    FI: 'Finlândia',
    NO: 'Noruega',
    IE: 'Irlanda',
    NL: 'Holanda',
    NZ: 'Nova Zelândia',
    TR: 'Turquia',
    US: 'Estados Unidos',
  };
  function countryName(countryCode: string) {
    return country[countryCode] ? country[countryCode] : 'Não encontrou país';
  }
  return countryName(countryCode);
}

export function getSex(sex: string): string {
  switch (sex) {
    case 'male':
      return 'Masculino';
    case 'female':
      return 'Feminino';
    default:
      return 'Não encontrou país encontrou sexo';
  }
}

export function formatDate(result: string): string {
  const date = result.split('T')[0];
  const prepareFormatDate = date.split('-');
  const formateDate = `${prepareFormatDate[2]}/${prepareFormatDate[1]}/${prepareFormatDate[0]}`;
  return formateDate;
}

export interface Results {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      name: string;
      number: number;
    };
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  email: string;
  login: {
    uuid: string;
  };
  id: {
    value: string;
  };
  dob: {
    date: string;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
