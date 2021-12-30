import {useEffect} from "react";
import Lottie from "lottie-web";

export default function AccountPreview({file, id, classN}) {
	useEffect(() => {
		Lottie.loadAnimation({
			container: document.getElementById(`accountPreview${id}`),
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: file,
			name: `accountPreview${id}`,
			rendererSettings: {
				className: classN
			}
		});
		return () => Lottie.destroy(`accountPreview${id}`);
	}, [file, id, classN]);

	return <div id={`accountPreview${id}`}></div>;
}
