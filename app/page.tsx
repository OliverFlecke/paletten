import AppTitle from "components/AppTitle";
import Main from "features/Main";
import pkg from "../package.json";
import styles from "./page.module.css";

export default function App() {
	return (
		<>
			<AppTitle />
			<Main />
			<span className={styles.version}>Version: {pkg.version}</span>
		</>
	);
}
