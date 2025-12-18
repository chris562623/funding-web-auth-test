document.addEventListener('DOMContentLoaded', () => {
	const slider = document.querySelector('.slider-l');
	const signUpLink = document.querySelector('.panel.right .switch a');
	const loginLink = document.querySelector('.panel.left .switch a');
	if (!slider) return;

	if (typeof window.gsap === 'undefined') {
		console.warn('gsap not found');
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
						tl.reverse();
						loginLink.style.pointerEvents = 'auto';
					}
				});
			} else {
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

});
