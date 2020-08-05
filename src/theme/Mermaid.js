import React from "react";
import mermaid from "mermaid";

export default function Mermaid({ chart }) {
	React.useEffect(() => {
		mermaid.initialize({
			startOnLoad: true
		});
		mermaid.contentLoaded();
		return () => { };
	}, []);
	return <div className="mermaid">{chart}</div>;
}
