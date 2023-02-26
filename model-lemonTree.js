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
						target: "onLemonQuest",
						mustHave: ["lemonQuest"],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
					{
						target: "lemonTaken",
						mustHave: ["lemonTaken"],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
					{
						target: "lemonTree",
						mustHave: [],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
				],
			},
			events: {},
		},
		lemonTree: {
			image: "lemonTree.png",
			text: "A small lemon tree covered in ripe lemons",
			events: {
				exit: {
					text: "exit",
					actions: [
						{
							target: "exit",
							mustHave: [],
							mustNotHave: [],
							acquire: [],
							loose: [],
						},
					],
				},
			},
		},
		lemonQuest: {
			image: "lemonTree.png",
			text: "A small lemon tree covered in ripe lemons",
			events: {
				takeLemon: {
					text: "Take a lemon",
					actions: [
						{
							target: "lemonTaken",
							mustHave: [],
							mustNotHave: [],
							acquire: ["lemon", "lemonTaken"],
							loose: [],
						},
					],
				},
			},
		},
		lemonTaken: {
			image: "lemonTreePlucked.png",
			text: "A small lemon tree with one less lemon",
			events: {
				exit: {
					text: "exit",
					actions: [
						{
							target: "exit",
							mustHave: [],
							mustNotHave: [],
							acquire: [],
							loose: [],
						},
					],
				},
			},
		},
	},
};
