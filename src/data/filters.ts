export type Filter = {
  id: string;
  label: string;
  icon: string;
  category: string;
};

const GENRES: Filter[] = [
  { id: "Action", label: "Action", icon: "💥", category: "Genre" },
  { id: "Adventure", label: "Adventure", icon: "🗺️", category: "Genre" },
  { id: "Animation", label: "Animation", icon: "✏️", category: "Genre" },
  { id: "Biography", label: "Biography", icon: "📔", category: "Genre" },
  { id: "Comedy", label: "Comedy", icon: "😂", category: "Genre" },
  { id: "Crime", label: "Crime", icon: "🔫", category: "Genre" },
  { id: "Documentary", label: "Documentary", icon: "🎥", category: "Genre" },
  { id: "Drama", label: "Drama", icon: "🎭", category: "Genre" },
  { id: "Family", label: "Family", icon: "👨‍👩‍👧", category: "Genre" },
  { id: "Fantasy", label: "Fantasy", icon: "🧙", category: "Genre" },
  { id: "Film-Noir", label: "Film-Noir", icon: "🕵️", category: "Genre" },
  { id: "History", label: "History", icon: "📜", category: "Genre" },
  { id: "Horror", label: "Horror", icon: "👻", category: "Genre" },
  { id: "Musical", label: "Musical", icon: "🎼", category: "Genre" },
  { id: "Music", label: "Music", icon: "🎵", category: "Genre" },
  { id: "Mystery", label: "Mystery", icon: "🔍", category: "Genre" },
  { id: "Romance", label: "Romance", icon: "❤️", category: "Genre" },
  { id: "Sci-Fi", label: "Sci-Fi", icon: "🚀", category: "Genre" },
  { id: "Short", label: "Short", icon: "⏱️", category: "Genre" },
  { id: "Sport", label: "Sport", icon: "⚽", category: "Genre" },
  { id: "Thriller", label: "Thriller", icon: "🌪️", category: "Genre" },
  { id: "War", label: "War", icon: "⚔️", category: "Genre" },
  { id: "Western", label: "Western", icon: "🤠", category: "Genre" },
];

const DECADES: Filter[] = [
  { id: "1920s", label: "1920s", icon: "🎞️", category: "Decade" },
  { id: "1930s", label: "1930s", icon: "🎞️", category: "Decade" },
  { id: "1940s", label: "1940s", icon: "🎞️", category: "Decade" },
  { id: "1950s", label: "1950s", icon: "🎞️", category: "Decade" },
  { id: "1960s", label: "1960s", icon: "🎞️", category: "Decade" },
  { id: "1970s", label: "1970s", icon: "🎞️", category: "Decade" },
  { id: "1980s", label: "1980s", icon: "🎞️", category: "Decade" },
  { id: "1990s", label: "1990s", icon: "🎞️", category: "Decade" },
  { id: "2000s", label: "2000s", icon: "🎞️", category: "Decade" },
  { id: "2010s", label: "2010s", icon: "🎞️", category: "Decade" },
  { id: "2020s", label: "2020s", icon: "🎞️", category: "Decade" },
];

const COUNTRIES: Filter[] = [
  { id: "France", label: "France", icon: "🇫🇷", category: "Country" },
  { id: "USA", label: "USA", icon: "🇺🇸", category: "Country" },
  { id: "UK", label: "UK", icon: "🇬🇧", category: "Country" },
  { id: "Italy", label: "Italy", icon: "🇮🇹", category: "Country" },
  { id: "Spain", label: "Spain", icon: "🇪🇸", category: "Country" },
  { id: "Germany", label: "Germany", icon: "🇩🇪", category: "Country" },
  { id: "Japan", label: "Japan", icon: "🇯🇵", category: "Country" },
  { id: "S. Korea", label: "S. Korea", icon: "🇰🇷", category: "Country" },
  { id: "India", label: "India", icon: "🇮🇳", category: "Country" },
  { id: "Brazil", label: "Brazil", icon: "🇧🇷", category: "Country" },
  { id: "Canada", label: "Canada", icon: "🇨🇦", category: "Country" },
  { id: "Mexico", label: "Mexico", icon: "🇲🇽", category: "Country" },
  { id: "Australia", label: "Australia", icon: "🇦🇺", category: "Country" },
  { id: "China", label: "China", icon: "🇨🇳", category: "Country" },
  { id: "Hong Kong", label: "Hong Kong", icon: "🇭🇰", category: "Country" },
  { id: "Argentina", label: "Argentina", icon: "🇦🇷", category: "Country" },
  { id: "Sweden", label: "Sweden", icon: "🇸🇪", category: "Country" },
  { id: "Denmark", label: "Denmark", icon: "🇩🇰", category: "Country" },
  { id: "Netherlands", label: "Netherlands", icon: "🇳🇱", category: "Country" },
  { id: "Belgium", label: "Belgium", icon: "🇧🇪", category: "Country" },
  { id: "Poland", label: "Poland", icon: "🇵🇱", category: "Country" },
  { id: "Russia", label: "Russia", icon: "🇷🇺", category: "Country" },
  { id: "Turkey", label: "Turkey", icon: "🇹🇷", category: "Country" },
  { id: "Iran", label: "Iran", icon: "🇮🇷", category: "Country" },
  { id: "Israel", label: "Israel", icon: "🇮🇱", category: "Country" },
];

