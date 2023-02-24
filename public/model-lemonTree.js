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
		ready: {
			image: "",
			text: "",
			onEntry: {
				actions: [
					{
						target: "hasNoLemon",
						mustHave: [],
						mustNotHave: ["lemon"],
						acquire: [],
						loose: [],
					},
					{
						target: "hasLemon",
						mustHave: ["lemon"],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
				],
			},
			events: {},
		},
		hasNoLemon: {
			image: "lemonTree.png",
			text: "A small lemon tree covered in ripe lemons",
			events: {
				takeLemon: {
					text: "Take a lemon",
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
		hasLemon: {
			image: "lemonTreePlucked.png",
			text: "A small lemon tree with one less lemon",
			events: {},
		},
	},
};
