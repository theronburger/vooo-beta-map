const model = {
	//Type can be inventory, object or dialog
	type: "object",
	initial: "init",
	states: {
		init: {
			events: {
				Ready: {
					actions: [
						{
							target: "ready",
						},
					],
				},
			},
		},
		//The "ready" event is triggered automatically at the start if the interaction
		//this should have neither image nor text to avoid flashing.
		ready: {
			image: "",
			text: "",
			onEntry: {
				actions: [
					{
						//If the player has ice-cream, go to the hasIcecream state
						target: "hasIcecreamLemon",
						mustHave: ["icecreamLemon"],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
					{
						target: "grumpy",
						mustHave: [],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
				],
			},
			events: {},
		},
		hasIcecreamLemon: {
			image: "bob-happy.png",
			text: "Don't talk to me this is a.... erm, hey that Lemon Ice-Cream looks amazing, where'd ya get it?",
			events: {
				silentZone: {
					text: "This is a silent zone!",
					actions: [
						{
							target: "hasLemon",
							mustHave: [],
							mustNotHave: [],
							acquire: ["lemon"],
							loose: [],
						},
					],
				},
				silentZone: {
					text: "From the store right over there! They just made a fresh batch",
					actions: [
						{
							target: "hasLemon",
							mustHave: [],
							mustNotHave: [],
							acquire: ["lemon"],
							loose: [],
						},
					],
				},
			},
		},
		grumpy: {
			image: "bob-busy.png",
			text: "Stop talking to me. Cant you see this is a silent zone!",
			events: {},
		},
	},
};
