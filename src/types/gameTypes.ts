// --------------------------------
// Enumerating types
// --------------------------------

export type AllSectors =
	// Technology
	| 'information-technology'
	| 'software-saas'
	| 'hardware-devices'
	| 'ai-machine-learning'
	| 'cybersecurity'
	// Finance
	| 'fintech'
	| 'biotech'
	| 'healthtech'
	| 'greentech-cleantech'
	| 'edtech'
	| 'banking'
	| 'investment-asset-management'
	| 'insurance'
	| 'accounting-audit'
	| 'venture-capital-private-equity'
	// Manufacturing
	| 'manufacturing'
	| 'construction'
	| 'automotive'
	| 'aerospace-defense'
	| 'logistics-supply-chain'
	// Energy
	| 'oil-gas'
	| 'renewable-energy'
	| 'utilities'
	| 'environmental-services'
	// Healthcare
	| 'pharmaceuticals'
	| 'medical-devices'
	| 'hospitals-clinics'
	| 'healthcare-services'
	| 'r-d-biomed'
	// Services
	| 'retail'
	| 'consumer-goods'
	| 'fashion-apparel'
	| 'luxury-goods'
	| 'food-beverage'
	// Media
	| 'telecommunications'
	| 'media-entertainment'
	| 'publishing'
	| 'advertising-marketing'
	| 'social-media'
	// Education
	| 'k12-education'
	| 'higher-education'
	| 'online-learning'
	| 'professional-training'
	// Travel
	| 'airlines'
	| 'hospitality'
	| 'tourism'
	| 'recreation'
	// Government
	| 'government-public'
	| 'legal-services';

export type AllProducts = string;

export type AllActions =
	| 'marketing'
	| 'investing'
	| 'hiring'
	| 'expansion'
	| 'research'
	| 'alliance'; // Ally action leads to the Alliance type

export type AllEvents =
	| 'world-war'
	| 'war'
	| 'virus'
	| 'terrorist-attack'
	| 'deflation'
	| 'inflation'
	| 'bankrupt'
	| 'tsunami'
	| 'simple-war'
	| 'economic-crash'
	| 'earthquake'
	| 'fire';

export type AllTradeStatus = 'pending' | 'accepted' | 'declined';

export type AllGameStatus = null | 'waiting' | 'started' | 'ended';

export type AllLocations =
	| 'Afghanistan'
	| 'Albania'
	| 'Algeria'
	| 'Andorra'
	| 'Angola'
	| 'Antigua and Barbuda'
	| 'Argentina'
	| 'Armenia'
	| 'Australia'
	| 'Austria'
	| 'Azerbaijan'
	| 'Bahamas'
	| 'Bahrain'
	| 'Bangladesh'
	| 'Barbados'
	| 'Belarus'
	| 'Belgium'
	| 'Belize'
	| 'Benin'
	| 'Bhutan'
	| 'Bolivia'
	| 'Bosnia and Herzegovina'
	| 'Botswana'
	| 'Brazil'
	| 'Brunei'
	| 'Bulgaria'
	| 'Burkina Faso'
	| 'Burundi'
	| 'Cabo Verde'
	| 'Cambodia'
	| 'Cameroon'
	| 'Canada'
	| 'Central African Republic'
	| 'Chad'
	| 'Chile'
	| 'China'
	| 'Colombia'
	| 'Comoros'
	| 'Congo (Congo-Brazzaville)'
	| 'Costa Rica'
	| 'Croatia'
	| 'Cuba'
	| 'Cyprus'
	| 'Czechia'
	| 'Democratic Republic of the Congo'
	| 'Denmark'
	| 'Djibouti'
	| 'Dominica'
	| 'Dominican Republic'
	| 'Ecuador'
	| 'Egypt'
	| 'El Salvador'
	| 'Equatorial Guinea'
	| 'Eritrea'
	| 'Estonia'
	| 'Eswatini'
	| 'Ethiopia'
	| 'Fiji'
	| 'Finland'
	| 'France'
	| 'Gabon'
	| 'Gambia'
	| 'Georgia'
	| 'Germany'
	| 'Ghana'
	| 'Greece'
	| 'Grenada'
	| 'Guatemala'
	| 'Guinea'
	| 'Guinea-Bissau'
	| 'Guyana'
	| 'Haiti'
	| 'Honduras'
	| 'Hungary'
	| 'Iceland'
	| 'India'
	| 'Indonesia'
	| 'Iran'
	| 'Iraq'
	| 'Ireland'
	| 'Israel'
	| 'Italy'
	| 'Ivory Coast'
	| 'Jamaica'
	| 'Japan'
	| 'Jordan'
	| 'Kazakhstan'
	| 'Kenya'
	| 'Kiribati'
	| 'Kuwait'
	| 'Kyrgyzstan'
	| 'Laos'
	| 'Latvia'
	| 'Lebanon'
	| 'Lesotho'
	| 'Liberia'
	| 'Libya'
	| 'Liechtenstein'
	| 'Lithuania'
	| 'Luxembourg'
	| 'Madagascar'
	| 'Malawi'
	| 'Malaysia'
	| 'Maldives'
	| 'Mali'
	| 'Malta'
	| 'Marshall Islands'
	| 'Mauritania'
	| 'Mauritius'
	| 'Mexico'
	| 'Micronesia'
	| 'Moldova'
	| 'Monaco'
	| 'Mongolia'
	| 'Montenegro'
	| 'Morocco'
	| 'Mozambique'
	| 'Myanmar'
	| 'Namibia'
	| 'Nauru'
	| 'Nepal'
	| 'Netherlands'
	| 'New Zealand'
	| 'Nicaragua'
	| 'Niger'
	| 'Nigeria'
	| 'North Korea'
	| 'North Macedonia'
	| 'Norway'
	| 'Oman'
	| 'Pakistan'
	| 'Palau'
	| 'Palestine'
	| 'Panama'
	| 'Papua New Guinea'
	| 'Paraguay'
	| 'Peru'
	| 'Philippines'
	| 'Poland'
	| 'Portugal'
	| 'Qatar'
	| 'Romania'
	| 'Russia'
	| 'Rwanda'
	| 'Saint Kitts and Nevis'
	| 'Saint Lucia'
	| 'Saint Vincent and the Grenadines'
	| 'Samoa'
	| 'San Marino'
	| 'Sao Tome and Principe'
	| 'Saudi Arabia'
	| 'Senegal'
	| 'Serbia'
	| 'Seychelles'
	| 'Sierra Leone'
	| 'Singapore'
	| 'Slovakia'
	| 'Slovenia'
	| 'Solomon Islands'
	| 'Somalia'
	| 'South Africa'
	| 'South Korea'
	| 'South Sudan'
	| 'Spain'
	| 'Sri Lanka'
	| 'Sudan'
	| 'Suriname'
	| 'Sweden'
	| 'Switzerland'
	| 'Syria'
	| 'Taiwan'
	| 'Tajikistan'
	| 'Tanzania'
	| 'Thailand'
	| 'Timor-Leste'
	| 'Togo'
	| 'Tonga'
	| 'Trinidad and Tobago'
	| 'Tunisia'
	| 'Turkey'
	| 'Turkmenistan'
	| 'Tuvalu'
	| 'Uganda'
	| 'Ukraine'
	| 'United Arab Emirates'
	| 'United Kingdom'
	| 'United States'
	| 'Uruguay'
	| 'Uzbekistan'
	| 'Vanuatu'
	| 'Vatican City'
	| 'Venezuela'
	| 'Vietnam'
	| 'Yemen'
	| 'Zambia'
	| 'Zimbabwe';