const LANGUAGES: Filter[] = [
  { id: "lang-en", label: "English", icon: "🗣️", category: "Language" },
  { id: "lang-fr", label: "French", icon: "🗣️", category: "Language" },
  { id: "lang-es", label: "Spanish", icon: "🗣️", category: "Language" },
  { id: "lang-it", label: "Italian", icon: "🗣️", category: "Language" },
  { id: "lang-de", label: "German", icon: "🗣️", category: "Language" },
  { id: "lang-ja", label: "Japanese", icon: "🗣️", category: "Language" },
  { id: "lang-ko", label: "Korean", icon: "🗣️", category: "Language" },
  { id: "lang-zh", label: "Mandarin", icon: "🗣️", category: "Language" },
  { id: "lang-hi", label: "Hindi", icon: "🗣️", category: "Language" },
  { id: "lang-pt", label: "Portuguese", icon: "🗣️", category: "Language" },
  { id: "lang-ru", label: "Russian", icon: "🗣️", category: "Language" },
  { id: "lang-ar", label: "Arabic", icon: "🗣️", category: "Language" },
];

const STUDIOS: Filter[] = [
  { id: "Disney", label: "Disney", icon: "🏰", category: "Studio" },
  { id: "Warner Bros", label: "Warner Bros", icon: "🎬", category: "Studio" },
  { id: "Universal", label: "Universal", icon: "🌐", category: "Studio" },
  { id: "Paramount", label: "Paramount", icon: "⛰️", category: "Studio" },
  { id: "Sony", label: "Sony", icon: "📺", category: "Studio" },
  { id: "A24", label: "A24", icon: "🎨", category: "Studio" },
  { id: "Ghibli", label: "Studio Ghibli", icon: "🌳", category: "Studio" },
  { id: "Pixar", label: "Pixar", icon: "💡", category: "Studio" },
  { id: "Netflix", label: "Netflix", icon: "🍿", category: "Studio" },
  { id: "HBO", label: "HBO", icon: "📡", category: "Studio" },
  { id: "Apple TV+", label: "Apple TV+", icon: "🍎", category: "Studio" },
  { id: "Amazon", label: "Amazon", icon: "📦", category: "Studio" },
];

const AWARDS: Filter[] = [
  { id: "Oscar", label: "Oscar Winner", icon: "🏆", category: "Award" },
  { id: "Cannes", label: "Palme d'Or", icon: "🌴", category: "Award" },
  { id: "Sundance", label: "Sundance", icon: "🎟️", category: "Award" },
  { id: "BAFTA", label: "BAFTA", icon: "🎖️", category: "Award" },
  { id: "Golden Globe", label: "Golden Globe", icon: "🌐", category: "Award" },
  { id: "Berlinale", label: "Berlinale", icon: "🐻", category: "Award" },
];

const RATINGS: Filter[] = [
  { id: "G", label: "G", icon: "🟢", category: "Rating" },
  { id: "PG", label: "PG", icon: "🟡", category: "Rating" },
  { id: "PG-13", label: "PG-13", icon: "🟠", category: "Rating" },
  { id: "R", label: "R", icon: "🔴", category: "Rating" },
  { id: "NC-17", label: "NC-17", icon: "⛔", category: "Rating" },
  { id: "Unrated", label: "Unrated", icon: "⚪", category: "Rating" },
];

export const ALL_FILTERS: Filter[] = [
  ...GENRES,
  ...DECADES,
  ...COUNTRIES,
  ...LANGUAGES,
  ...STUDIOS,
  ...AWARDS,
  ...RATINGS,
];
