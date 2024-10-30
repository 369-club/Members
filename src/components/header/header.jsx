import React from 'react';
import { Link } from 'react-router-dom';
import { slideToggle } from './../../composables/slideToggle.js';

function Header() {

	const toggleAppSidebarDesktop = () => {
		var elm = document.querySelector('.app');
		if (elm) {
			if (!(elm.classList.contains('app-with-top-nav') && elm.classList.contains('app-without-sidebar'))) {
				elm.classList.toggle('app-sidebar-collapsed');
				
				setTimeout(() => {
					window.dispatchEvent(new Event('resize'));
				}, 150);
			}
		}
	}
	
	const toggleAppSidebarMobile = () => {
		var elm = document.querySelector('.app');
		if (elm) {
			if (!(elm.classList.contains('app-with-top-nav') && elm.classList.contains('app-without-sidebar'))) {
				elm.classList.toggle('app-sidebar-mobile-toggled');
			} else {
				slideToggle(document.querySelector('.app-top-nav'));
			}
		}
	}

	return (
		<div id="header" className="app-header">
			<div className="desktop-toggler">
				<button type="button" className="menu-toggler" onClick={toggleAppSidebarDesktop}>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</button>
			</div>
			
			<div className="mobile-toggler">
				<button type="button" className="menu-toggler" onClick={toggleAppSidebarMobile}>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</button>
			</div>
			
			<div className="brand">
				<Link to="/" className="brand-logo">
					<span className="brand-img">
						<span className="brand-img-text text-theme">H</span>
					</span>
					<span className="brand-text">d-369 Exclusive Club</span>
				</Link>
			</div>
			
		</div>
	)
}

export default Header;
