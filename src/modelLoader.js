const modelLoaderScript = document.createElement("script");
modelLoaderScript.id = "modelLoaderScript";
modelLoaderScript.src = `model-${window.location.search.substring(1)}.js`;
console.warn(
	`Loading model for ${window.location.search.substring(
		1
	)} from model-${window.location.search.substring(1)}.js`
);
document.body.appendChild(modelLoaderScript);
