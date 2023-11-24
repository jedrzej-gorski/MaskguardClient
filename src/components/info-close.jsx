import React from 'react';

function InfoClose(props) {
	const width = props.width || '100%';
	const height = props.height || '100%';
	const title = props.title || "info close";
    const stateClass = props.isOpen ? "nc-int-icon-state-b" : "";
	const css = `.nc-int-icon-rotate{--animation-duration:0.4s;}.nc-int-icon{position:relative;}.nc-int-icon-b{position: absolute;top: calc(50% - 0.5em);left: calc(50% - 0.5em);opacity: 0;}.nc-int-icon-rotate .nc-int-icon-a,.nc-int-icon-rotate .nc-int-icon-b{transition: opacity 0s calc(var(--animation-duration)/2), transform var(--animation-duration); transform-origin: center center;}.nc-int-icon-rotate .nc-int-icon-b{transform: rotate(90deg) scale(0.6);}.nc-int-icon-state-b .nc-int-icon-a{opacity: 0;}.nc-int-icon-state-b .nc-int-icon-b{opacity: 1;}.nc-int-icon-rotate.nc-int-icon-state-b .nc-int-icon-a{transform: rotate(-90deg) scale(0.6);}.nc-int-icon-rotate.nc-int-icon-state-b .nc-int-icon-b{transform: rotate(0);}`;

	return (
		<svg height={height} width={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill="#212121">
		<g className={`nc-int-icon nc-int-icon-rotate js-nc-int-icon ${stateClass}`}>
			<g className="nc-int-icon-a">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#212121"/>
			</g>
			<g className="nc-int-icon-b">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#212121"/>
			</g>
		</g>
		<style>{css}</style>
	</g>
</svg>
	);
};

export default InfoClose;