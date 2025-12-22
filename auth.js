document.addEventListener('DOMContentLoaded', () => {
	const slider = document.querySelector('.slider-l');
	const signUpLink = document.querySelector('.panel.right .switch a');
	const loginLink = document.querySelector('.panel.left .switch a');
	if (!slider) return;

	if (typeof window.gsap === 'undefined') {
		return;
	}

	let open = false;

	const tl = gsap.timeline({
		paused: true,
		defaults: { ease: 'power2.out' },
		onReverseComplete: () => {
			gsap.set(slider, { zIndex: -10 });
			if (signUpLink) { signUpLink.style.pointerEvents = ''; signUpLink.removeAttribute('aria-disabled'); }
			if (loginLink) { loginLink.style.pointerEvents = ''; loginLink.removeAttribute('aria-disabled'); }
			open = false;
			console.log('ffffffff');
			if (imgL) {
				gsap.set(imgL, { zIndex: 5 });
				gsap.fromTo(imgL,
					{ duration: 0.45, scale: 1, opacity: 1, ease: 'power2.out' }
				);
			}
			const rightToggles = document.querySelectorAll('.panel.right .toggle-password');
			if (rightToggles && rightToggles.length) {
				gsap.to(rightToggles, { duration: 0.2, opacity: 1, pointerEvents: 'auto' });
			}
		}
	});

	let imgL = document.querySelector('.img-l');
	tl.eventCallback('onStart', () => {
		gsap.set(slider, { zIndex: 10 });
		if (signUpLink) { signUpLink.style.pointerEvents = 'none'; signUpLink.setAttribute('aria-disabled', 'true'); }
		if (loginLink) { loginLink.style.pointerEvents = 'none'; loginLink.setAttribute('aria-disabled', 'true'); }
		if (imgL) gsap.set(imgL, { zIndex: -5 });
	});
	tl.eventCallback('onComplete', () => {
		if (signUpLink) { signUpLink.style.pointerEvents = ''; signUpLink.removeAttribute('aria-disabled'); }
		if (loginLink) { loginLink.style.pointerEvents = ''; loginLink.removeAttribute('aria-disabled'); }

		const rightToggles = document.querySelectorAll('.panel.right .toggle-password');
		if (rightToggles && rightToggles.length) {
			gsap.to(rightToggles, { duration: 0.2, opacity: 0, pointerEvents: 'none' });
		}

		open = true;
		console.log('ggggggg');

		const opEls = document.querySelectorAll('.op-l');
		if (opEls && opEls.length) {
			gsap.to(opEls, { duration: 0.45, opacity: 1, stagger: 0.06, ease: 'power2.out' });
		}
	});

	tl.fromTo(slider,
		{ scale: 0.6, opacity: 0, y: 20 },
		{ duration: 0.35, scale: 1, opacity: 1, y: 0 }
	);

	tl.to(slider, { duration: 0.6, left: '50%', ease: 'power2.inOut' });

	if (imgL) {
		tl.to(imgL, { duration: 0.35, scale: 0.95, opacity: 0, ease: 'power2.inOut' });
	}

	if (signUpLink) {
		signUpLink.addEventListener('click', (e) => {
			e.preventDefault();
			if (tl.isActive()) return;
			if (!open) tl.play(0);
			else tl.reverse();
		});
	}

	if (loginLink) {
		loginLink.addEventListener('click', (e) => {
			e.preventDefault();
			if (isMobile()) {
				gsap.to(panelLeft, {
					duration: 0.3,
					opacity: 0,
					display: 'none',
					onComplete: () => {
						gsap.set(panelRight, { display: 'flex', opacity: 0 });
						gsap.to(panelRight, { duration: 0.3, opacity: 1 });
						const rightToggles = panelRight.querySelectorAll('.toggle-password');
						if (rightToggles && rightToggles.length) {
							gsap.to(rightToggles, { duration: 0.15, opacity: 1, pointerEvents: 'auto' });
						}
					}
				});
				return;
			}

			if (!open && !tl.isActive()) return;
			if (tl.isActive()) { tl.reverse(); return; }

			const opEls = document.querySelectorAll('.op-l');
			if (opEls && opEls.length) {
				loginLink.style.pointerEvents = 'none';
				gsap.to(opEls, {
					duration: 0.25,
					opacity: 0,
					stagger: 0.03,
					ease: 'power2.in',
					onComplete: () => {
						const rightToggles = document.querySelectorAll('.panel.right .toggle-password');
						if (rightToggles && rightToggles.length) {
							gsap.set(rightToggles, { opacity: 1, pointerEvents: 'auto' });
							console.log('yyyyyyy');
						}
						tl.reverse();
						loginLink.style.pointerEvents = 'auto';
					}
				});
			} else {
				const rightToggles = document.querySelectorAll('.panel.right .toggle-password');
				if (rightToggles && rightToggles.length) {
					gsap.set(rightToggles, { opacity: 1, pointerEvents: 'auto' });
					console.log('kkkkkkkkk');
				}
				tl.reverse();
			}
		});
	}

	// password toggle
	const togglePasswordIcons = document.querySelectorAll('.toggle-password');

	togglePasswordIcons.forEach(icon => {
		icon.addEventListener('click', function () {
			const targetId = this.dataset.target;
			const passwordInput = document.getElementById(targetId);
			if (passwordInput.type === 'password') {
				passwordInput.type = 'text';
				this.classList.remove('fa-eye');
				this.classList.add('fa-eye-slash');
			} else {
				passwordInput.type = 'password';
				this.classList.remove('fa-eye-slash');
				this.classList.add('fa-eye');
			}
		});
	});

	// mobile
	const isMobile = () => window.innerWidth <= 768;
	const panelLeft = document.querySelector('.panel.left');
	const panelRight = document.querySelector('.panel.right');


	if (signUpLink) {
		signUpLink.addEventListener('click', (e) => {
			e.preventDefault();
			if (isMobile()) {
				const rightToggles = panelRight.querySelectorAll('.toggle-password');
				if (rightToggles && rightToggles.length) {
					gsap.to(rightToggles, { duration: 0.15, opacity: 0, pointerEvents: 'none' });
				}
				gsap.to(panelRight, {
					duration: 0.3, opacity: 0, display: 'none', onComplete: () => {
						gsap.set(panelLeft, { display: 'flex', opacity: 0 });
						gsap.to(panelLeft, { duration: 0.3, opacity: 1 });
					}
				});
			} else {
				if (tl.isActive()) return;
				tl.play(0);
			}
		});
	}

});
