/**
 * VIDEOS PER SEKTION — den enda filen du behöver ändra för videos.
 *
 * Byt video: ändra `id` (delen efter "v=" i YouTube-länken) och `title`.
 * Lägg till: lägg ett nytt { id, title, intro } i rätt sektions lista.
 * Exempel: https://www.youtube.com/watch?v=EXeTwQWrcwY  ->  id: "EXeTwQWrcwY"
 *
 * Skateboard-listan är flyttad oförändrad från skateboardeventcalendar.com.
 * Surfing, snowboard och inspiration: handplockade och godkända av Martin 2026-10-30.
 */
import type { SectionId } from '@/lib/sections';

export interface FeaturedVideo {
  id: string;
  title: string;
  intro: string;
}

const skateboard: FeaturedVideo[] = [] = [
  {
    id: "bV1b_-7zf-s",
    title: "THE SEARCH FOR ANIMAL CHIN",
    intro: "Join the Bones Brigade – Tony Hawk, Rodney Mullen, Lance Mountain, Steve Caballero and the rest – on a wild quest for the legendary skateboarding master Animal Chin.",
  },
  {
    id: "MNujEnJCt4E",
    title: "Santa Cruz Wheels of Fire",
    intro:"Santa Cruz Wheels of Fire från 1987 – en rå, energifylld skateklassiker med Jeff Kendall, Rob Roskopp och resten av gänget. Full av street, pools, downhill och ren 80-tals-attityd.",
  },
  {
    id: "pV98sz8px8I",
    title: "Flip Extremely Sorry (2009)",
    intro: "Flip Extremely Sorry (2009) – one of the most acclaimed skate videos of all time. Geoff Rowley, Bob Burnquist, Shane Cross, Arto Saari and the rest of the star-studded team deliver pure magic.",
  },
  {
    id: "TnZ5a4B9Ado",
    title:" N-Men: The Untold Story",
    intro: "N-Men: The Untold Story (dir. James Sweigert) – the untold story of the underground Northern California crew that kept skateboarding alive. Featuring Tony Hawk, Steve Caballero & Tony Alva.",
  },
  {
    id: "DKh_Tf5sRLI",
    title: "Top Skateboarding Moments: 25 Years ",
    intro: "Top Skateboarding Moments: 25 Years of X – the greatest highlights from a quarter-century of X Games skateboarding. From Ryan Sheckler’s breakthrough to Danny Way’s massive Big Air",
  },
  {
    id: "7YKPEDayb_U",
    title: "Dogtown & Z-Boys (2001, dir. Stacy Peralta)",
    intro: "Dogtown & Z-Boys (2001, dir. Stacy Peralta) – the legendary documentary about the wild Venice Beach crew that reinvented skateboarding in the 1970s and gave birth to extreme sports.",
  },
  {
    id: "XA9q4cmh9j0",
    title: "Skateboard Kings (1978)",
    intro: "Skateboard Kings (1978) – the raw, original Dogtown documentary capturing Tony Alva, Stacy Peralta, Shogo Kubo and the early Z-Boys scene in its purest form.",
  },
  {
    id: "-2s_77ZoCHE",
    title: "Keegan Palmer wins gold",
    intro: "Keegan Palmer wins gold again! 🇦🇺 Men’s Park Skateboarding highlights from Paris 2024 – the Australian repeats as Olympic champion with a flawless run.",
  },
  {
    id: "lHJ-0YOLJ_o",
    title: "Arisa Trew becomes Australia’s youngest Olympic gold medallist ",
    intro: "Arisa Trew becomes Australia’s youngest Olympic gold medallist 🛹🥇 – the 14-year-old dominates Women’s Park Skateboarding at Paris 2024.",
  },
  {
    id: "mhSRk4q0cbk",
    title: "H-Street Shackle Me Not (1988)",
    intro: "H-Street Shackle Me Not (1988) – the raw, groundbreaking video that changed skate videos forever. Matt Hensley, Danny Way, Tony Mag and the crew deliver pure 80s style, innovation and attitude.",
  },
];

