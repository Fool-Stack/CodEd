import React, { useEffect, useRef } from "react";

const VideoPreview = ({ stream }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current && stream) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);
	if (!stream) {
		return null;
	}
	return (
		<video
			ref={videoRef}
			style={{ width: "80%", height: "30%" }}
			autoPlay
			controls
		/>
	);
};

export default VideoPreview;
