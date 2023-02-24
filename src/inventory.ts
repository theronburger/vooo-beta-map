/// <reference types="@workadventure/iframe-api-typings" />

const registerButton = () => {
	console.log("Adding Inventory button to UI");

	WA.ui.actionBar.addButton({
		id: "register-btn",
		label: "Inventory",
		callback: (event) => {
			console.log("Inventory Button clicked", event);
			WA.ui.modal.openModal({
				allowApi: true,
				position: "center",
				allow: null,
				src: "https://theronburger.github.io/vooo-beta-map/interaction.html?inventory",
				title: "Inventory",
			});
		},
	});
};

export default registerButton;
