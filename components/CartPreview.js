import {useEffect} from "react";
import Lottie from "lottie-web";

export default function CartPreview({file, id}) {
	useEffect(() => {
		Lottie.loadAnimation({
			container: document.getElementById(`cartPreview${id}`),
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: file,
			name: `cartPreview${id}`
		});
		return () => Lottie.destroy(`cartPreview${id}`);
	}, [file, id]);

	return <div id={`cartPreview${id}`}></div>;
}
