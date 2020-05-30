var On = {
	click: function(args) {
		return function() {
			// Determine Input Value from star-rating attr
			$(args.formInput).val($(this).attr(args.valueAttr));
			args.rating = parseInt($(args.formInput).val());
			Rating.judgeRating(args.textPreview, args.rating, args.ratingDesc);

			// Assign Colors
			$(this).siblings().filter(args.iconClass).removeClass(args.clickClass); // Reset Color
			Rating.assignColor(args.hues[args.rating - 1], args.colorVar);
			$(this).prevAll().addBack().addClass(args.clickClass);
		};
	},
	hoverIn: function(args) {
		return function() {
			const currIndex = $(this).index() - 1;
			let rating = parseInt($(args.formInput).val());

			// If the hovered star is higher than the clicked star, assign the color
			let ratingIdx = rating - 1; // Rating Index
			if (currIndex > ratingIdx) {
				Rating.assignColor(args.hues[currIndex], args.colorVar);
			}

			$(this).prevAll().addBack().addClass(args.hoverClass);

			let hovRating = parseInt($(this).attr(args.valueAttr));
			Rating.judgeRating(args.textPreview, hovRating, args.ratingDesc);
		};
	},
	hoverOut: function(args) {
		return function() {
			let rating = parseInt($(args.formInput).val());
			// Reset Color
			$(this).prevAll().addBack().removeClass(args.hoverClass);
			Rating.assignColor(args.hues[rating - 1], args.colorVar);

			// Change Rating Text
			if (rating) {
				Rating.judgeRating(args.textPreview, rating, args.ratingDesc);
			} else {
				args.textPreview.text('Click on the Stars to Rate them!');
			}
		};
	}
};

class Rating {
	constructor(_rating) {
		this.args = _rating;
		this.rating = parseInt($(_rating.formInput).val()); // For judgeRating

		this.init(); // Optional

		// Event Listeners
		this.iconClass.click(On.click(_rating));
		this.iconClass.hover(On.hoverIn(_rating), On.hoverOut(_rating));
	}

	get iconClass() {
		return $(this.args.iconClass);
	}

	init() {
		let system = this.args;
		let initRating = parseInt($(system.formInput).val());

		Rating.judgeRating(system.textPreview, initRating, this.args.ratingDesc);

		initRating--; // Convert to Array Index
		let initStar = this.iconClass.get(initRating);

		// Assign Colors
		$(initStar).siblings().filter(system.iconClass).removeClass(system.clickClass); // Reset Color
		Rating.assignColor(system.hues[initRating], system.colorVar);
		$(initStar).prevAll().addBack().addClass(system.clickClass);
	}

	// Functions that manipulate styles
	static assignColor(hue, colVar) {
		const sat = '85%',
			val = '55%'; // Saturation & Value
		document.documentElement.style.setProperty(`--${colVar}`, `hsl(${hue}, ${sat}, ${val})`); // Changes value of the color variable
	}

	static judgeRating(selector, rating, description) {
		var reaction = (rating) => {
			switch (rating) {
				case 1:
					return description[0];
				case 2:
					return description[1];
				case 3:
					return description[2];
				case 4:
					return description[3];
				case 5:
					return description[4];
				default:
					return "ERR: you shouldn't be able to see this value...";
			}
		};
		$(selector).text(reaction(rating));
	}
}

$(document).ready(function() {
	// RBG: 133, 152, 213, 260, 354
	// Yelp: 53, 30, 14, 344, 0
	var Star = new Rating({
		iconClass: '.star',
		formInput: '#starInput',
		textPreview: '#starPreview',
		hoverClass: '.hoveredStars',
		clickClass: '.clickedStars',
		valueAttr: 'star-rating',
		colorVar: 'starColor',
		hues: [ 53, 30, 14, 344, 0 ],
		ratingDesc: [
			'Terrible!',
			"Eh, could've been better.",
			'Okay, I guess.',
			'This is great!',
			'Wow! As good as it gets!'
		]
	});
	Star.init();

	var Dollar = new Rating({
		iconClass: '.price',
		formInput: '#priceInput',
		textPreview: '#pricePreview',
		hoverClass: '.hoveredDollars',
		clickClass: '.clickedDollars',
		valueAttr: 'price-rating',
		colorVar: 'priceColor',
		hues: [ 60, 74, 90, 120 ],
		ratingDesc: [ 'Cheap', 'Fair Price', 'Expensive', "Luxurious" ]
	});
	Dollar.init();
});
