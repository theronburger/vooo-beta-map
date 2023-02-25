const waitForEl = function (selector, callback) {
	if (jQuery(selector).length) {
		//Seems it takes a few moments for the code to actually run
		setTimeout(function () {
			callback();
		}, 250);
	} else {
		setTimeout(function () {
			waitForEl(selector, callback);
		}, 100);
	}
};
$(() => {
	waitForEl("#modelLoaderScript", () => {
		WA.onInit().then(() => {
			console.log("🎒 WA API is up ✅ Player name is ", WA.player.name);
			let machine = undefined;
			try {
				machine = new Machine(model);
			} catch (error) {
				console.error(
					"🎒🧨 Failed to create new inventory state machine"
				);
				console.error(
					"🎒🧨 Make sure the link in the map area has the correct name after the '?'"
				);
				console.error(
					"🎒🧨 Make sure the model file exists and is named correctly"
				);
				console.log(error);
			}

			if (machine) {
				machine.onTransition = () => {
					$("#text").html(machine.text);
					if (machine.image) {
						$("#objectImage").prop(
							"src",
							`assets/${machine.image}`
						);
					} else {
						$("#objectImage").prop("src", "");
					}

					const options = $("#options");
					options.empty();
					for (
						let i = 0;
						i < Object.keys(machine.events).length;
						i++
					) {
						const key = Object.keys(machine.events)[i];
						const event = machine.events[key];
						options.append(
							$("<button>")
								.html(event.text)
								.on("click", (e) => machine.trigger(key))
						);
					}
				};
				machine.trigger("Ready");

				switch (machine.type) {
					case "inventory":
						$("#inventoryView").show();
						break;
					case "object":
						$("#objectView").show();
						break;
					case "dialog":
						$("#dialogView").show();
						break;
				}
			}
		});
	});
});
