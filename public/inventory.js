const items = [
	{
		name: "Cabbage",
		src: "cabbage.png",
	},
	{
		name: "Carrot",
		src: "carrot.png",
	},
	{
		name: "Pumpkin",
		src: "pumpkin.png",
	},
];

const blankItems = Array(5 * 7 - items.length).fill({
	name: "Empty",
	src: "blank.png",
});
items = [...items, ...blankItems];

function message_receive(ev) {
	console.group("Storage Message Received");
	console.log(ev);
	console.groupEnd();
}

$(() => {
	console.log("Inventory Loaded");
	console.group("WorkAdventure Library (WA)");
	console.log(WA);
	console.groupEnd();

	$("#container").append(`
    <div class="backpack">
        <img
            src="/inventory.png"
            className="inventoryImage"
        />
        <div id="backpackContents" class="inventoryGrid">
        </div>
    </div>
    `);

	items.forEach((item, index) => {
		$("#backpackContents").append(`
        <img
            key={${index}}
            className="item"
            src="${item.src}"
            alt="${item.name}"
        />
    `);
	});

	window.addEventListener("storage", message_receive);
});
