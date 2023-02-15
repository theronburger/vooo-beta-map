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
				src: "https://vercel.com/theronburger/vooo-backpack/9VsE7itoVJGy59KhZAe3vZ2ui5ca",
				title: "Inventory",
			});
		},
	});
};

export default registerButton;
