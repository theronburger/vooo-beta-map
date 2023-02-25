/**
 * @typedef {Object} ModelType
 * TODO neaten
 * @param {{ initial: any; states?: { init: { events: { Ready: { target: string; conditions: never[]; actions: never[]; }[]; }; }; ready: { events: { BetAdd: { target: string; conditions: never[]; actions: string[]; }[]; BetSubtract: { target: string; conditions: string[]; actions: string[]; }[]; Deal: { target: string; conditions: string[]; actions: string[]; }[]; }; }; round: { onEntry: {}; events: { BetAdd: { target: string; conditions: never[]; actions: string[]; }[]; Hit: { target: string; conditions: string[]; actions: string[]; }[]; Stay: { target: string; conditions: never[]; actions: never[]; }[]; }; }; }; conditions?: { betAboveZero: () => boolean; }; actions?: { betAdd: () => void; betSubtract: () => void; deal: () => void; }; }} model
 */
/**
 * @typedef {Object} EventType
 * @property {string} target target state
 * @property {Array.<string>} conditions Array of condition function names
 * @property {Array.<string>} actions Array of action function names
 */

class Machine {
	/**
	 * @param {ModelType} model
	 */
	constructor(model) {
		this._model = model;
		this._state = model.initial;
		this._inventory = WA.player.state?.inventory ?? {};
		console.log(
			`🎒 Machine is up, state is ${this._state}. View is ${this.type}`
		);
		console.log(`🎒 Inventory loaded as ${JSON.stringify(this.inventory)}`);
	}
	get type() {
		return this._model.type;
	}
	get state() {
		return this._state;
	}
	get image() {
		return this._model.states[this._state].image;
	}
	get text() {
		return this._model.states[this._state].text;
	}
	/**
	 * @returns {Array.<EventType>}
	 */
	get events() {
		return this._model.states[this._state].events;
	}
	get inventory() {
		this._inventory = JSON.parse(WA.player.state?.inventory);
		return this._inventory;
	}
	/**
	 * Sets the value of a WA player state variable
	 * @param {string} itemName
	 * @param {any} value
	 */
	_setInventoryItem(itemName, value) {
		this._inventory[itemName] = value;
		WA.player.state.saveVariable(
			"inventory",
			JSON.stringify(this._inventory)
		);
		console.log(`🎒 inventory[${itemName}] set to ${value}`);
	}
	/**
	 * Checks if the player has an item (state variable with itemName set to true)
	 * @param {string} itemName
	 * @returns {boolean}
	 */
	_mustHave(itemName) {
		const value = this.inventory[itemName];
		if (value) {
			console.log(
				`🔍 Check mustHave passed ✅ Player should have${itemName} and does (inventory[${itemName}] was ${value})`
			);
			return true;
		} else {
			console.log(
				`🔍 Check mustHave failed ❌ Player does not have ${itemName} but should (inventory[${itemName}] was ${value})`
			);
			return false;
		}
	}
	/**
	 * Checks if the player has an item (state variable with itemName set to true)
	 * @param {string} itemName
	 * @returns {boolean}
	 */
	_mustNotHave(itemName) {
		const value = WA.player.state?.inventory[itemName];
		if (value) {
			console.log(
				`🔍 Check mustNotHave failed ❌ Player should not have ${itemName}, but does (inventory[${itemName}] was ${value})`
			);
			return false;
		} else {
			console.log(
				`🔍 Check mustNotHave passed ✅ Player does not have ${itemName} and shouldn't (inventory[${itemName}] was ${value})`
			);
			return true;
		}
	}
	/**
	 * Handles an event and returns true on transition (not result of conditions met!)
	 * @param {{ conditions: Array.<string>; actions: Array.<string>; target: string; }} event
	 * @returns {boolean}
	 */
	_handleEvent(event) {
		let met = true; //Assume true, as an empty condition array logically seems like 'no conditions'
		let causesTransition = false;
		//If there are conditions, check them
		if (event?.mustHave?.length !== undefined) {
			event.mustHave.forEach(
				(/** @type {string} */ itemName) =>
					(met = met && this._mustHave(itemName))
			);
		}
		if (event?.mustNotHave?.length !== undefined) {
			event.mustNotHave.forEach(
				(/** @type {string} */ itemName) =>
					(met = met && this._mustNotHave(itemName))
			);
		}
		console.log(`${met ? "✅" : "❌"} Conditions ${met ? "" : "not"} met`);
		// If there are actions, run them
		if (met && event?.acquire?.length !== undefined) {
			event.acquire.forEach((/** @type {string} */ itemName) =>
				this._setInventoryItem(itemName, true)
			);
		}
		if (met && event?.loose?.length !== undefined) {
			event.loose.forEach((/** @type {string} */ itemName) =>
				this._setInventoryItem(itemName, false)
			);
		}
		//If transition allowed and there is a target
		if (met && event.target) {
			//check if it exists
			if (this._model.states[event.target]) {
				//transition
				this._state = event.target;
				causesTransition = true;
				console.log(`👉 Transitioning to ${event.target}.`);
				//If there is an onTransition callback defined, call it
				if (typeof this._onTransition === "function") {
					this._onTransition();
				}
				//if there are any onEntry events, do them
				if (this._model.states[this._state]?.onEntry?.actions?.length) {
					console.log(
						`💥 ${event.target} has entry events, doing them`
					);
					this._model.states[this._state].onEntry.actions.every(
						(/** @type {EventType} */ onEntryEvent) => {
							this._handleEvent(onEntryEvent);
						}
					);
				}
			} else {
				console.error(`🧨 Target ${event.target} does not exist.`);
			}
		} else {
			console.log("🙅‍♀️ Event has no target");
		}
		//If event causes transition, return true to short circuit calling every loop
		return causesTransition;
	}
	set onTransition(callback) {
		this._onTransition = callback;
	}
	/**
	 * Try trigger an event on the current state
	 * @param {string} eventName
	 */
	trigger(eventName) {
		console.group(`🎒 New Event : ${eventName}`);
		//If state has events
		if (Object.keys(this._model.states[this._state]).length > 0) {
			const event = this.events[eventName];
			const actions = event.actions;
			//If state has this event
			if (actions !== undefined) {
				//for each event object
				//Note, if there are multiple exit targets, the first with its conditions met will be taken
				actions.every((/** @type {EventType} */ exit) => {
					//New knowledge: Array.every stops on the return of false https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break
					return !this._handleEvent(exit);
				});
			} else {
				console.warn(
					`🧨 Current state '${this._state}' has no event '${eventName}'`
				);
			}
		} else {
			console.warn(`🧨 Current state '${eventName}' has no events`);
		}
		console.log(`💥 State is now ${this._state}`);
		console.groupEnd();
	}
}
