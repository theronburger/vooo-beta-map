/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import registerButton from "./inventory";

console.log("Script started successfully");
let metPumpkinScarecrow = false;
let hasPumpkin = false;

function message_receive(ev: any) {
	console.group("Storage Message Received");
	console.log(ev);
	// if (ev.key == 'message') {
	//     var message=JSON.parse(ev.newValue);
	// 	console.log(message);
	// }
}

WA.onInit()
	.then(() => {
		console.log("Scripting API ready");
		console.log("Player tags: ", WA.player.tags);
		registerButton();

		// let bc = new BroadcastChannel("lcb-inventory");
		// bc.postMessage(
		// 	JSON.stringify(["cabbage", "carrot", "pumpkin"])
		// ); /* send */
		// bc.onmessage = function (ev) {
		// 	console.log(ev);
		// }; /* receive */

		window.addEventListener("storage", message_receive);

		WA.room.area.onEnter("scarecrowCabbage").subscribe(() => {
			console.log("Entered scarecrowCabbage box");

			// const today = new Date();
			// const time = today.getHours() + ":" + today.getMinutes();
			// currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
			if (!hasPumpkin) {
				WA.chat.sendChatMessage(
					"Get out of my cabbage patch!",
					"An angry scarecrow"
				);
			} else {
				WA.chat.sendChatMessage(
					"Hey nice pumpkin...",
					"An angry scarecrow"
				);
				WA.chat.sendChatMessage(
					"Ill trade ya for a ring I found",
					"An angry scarecrow"
				);
			}

			WA.chat.onChatMessage((userMessage) => {
				console.log(`scarecrowCabbage onChatMessage : ${userMessage}`);
				if (hasPumpkin) {
					if (userMessage.toLocaleLowerCase().indexOf("sure") > -1) {
						WA.chat.sendChatMessage("Sweet!", "An angry scarecrow");
						WA.chat.sendChatMessage(
							"You lost one pumpkin",
							"Inventory"
						);
						WA.chat.sendChatMessage(
							"You acquired one gold ring",
							"Inventory"
						);
						hasPumpkin = false;
						// hasRing = true;
					}
				}
			});
		});

		WA.room.area.onEnter("scarecrowPumpkin").subscribe(() => {
			// const today = new Date();
			// const time = today.getHours() + ":" + today.getMinutes();
			// currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
			if (!metPumpkinScarecrow) {
				metPumpkinScarecrow = true;
				let messages = [
					"Oh hi!",
					"Say, can you do me a favor",
					"Can you straighten my hat",
					"Its been bugging me for days now",
				];
				let totalDelay = 0;
				messages.forEach((message) => {
					const delay = Math.floor(
						Math.random() * (1000 - 500 + 1) + 500
					);
					totalDelay = totalDelay + delay;
					setTimeout(() => {
						WA.chat.sendChatMessage(
							message,
							"A friendly scarecrow"
						);
					}, totalDelay);
				});
				WA.chat.onChatMessage((userMessage) => {
					console.log(
						`scarecrowPumpkin onChatMessage : ${userMessage}`
					);
					if (metPumpkinScarecrow) {
						if (
							userMessage.toLocaleLowerCase().indexOf("sure") > -1
						) {
							WA.chat.sendChatMessage(
								"Ah thats really nice of you. Here, have a pumpkin!",
								"A friendly scarecrow"
							);
							WA.chat.sendChatMessage(
								"You acquired one pumpkin",
								"Inventory"
							);
							hasPumpkin = true;
						}
					}
				});
			}
		});

		// WA.room.area.onLeave('clock').subscribe(closePopup)
		// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
		bootstrapExtra()
			.then(() => {
				console.log("Scripting API Extra ready");
			})
			.catch((e) => console.error(e));
	})
	.catch((e) => console.error(e));

// function closePopup(){
//     if (currentPopup !== undefined) {
//         currentPopup.close();
//         currentPopup = undefined;
//     }
// }

export {};
