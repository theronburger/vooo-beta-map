import{r as t,b as c}from"./inventory-f2c67223.js";console.log("Script started successfully");let r=!1,o=!1;function g(e){console.group("Storage Message Received"),console.log(e)}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),t(),window.addEventListener("storage",g),WA.room.area.onEnter("scarecrowCabbage").subscribe(()=>{console.log("Entered scarecrowCabbage box"),o?(WA.chat.sendChatMessage("Hey nice pumpkin...","An angry scarecrow"),WA.chat.sendChatMessage("Ill trade ya for a ring I found","An angry scarecrow")):WA.chat.sendChatMessage("Get out of my cabbage patch!","An angry scarecrow"),WA.chat.onChatMessage(e=>{console.log(`scarecrowCabbage onChatMessage : ${e}`),o&&e.toLocaleLowerCase().indexOf("sure")>-1&&(WA.chat.sendChatMessage("Sweet!","An angry scarecrow"),WA.chat.sendChatMessage("You lost one pumpkin","Inventory"),WA.chat.sendChatMessage("You acquired one gold ring","Inventory"),o=!1)})}),WA.room.area.onEnter("scarecrowPumpkin").subscribe(()=>{if(!r){r=!0;let e=["Oh hi!","Say, can you do me a favor","Can you straighten my hat","Its been bugging me for days now"],s=0;e.forEach(a=>{const n=Math.floor(Math.random()*501+500);s=s+n,setTimeout(()=>{WA.chat.sendChatMessage(a,"A friendly scarecrow")},s)}),WA.chat.onChatMessage(a=>{console.log(`scarecrowPumpkin onChatMessage : ${a}`),r&&a.toLocaleLowerCase().indexOf("sure")>-1&&(WA.chat.sendChatMessage("Ah thats really nice of you. Here, have a pumpkin!","A friendly scarecrow"),WA.chat.sendChatMessage("You acquired one pumpkin","Inventory"),o=!0)})}}),c().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(e=>console.error(e));