const surfing: FeaturedVideo[] = [
  {
    id: "aHM2BzDeo_8",
    title: "Nazaré's Biggest Swell in Years | Mountains of the Sea",
    intro: "Nic Von Rupp and the Mountains of the Sea crew on one of the longest, most powerful swells at Nazaré in years – waves around nine metres and strong wind.",
  },
  {
    id: "XW2bUznKNmM",
    title: "Unstad Arctic Surf - Norway",
    intro: "A short film about Unstad in Lofoten – the surf school and the waves above the Arctic Circle, on the same coast our Norway article maps.",
  },
  {
    id: "zwgsG92j_Es",
    title: "Cold Hawaii - Life is better when you surf",
    intro: "Seven minutes along the Danish coast between Agger and Hanstholm – Cold Hawaii in its element.",
  },
];

const snowboard: FeaturedVideo[] = [
  {
    id: "2JHE2zkRfW4",
    title: "The Fourth Phase | Official Trailer",
    intro: "Travis Rice follows the water cycle around the North Pacific – from Wyoming via Japan and Russia to Alaska. Official trailer from Red Bull.",
  },
  {
    id: "uk8TiKqJUdY",
    title: "The Art of Flight (Full Film) with Travis Rice",
    intro: "The full Art of Flight – the film that set a new standard for snowboard movies, with Travis Rice and crew in some of the wildest mountains on earth.",
  },
  {
    id: "9CfCej-ii2A",
    title: "2023 Natural Selection Tour – Revelstoke Highlights",
    intro: "Highlights and interviews from the 2023 Natural Selection Tour in Revelstoke, won by Zoi Sadowski-Synnott and Travis Rice.",
  },
];

const inspiration: FeaturedVideo[] = [
  {
    id: "FnrPZuN0m-0",
    title: "How Frank Gehry's Guggenheim Bilbao Changed Architecture Forever",
    intro: "How the Guggenheim Bilbao was designed and built – the titanium skin, the engineering and the building that changed architecture. The model for our Inspiration section.",
  },
  {
    id: "2yldY5KmX28",
    title: "Guggenheim Bilbao: how one building changed a city's future",
    intro: "Travel and architecture in one: how a single museum turned Bilbao into a destination.",
  },
  {
    id: "iL9YnY4UJsM",
    title: "Meet Sebastião Salgado",
    intro: "A portrait of photographer Sebastião Salgado, recipient of the Sony World Photography Awards' Outstanding Contribution to Photography award in 2024.",
  },
];

export const videos: Record<SectionId, FeaturedVideo[]> = {
  surfing,
  skateboard,
  snowboard,
  inspiration
};

/**
 * VIDEOS PÅ DESIGNSIDAN — visas under designartiklarna på respektive
 * sektions designsida. Samma format som ovan: { id, title, intro }.
 */
export const designVideos: Record<SectionId, FeaturedVideo[]> = {
  surfing: [],
  skateboard: [],
  snowboard: [],
  inspiration: [
    {
      id: "pujcD9OgB0A",
      title: "The World is a Skatepark: Photographer J. Grant Brittain",
      intro: "Legendary skateboarding photographer J. Grant Brittain shares stories from his 40-year career, which began at the Del Mar Skate Ranch and led to co-founding TransWorld SKATEboarding in 1983. Read more in our article on the photographers who framed board culture.",
    },
    {
      id: "alWlPHFXlZM",
      title: "How To: Shoot Skate Photos in a Bowl – Grant Brittain – In Focus",
      intro: "Grant Brittain shows how he approaches photographing skateboarding in a bowl.",
    },
    {
      id: "uenv7PXwvhk",
      title: "How To: Composition – Michael Burnett – In Focus (Part 1 of 2)",
      intro: "Skateboarding photographer Michael Burnett on composition: how to frame a skate photo. Part one of two.",
    },
  ],
};
