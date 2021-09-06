const apiKey = '0694b207da3718174af5607fbd520b2d';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather() {
	const response = await fetch(
		`${baseUrl}/weather?q=rørvig,DK&appid=${apiKey}&units=metric`
	);
	const data = await response.json();

	return {
		...data,
		dt: new Date(data.dt),
		sys: {
			...data.sys,
			sunrise: new Date(data.sys.sunrise * 1000),
			sunset: new Date(data.sys.sunset * 1000),
		},
	};
}

export interface WeatherStatus {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface WeatherMain {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
	sea_level: number;
	grnd_level: number;
}

export interface WeatherWind {
	speed: number;
	deg: number;
	gust: number;
}

export interface WeatherFalldownVolume {
	'1h': number;
	'3h': number;
}

export interface CurrentWeatherResponse {
	coord: { lon: number; lat: number };
	weather: WeatherStatus[];
	base: string;
	main: WeatherMain;
	visibility: number;
	wind: WeatherWind;
	clouds: {
		all: number;
	};
	dt: Date;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: Date;
		sunset: Date;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
	rain?: WeatherFalldownVolume;
	snow?: WeatherFalldownVolume;
}
