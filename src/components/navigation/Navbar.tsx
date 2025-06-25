'use client';

import styles from '@/styles/Navbar.module.css';
import SplitText from '@/components/reactBits/SplitText/SplitText';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { CircleUserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { GameModeContext } from '@/context/gameContext';
import { useContext } from 'react';
import { handleSmoothScroll } from '@/utils/smoothScroll';
import { useGame } from '@/context/gameContext';

export default function Navbar() {
	const { user, userName, setUserName, loading } = useGame();
	// get game mode from context
	const { setGameMode } = useContext(GameModeContext);

	return (
		<div className={styles.container}>
			<div>
				<p>Welcome, {user?.email || userName}!</p>
				<input
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					placeholder='Enter username'
				/>
			</div>
			<SplitText
				text='Platora'
				className={styles.title}
				delay={100}
				duration={0.6}
				ease='power3.out'
				splitType='chars'
				from={{ opacity: 0, y: 40 }}
				to={{ opacity: 1, y: 0 }}
				threshold={0.1}
				rootMargin='-100px'
				textAlign='center'
			/>
			<div className={styles.navbarRight}>
				<NavigationMenu viewport={false} className={styles.navbarMenu}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Play</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[300px] gap-4'>
									<li>
										<NavigationMenuLink asChild>
											<Link
												href='#playContainer'
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('quick');
												}}
											>
												<div className='font-medium'>Quick Game</div>
												<div className='text-muted-foreground'>
													30 minutes.
												</div>
											</Link>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Link
												href='#playContainer'
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('medium');
												}}
											>
												<div className='font-medium'>Middle Game</div>
												<div className='text-muted-foreground'>1 hour.</div>
											</Link>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Link
												href='#playContainer'
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('long');
												}}
											>
												<div className='font-medium'>Long Game</div>
												<div className='text-muted-foreground'>
													2 hours.
												</div>
											</Link>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link
									href='#playContainer'
									onClick={(e) => handleSmoothScroll(e, 'playContainer')}
								>
									Home
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link
									href='#about'
									onClick={(e) => handleSmoothScroll(e, 'about', 64)}
								>
									About
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Button>
					<CircleUserIcon /> Sign in
				</Button>
			</div>
		</div>
	);
}
