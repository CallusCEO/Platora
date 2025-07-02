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
import {
	AlertCircle,
	BarChart,
	CircleUserIcon,
	CreditCard,
	DollarSign,
	Expand,
	Handshake,
	Megaphone,
	PersonStanding,
	PiggyBank,
	Search,
	Trophy,
	User,
	UserPlus,
	Wallet,
	Zap,
} from 'lucide-react';
import { Button } from '../ui/button';
import { GameModeContext } from '@/context/gameContext';
import { useContext } from 'react';
import { handleSmoothScroll } from '@/lib/smoothScroll';
import { useGame } from '@/context/gameContext';

export default function Navbar() {
	const { userName, player } = useGame();
	// get game mode from context
	const { setGameMode } = useContext(GameModeContext);

	return (
		<div className={styles.container}>
			<div className='flex flex-row items-center gap-4'>
				<CircleUserIcon size={32} />
				<p className={styles.title}>{userName}</p>
			</div>
			<div className={styles.navbarRight}>
				<NavigationMenu viewport={false} className={styles.navbarMenu}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>My Metrics</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[300px] gap-4'>
									<li>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('quick');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<DollarSign
														size={24}
														color='var(--foreground)'
													/>
													<div className='font-medium'>Revenue</div>
												</div>
												<div className='text-muted-foreground'>No data</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('medium');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<PiggyBank
														size={24}
														color='var(--foreground)'
													/>
													<div className='font-medium'>Expenses</div>
												</div>
												<div className='text-muted-foreground'>No data</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('long');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<User size={24} color='var(--foreground)' />
													<div className='font-medium'>Clients</div>
												</div>
												<div className='text-muted-foreground'>No data</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('long');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<BarChart size={24} color='var(--foreground)' />
													<div className='font-medium'>Statistics</div>
												</div>
												<div className='text-muted-foreground'>
													You & Your Companies
												</div>
											</Button>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Actions</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid grid-cols-2 w-[300px] gap-4'>
									<li>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('quick');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<Handshake
														size={24}
														color='var(--foreground)'
													/>
													<div className='font-medium'>Alliance</div>
												</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('medium');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<CreditCard
														size={24}
														color='var(--foreground)'
													/>
													<div className='font-medium'>Trade</div>
												</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('long');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<Megaphone
														size={24}
														color='var(--foreground)'
													/>
													<div className='font-medium'>Marketing</div>
												</div>
											</Button>
										</NavigationMenuLink>
									</li>
									<li>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('long');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<Search size={24} color='var(--foreground)' />
													<div className='font-medium'>Research</div>
												</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('long');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<UserPlus size={24} color='var(--foreground)' />
													<div className='font-medium'>Hiring</div>
												</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('long');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<Expand size={24} color='var(--foreground)' />
													<div className='font-medium'>Expansion</div>
												</div>
											</Button>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>News</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[300px] gap-4'>
									<li>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('quick');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<AlertCircle
														size={24}
														color='var(--foreground)'
													/>
													<div className='font-medium'>Events</div>
												</div>
												<div className='text-muted-foreground'>No data</div>
											</Button>
										</NavigationMenuLink>
										<NavigationMenuLink asChild>
											<Button
												className='w-full flex flex-row justify-between'
												variant={'ghost'}
												onClick={(e) => {
													handleSmoothScroll(e, 'playContainer');
													setGameMode('medium');
												}}
											>
												<div className='flex flex-row items-center gap-1'>
													<Trophy size={24} color='var(--foreground)' />
													<div className='font-medium'>Leaderboard</div>
												</div>
												<div className='text-muted-foreground'>No data</div>
											</Button>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Button>
					<Wallet /> {player?.wealth || 0} k
				</Button>
			</div>
		</div>
	);
}
