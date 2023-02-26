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
					//the onEntry actions happen automatically when entering the state.
					//They are checked in order. The first one that has all its conditions met is taken
					{
						target: "onLemonQuest",
						mustHave: ["lemonQuest"],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
					{
						target: "gotLemon",
						mustHave: ["lemon"],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
					//Notice this event has no conditions.
					//If it was first, it would always be taken and the lemonQuest token would never be checked
					//order matters!
					{
						target: "intro",
						mustHave: [],
						mustNotHave: [],
						acquire: [],
						loose: [],
					},
				],
			},
			events: {},
		},
		intro: {
			image: "molly-busy.png",
			text: "One moment, I'll be with you in a second",
			events: {
				//The events here become buttons in the UI
				wait: {
					//This is the button text
					text: "Wait for Molly",
					actions: [
						//This is a list of actions the button can have.
						//Notice they also have conditions.
						{
							target: "mollyReady",
							mustHave: [],
							mustNotHave: [],
							acquire: [],
							loose: [],
						},
					],
				},
			},
		},
		gotLemon: {
			image: "molly-order.png",
			text: "Oh amazing! You got me a lemon!",
			events: {
				giveLemon: {
					text: "Here ya go",
					actions: [
						{
							target: "mollyServeLemon",
							mustHave: [],
							mustNotHave: [],
							acquire: ["lemonQuestDone"],
							loose: ["lemonQuest", "lemon"],
						},
					],
				},
			},
		},
		mollyReady: {
			image: "molly-order.png",
			text: "Thanks, what can I get you?",
			events: {
				menu: {
					text: "Whats on the menu?",
					actions: [
						{
							target: "menu",
							mustHave: [],
							mustNotHave: [],
							acquire: [],
							loose: [],
						},
					],
				},
			},
		},
		menu: {
			image: "molly-menu.png",
			text: "What'll it be?'",
			events: {
				toffee: {
					text: "Ill take the toffee",
					actions: [
						{
							target: "mollyToffee",
							mustHave: [],
							mustNotHave: [],
							acquire: [],
							loose: [],
						},
					],
				},
				lemon: {
					text: "Ill take the lemon please",
					actions: [
						{
							target: "mollyServeLemon",
							mustHave: ["lemonQuestDone"],
							mustNotHave: [],
							acquire: [],
							loose: [],
						},
						{
							target: "mollyQuestOffer",
							mustHave: [],
							mustNotHave: [],
							acquire: [],
							loose: [],
						},
					],
				},
			},
		},
		mollyQuestOffer: {
			image: "molly-order.png",
			text: "Oh dang, Im all out of lemon... But tell you what. If you find me some lemons Ill whip you up a special batch!",
			events: {
				accept: {
					text: "Ill try!",
					actions: [
						{
							target: "mollyQuestAccept",
							mustHave: [],
							mustNotHave: [],
							//Add a marker to keep track of the lemon quest
							acquire: ["lemonQuest"],
							loose: [],
						},
					],
				},
				decline: {
					text: "No worries Ill take the chocolate",
					actions: [
						{
							target: "mollyServeChocolate",
							mustHave: [],
							mustNotHave: [],
							//Add a marker to keep track of the lemon quest
							acquire: [],
							loose: [],
						},
					],
				},
			},
		},
		mollyQuestAccept: {
			image: "molly-order.png",
			text: "Oh dang, Im all out of lemon... But tell you what. If you find me some lemons Ill whip you up a special batch!",
			events: {
				accept: {
					text: "Ill try!",
					actions: [
						{
							//exit is a special target that will exit the dialog after a short delay
							target: "exit",
							mustHave: [],
							mustNotHave: [],
							//Add a marker to keep track of the lemon quest
							acquire: ["lemonQuest"],
							loose: [],
						},
					],
				},
			},
		},
		mollyServeChocolate: {
			image: "molly-order.png",
			text: "Here ya go!",
			events: {
				accept: {
					text: "Thanks",
					actions: [
						{
							target: "exit",
							mustHave: [],
							mustNotHave: [],
							acquire: ["icecreamChocolate"],
							loose: [],
						},
					],
				},
			},
		},
		mollyServeLemon: {
			image: "molly-order.png",
			text: "Here ya go! A nice fresh lemon Ice Cream for ya! Enjoy!",
			events: {
				accept: {
					text: "Amazing, Thanks!",
					actions: [
						{
							target: "exit",
							mustHave: [],
							mustNotHave: [],
							acquire: ["icecreamLemon"],
							loose: [],
						},
					],
				},
			},
		},
	},
};