// --------------------------------
// Stats types
// --------------------------------

export type PlayerStatsType = {
	marketing: number;
	productivity: number;
	creativity: number;
	financeManagement: number;
	humanResources: number;
	leadership: number;
	communication: number;
	technicalSkill: number;
	negotiation: number;
	strategy: number;
	adaptability: number;
	stressManagement: number;
	riskManagement: number;
	analyticalThinking: number;
	resilience: number;
	innovation: number;
	reputation: number;
	learningSpeed: number;
	luck: number;
	ambition: number;
	talent: string;
};

export type CompanyStatsTypes = {
	attractiveness: number;
	innovation: number;
	reputation: number;
	productivity: number;
	scalability: number;
	compliance: number;
	security: number;
};

// --------------------------------
// Entities types
// --------------------------------

export type Player = {
	id: string;
	name: string;
	game_id: string;
	wealth: number;
	stats_json?: PlayerStatsType;
	location?: AllLocations; // country code or name
	// strengths?: string[];
	// weaknesses?: string[];
};

export type Company = {
	id: string;
	name: string;
	player_id: string;
	game_id: string;
	value: number;
	stats_json?: CompanyStatsTypes;
	sector: AllSectors;
	location?: AllLocations; // country code or name
	products: string[];
	description: string;
	hq_lat: number;
	hq_lng: number;
};

export type Game = {
	id: string;
	created_at: string;
	joined_player_number: number;
	max_player_number: number;
	tick_interval: number; // 3, 5, 10 min
	time: number; // in minutes (30, 60, 120)
	status: AllGameStatus;
};

export type Quarter = {
	id: string;
	game_id: string;
	number: number;
};

export type Event = {
	id: string;
	game_id: string;
	type: AllEvents;
	description: string;
	sector?: AllSectors;
	location?: AllLocations | AllLocations[]; // country code or name
	impact_factor: number; // 0.1 to 2, multiplier
	created_at: string;
};

export type Trade = {
	id: string;
	game_id: string;
	from_company_id: string;
	to_company_id: string;
	product: AllProducts;
	amount: number;
	status: AllTradeStatus;
	created_at: string;
};

export type Action = {
	id: string;
	game_id: string;
	player_id: string;
	type: AllActions;
	status: 'pending' | 'succeeded' | 'failed';
	effect: string; // human readable
	impact_factor: Partial<CompanyStatsTypes> | Partial<PlayerStatsType>; // e.g., +10% productivity
	created_at: string;
};

export type Alliance = {
	id: string;
	company_a: string;
	company_b: string;
	created_at: string;
};

export type Customer = {
	id: string;
	game_id: string;
	sector: AllSectors;
	quantity: number;
	price: number;
};

// --------------------------------
// Context types
// --------------------------------

export type GameContextType = {
	loading: boolean;
	player: Player | null;
	company: Company | null;
	gameId: string | null;
	setGameId: (value: string) => void;
	gameStatus: AllGameStatus;
	setGameStatus: (value: AllGameStatus) => void;
	maxPlayerNumber: number;
	setMaxPlayerNumber: (value: number) => void;
	joinedPlayerNumber: number;
	setJoinedPlayerNumber: (value: number) => void;
	userName: string;
	setUserName: (value: string) => void;
	time: number;
	setTime: (value: number) => void;
	start: boolean;
	setStart: (value: boolean) => void;
};
