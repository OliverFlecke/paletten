const apiKey = '0694b207da3718174af5607fbd520b2d';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const coord = { lat: 55.9441, lon: 11.7527 };

export async function getWeather(): Promise<WeatherResponse> {
	const response = await fetch(
		`${baseUrl}/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}&exclude=minutely`
	);
	const data = await response.json();

	return {
		...data,
		dt: new Date(data.dt * 1000),
		current: {
			...data.current,
			dt: new Date(data.current.dt * 1000),
			sunrise: new Date(data.current.sunrise * 1000),
			sunset: new Date(data.current.sunset * 1000),
		},
		hourly: data.hourly?.map((x) => ({
			...x,
			dt: new Date(x.dt * 1000),
		})),
		daily: data.daily?.map((x) => ({
			...x,
			dt: new Date(x.dt * 1000),
			sunset: new Date(x.sunset * 1000),
			sunrise: new Date(x.sunrise * 1000),
			moonset: new Date(x.moonset * 1000),
			moonrise: new Date(x.moonrise * 1000),
		})),
	};
}

export interface WeatherStatus {
	id: number;
	main: string;
	description: string;
	icon: string;
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

export interface WeatherResponse {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current?: WeatherCurrentResponse;
	minutely?: WeatherMinutely[];
	hourly?: WeatherHourly[];
	daily?: WeatherDaily[];
}

export interface WeatherCurrentResponse {
	dt: Date;
	sunrise: Date;
	sunset: Date;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherStatus[];
	rain?: WeatherFalldownVolume;
	snow?: WeatherFalldownVolume;
}

interface WeatherMinutely {
	dt: Date;
	precipitation: number;
}

export interface WeatherHourly {
	dt: Date;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherStatus[];
	pop: number;
	rain?: WeatherFalldownVolume;
	snow?: WeatherFalldownVolume;
}

export interface WeatherDaily {
	dt: Date;
	sunrise: Date;
	sunset: Date;
	moonrise: Date;
	moonset: Date;
	moon_phase: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	};
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherStatus[];
	clouds: number;
	pop: number;
	uvi: number;
	rain?: WeatherFalldownVolume;
	snow?: WeatherFalldownVolume;
}
