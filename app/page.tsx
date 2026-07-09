import AppTitle from "components/AppTitle";
import Main from "features/Main";
import pkg from "../package.json";

export default function App() {
	return (
		<>
			<AppTitle />
			<Main />
			<span className="text-sm">Version: {pkg.version}</span>
		</>
	);
}
