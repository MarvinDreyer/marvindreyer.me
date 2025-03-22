(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

		document.addEventListener("DOMContentLoaded", function () {
			let slideIndex = 1;
			showSlides(slideIndex);
		
			// Event-Listener für die Pfeil-Navigation
			document.querySelector(".prev").addEventListener("click", function () {
				plusSlides(-1);
			});
			document.querySelector(".next").addEventListener("click", function () {
				plusSlides(1);
			});
			
			let dots = document.querySelectorAll(".dot");
			dots.forEach((dot, index) => {
				dot.addEventListener("click", function () {
					currentSlide(index + 1); // +1 weil Index bei 0 startet, Slides aber bei 1
				});
			});

			// Funktion für Vorwärts/Rückwärts Navigation
			function plusSlides(n) {
				showSlides(slideIndex += n);
			}
		
			// Funktion für direkte Navigation per Dots
			function currentSlide(n) {
				showSlides(slideIndex = n);
			}
		
			function showSlides(n) {
				let slides = document.getElementsByClassName("textSlide");
				let dots = document.getElementsByClassName("dot");
		
				if (n > slides.length) {
					slideIndex = 1;
				}
				if (n < 1) {
					slideIndex = slides.length;
				}
		
				// Alle Slides verstecken
				for (let i = 0; i < slides.length; i++) {
					slides[i].style.display = "none";
				}
		
				// Alle Dots inaktiv setzen
				for (let i = 0; i < dots.length; i++) {
					dots[i].classList.remove("active");
				}
		
				// Aktuelles Slide anzeigen
				slides[slideIndex - 1].style.display = "block";
				dots[slideIndex - 1].classList.add("active");
			}
		});

		document.addEventListener('DOMContentLoaded', function() {
			// Für mobile Geräte: Dropdown-Toggle-Funktionalität hinzufügen
			const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
			
			dropdownToggles.forEach(toggle => {
				toggle.addEventListener('click', function(e) {
					if (window.innerWidth <= 768) {
						e.preventDefault();
						const dropdown = this.closest('.dropdown');
						dropdown.classList.toggle('active');
					}
				});
			});
		
			// Smart positioning für Dropdown-Menüs
			function positionDropdowns() {
				const dropdowns = document.querySelectorAll('.dropdown');
				
				dropdowns.forEach(dropdown => {
					// Zurücksetzen der Klassen
					dropdown.classList.remove('open-up');
					
					const dropdownContent = dropdown.querySelector('.dropdown-content');
					const rect = dropdown.getBoundingClientRect();
					const spaceBelow = window.innerHeight - rect.bottom;
					
					// Wenn der Platz unten weniger als 200px ist, öffne das Dropdown nach oben
					if (spaceBelow < 200 && rect.top > 250) {
						dropdown.classList.add('open-up');
					}
				});
			}
			
			// Positionierung bei Laden und bei Größenänderung aktualisieren
			positionDropdowns();
			window.addEventListener('resize', positionDropdowns);
			
			// Optional: Bei Scrollen aktualisieren
			window.addEventListener('scroll', positionDropdowns);
		});


})(jQuery);