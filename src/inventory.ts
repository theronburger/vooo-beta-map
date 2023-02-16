/// <reference types="@workadventure/iframe-api-typings" />

function message_broadcast(message: any) {
	localStorage.setItem("message", JSON.stringify(message));
}

const registerButton = () => {
	console.log("Adding Inventory button to UI");

	WA.ui.actionBar.addButton({
		id: "register-btn",
		label: "Inventory",
		callback: (event) => {
			console.log("Inventory Button clicked", event);
			message_broadcast("Inventory Button clicked");
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
