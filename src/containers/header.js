import React, { useState, useEffect } from 'react';
import { Header } from '../components';
import { ROUTES } from '../constants/routes';
import { useUser } from '../context/UserContext';

function HeaderContainer({ logoOnly }) {
	const { userDetails } = useUser();
	const [ isShown, handleShown ] = useState(false);

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 100) {
				handleShown(true);
			} else {
				handleShown(false);
			}
		};
		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);

	return (
		<Header className={isShown ? 'opaque' : ''}>
			<Header.Panel>
				<Header.Logo
					className={!userDetails ? 'large' : ''}
					src="/images/branding/Netflix_Logo_RGB.png"
					alt="Roseflix Logo"
					to={ROUTES.HOME.path}
				/>
				{!logoOnly &&
				userDetails && (
					<Header.Nav>
						<Header.NavLink href="#">Home</Header.NavLink>
						<Header.NavLink href="#">Browse</Header.NavLink>
						<Header.NavLink href="#">My List</Header.NavLink>
						<Header.NavLink href="#">Browse</Header.NavLink>
					</Header.Nav>
				)}
			</Header.Panel>

			{!logoOnly &&
				(userDetails ? (
					<Header.Avatar src={`/images/avatars/${userDetails.profiles[0].avatar}`} alt="User Avatar" />
				) : (
					<Header.Button to={ROUTES.SIGNIN.path}>Sign in</Header.Button>
				))}
		</Header>
	);
}

export default HeaderContainer;