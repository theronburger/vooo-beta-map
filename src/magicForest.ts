/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('scarecrowCabbage').subscribe(() => {
        // const today = new Date();
        // const time = today.getHours() + ":" + today.getMinutes();
        // currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
        WA.chat.sendChatMessage('Get out of my cabbage patch!', 'An angry scarecrow');
    })

    WA.room.area.onEnter('scarecrowPumpkin').subscribe(() => {
        // const today = new Date();
        // const time = today.getHours() + ":" + today.getMinutes();
        // currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
        let messages = [
            "Oh hi!", "Say, can you do me a favor", "Can you straighten my hat", "Its been bugging me for days now"
        ];
        let totalDelay = 0;
        messages.forEach((message => {
            const delay = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
            totalDelay = totalDelay + delay
            setTimeout(() => {
                WA.chat.sendChatMessage(message, 'A friendly scarecrow');
            }, totalDelay)
        }))
        WA.chat.onChatMessage((userMessage => {
            console.log('The user typed a message', userMessage);
            if (userMessage.toLocaleLowerCase().indexOf("sure")) {                
                WA.chat.sendChatMessage("Ah thats really nice of you. Here, have a pumpkin!", 'A friendly scarecrow');
            }
            
        }));
        
    })

    // WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
