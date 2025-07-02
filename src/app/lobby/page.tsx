'use client';

import styles from '@/styles/lobby.module.css';
import SplitText from '@/components/reactBits/SplitText/SplitText';
import Navbar from '@/components/navigation/Navbar';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, Dot, PieChart, Pie } from 'recharts';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import CountUp from '@/components/reactBits/CountUp/CountUp';
import { GameContext, useGame } from '@/context/gameContext';
import { useContext } from 'react';
import {
	Loader2,
	TrendingDown,
	TrendingUp,
	AlertCircleIcon,
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
	FireExtinguisher,
	Waves,
	Earth,
	AlertTriangle,
	Shield,
	Globe,
	Biohazard,
	DollarSign,
	Banknote,
	Plus,
	Building,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import TextPressure from '@/components/reactBits/TextPressure/TextPressure';
import { Separator } from '@/components/ui/separator';
import { handleSmoothScroll } from '@/lib/smoothScroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameActions } from '@/hooks/gameHooks';
import GameNavbar from '@/components/navigation/GameNavbar';
import { secondsToMinutes } from '@/lib/secondsToMinutes';
import STRENGTHS from '../../../constants/STRENGTHS';
import WEAKNESSES from '../../../constants/WEAKNESSES';
import pickTalentRandom from '@/lib/pickTalentRandom';
import kebabToNormal from '@/lib/kebabToNormal';
import mergeStats from '@/lib/mergeStats';

export default function Game() {
	const { time, setTime, startedAt, talent, setTalent } = useGame();
	const { checkTime } = useGameActions();

	// for validation at the beginning of the game
	const [ok, setOk] = useState(false);
	const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
	const [selectedWeaknesses, setSelectedWeaknesses] = useState<string[]>([]);

	useEffect(() => {
		if (startedAt) {
			setTime(0);
		}
		setTalent(kebabToNormal(pickTalentRandom()));
	}, [startedAt]);

	useEffect(() => {
		// intervals of 1 sec
		const interval = setInterval(() => {
			checkTime();
		}, 1000);

		return () => clearInterval(interval);
	}, [time]);

	return (
		<div className={styles.container}>
			<GameNavbar />
			<div className={styles.content}>
				<p className={styles.time}>{secondsToMinutes(time)}</p>
			</div>
			<Drawer open={time < 90} onClose={() => mergeStats()}>
				<DrawerContent>
					<div className='mx-auto w-full max-w-5xl'>
						<DrawerHeader>
							<DrawerTitle className='text-center text-2xl'>
								Prep Time - You have {secondsToMinutes(90 - time)} left
							</DrawerTitle>
							<DrawerDescription>
								Set your strengths, weaknesses and create your first company.
							</DrawerDescription>
						</DrawerHeader>
						<Separator />
						<div className='flex flex-col gap-2 mt-2 items-center'>
							<div className='w-full max-w-xl mt-2'>
								<Alert>
									<AlertCircleIcon />
									<AlertTitle>
										Your Talent is: {talent || 'Loading...'}
									</AlertTitle>
									<AlertDescription>
										If you create a company in this domain, you will have a buff
										(1.2x). Choose your strengths and weaknesses wisely.
									</AlertDescription>
								</Alert>
							</div>
							<Tabs defaultValue='player'>
								<TabsList>
									<TabsTrigger value='player' className='cursor-pointer'>
										Player
									</TabsTrigger>
									<TabsTrigger value='company' className='cursor-pointer'>
										Company
									</TabsTrigger>
								</TabsList>
								<TabsContent
									value='player'
									className='flex flex-col gap-2 items-center'
								>
									<p className={styles.subTitle}>Strengths</p>
									<div>
										{STRENGTHS.map((strength) => (
											<Button
												onClick={() => {
													if (
														selectedStrengths.length >= 3 &&
														!selectedStrengths.includes(strength.name)
													) {
														return;
													}
													setSelectedStrengths((prev) => {
														if (prev.includes(strength.name)) {
															return prev.filter(
																(item) => item !== strength.name
															);
														} else {
															return [...prev, strength.name];
														}
													});
												}}
												key={strength.id}
												variant={
													selectedStrengths.includes(strength.name)
														? 'default'
														: 'outline'
												}
												className='m-1 cursor-pointer'
											>
												<p>{strength.name}</p>
											</Button>
										))}
									</div>
									<p className={styles.subTitle}>Weaknesses</p>
									<div>
										{WEAKNESSES.map((weakness) => (
											<Button
												onClick={() => {
													if (
														selectedWeaknesses.length >= 3 &&
														!selectedWeaknesses.includes(weakness.name)
													) {
														return;
													}
													setSelectedWeaknesses((prev) => {
														if (prev.includes(weakness.name)) {
															return prev.filter(
																(item) => item !== weakness.name
															);
														} else {
															return [...prev, weakness.name];
														}
													});
												}}
												key={weakness.id}
												variant={
													selectedWeaknesses.includes(weakness.name)
														? 'default'
														: 'outline'
												}
												className='m-1 cursor-pointer'
											>
												<p>{weakness.name}</p>
											</Button>
										))}
									</div>
								</TabsContent>
							</Tabs>

							<DrawerFooter>
								{ok ? (
									<Button
										onClick={() => setOk(false)}
										variant='destructive'
										className='m-auto w-full min-w-xs'
									>
										Cancel
									</Button>
								) : (
									<Button
										onClick={() => setOk(true)}
										className='m-auto w-full min-w-xs'
									>
										Validate
									</Button>
								)}
							</DrawerFooter>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
