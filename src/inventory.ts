/// <reference types="@workadventure/iframe-api-typings" />

const registerButton = () => {
	WA.ui.actionBar.addButton({
		id: "register-btn",
		label: "Inventory",
		callback: (event) => {
			console.log("Inventory Button clicked", event);
			WA.ui.modal.openModal({
				allowApi: true,
				position: "center",
				allow: null,
				src: "https://vooo-backpack.vercel.app/",
				title: "Inventory",
			});
		},
	});
};

export default registerButton;
