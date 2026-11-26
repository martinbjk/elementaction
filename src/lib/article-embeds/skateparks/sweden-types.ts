/** En svensk betongpark i den sökbara listan i artikeln skateparks-sweden-travel-guide. */
export type SwedenRegion =
  | 'Skåne & Blekinge'
  | 'West Sweden'
  | 'Småland & Öland'
  | 'Stockholm, Mälardalen & East'
  | 'Dalarna & Gävleborg'
  | 'Norrland';

export interface SwedenSkatepark {
  id: string;
  name: string;
  town: string;
  region: SwedenRegion;
  address: string | null;
  built: string | null;
  sizeM2: number | null;
  builder: string | null;
  features: string | null;
  /** true = upplyst, false = ej upplyst, null = okänt */
  lit: boolean | null;
  tags: string[];
  note: string | null;
  /** sidan på Skateparksguiden som uppgifterna kommer från */
  source: string;
  /** false = orten finns i Skateparksguiden men detaljer är inte inlagda än */
  detailed: boolean;
}
