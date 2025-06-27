'use client';

import styles from '@/styles/page.module.css';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import CountUp from '@/components/reactBits/CountUp/CountUp';
import { useGame, useGameMode } from '@/context/gameContext';
import {
	Loader2,
	TrendingDown,
	TrendingUp,
	AlertCircleIcon,
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
	XCircle,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TextPressure from '@/components/reactBits/TextPressure/TextPressure';
import { Separator } from '@/components/ui/separator';
import { handleSmoothScroll } from '@/utils/smoothScroll';
import { Slider } from '@/components/ui/slider';
import { useGameActions } from '@/hooks/gameHooks';

export default function Home() {
	const { joinGame, createGame, deleteGame, readGame, quitGame, loading, error } =
		useGameActions();
	const { setGameMode } = useGameMode();
	const {
		player,
		maxPlayerNumber,
		setMaxPlayerNumber,
		joinedPlayerNumber,
		setGameId,
		gameId,
		setUserName,
		setGameStatus,
		gameStatus,
	} = useGame();

	const [inputGameId, setInputGameId] = useState('');
	const [inputName, setInputName] = useState('');
	const [inputPlayerNumber, setInputPlayerNumber] = useState(10);
	const [inputGameMode, setInputGameMode] = useState('quick');

	// for the popover
	const [open, setOpen] = useState(false);

	// player count
	// const [maxPlayer, setMaxPlayer] = useState<number>(30);

	// background chart
	const chartData = [
		{ month: 'January', revenue: 186000 },
		{ month: 'February', revenue: 305000 },
		{ month: 'March', revenue: 237000 },
		{ month: 'April', revenue: 73000 },
		{ month: 'May', revenue: 209000 },
		{ month: 'June', revenue: 214000 },
	];
	const chartConfig = {
		revenue: {
			label: 'Revenue',
			color: 'var(--chart-1)',
		},
	} satisfies ChartConfig;

	const chartData2 = [
		{ browser: 'chrome', clients: 56, fill: 'var(--main-secondary)' },
		{ browser: 'safari', clients: 150, fill: 'var(--main-secondary)' },
		{ browser: 'firefox', clients: 25, fill: 'var(--main-secondary)' },
		{ browser: 'edge', clients: 120, fill: 'var(--main-secondary)' },
		{ browser: 'other', clients: 223, fill: 'var(--main-secondary)' },
	];
	const chartConfig2 = {
		clients: {
			label: 'Clients',
			color: 'var(--main)',
		},
		chrome: {
			label: 'Chrome',
			color: 'var(--main)',
		},
		safari: {
			label: 'Safari',
			color: 'var(--main)',
		},
		firefox: {
			label: 'Firefox',
			color: 'var(--main)',
		},
		edge: {
			label: 'Edge',
			color: 'var(--main)',
		},
		other: {
			label: 'Other',
			color: 'var(--main)',
		},
	} satisfies ChartConfig;

	const chartData3 = [
		{ month: 'January', revenue: 2500 },
		{ month: 'February', revenue: 1500 },
		{ month: 'March', revenue: 2500 },
		{ month: 'April', revenue: 1000 },
		{ month: 'May', revenue: 2230 },
		{ month: 'June', revenue: 1640 },
		{ month: 'July', revenue: 1200 },
		{ month: 'August', revenue: 1000 },
		{ month: 'September', revenue: 3056 },
		{ month: 'October', revenue: 1300 },
		{ month: 'November', revenue: 1230 },
		{ month: 'December', revenue: 1650 },
		{ month: 'January', revenue: 1090 },
		{ month: 'February', revenue: 3040 },
		{ month: 'March', revenue: 2030 },
		{ month: 'April', revenue: 8050 },
		{ month: 'May', revenue: 5000 },
		{ month: 'June', revenue: 2350 },
		{ month: 'July', revenue: 6300 },
		{ month: 'August', revenue: 7000 },
	];

	const chartData4 = [
		{ expense: 'materials', cost: 132000, fill: '#ff6666' },
		{ expense: 'rent', cost: 7800, fill: '#ee8888' },
		{ expense: 'salary', cost: 75000, fill: '#bb5555' },
		{ expense: 'other', cost: 12250, fill: '#ff3333' },
	];
	const chartConfig4 = {
		clients: {
			label: 'Expenses',
		},
		materials: {
			label: 'Materials',
			color: 'var(--chart-1)',
		},
		rent: {
			label: 'Rent',
			color: 'var(--chart-2)',
		},
		salary: {
			label: 'Salary',
			color: 'var(--chart-3)',
		},
		other: {
			label: 'Other',
			color: 'var(--chart-4)',
		},
	} satisfies ChartConfig;

	return (
		<div className={styles.container}>
			<Navbar />
			<SplitText
				text='Platora v0.1'
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
			<p className={styles.subtitle}>The realistic market simulator</p>

			<Tabs defaultValue='join' id='playContainer' className='z-10'>
				<TabsList>
					<TabsTrigger value='join'>Join a game</TabsTrigger>
					<TabsTrigger value='create'>Create new game</TabsTrigger>
				</TabsList>
				<TabsContent value='join' className={styles.playContainer}>
					<div className={styles.topPlayContainer}>
						<p className='font-montserrat color-[var(--foreground)]'>
							Join with a code
						</p>
						<div className={styles.playersCount}>
							<CountUp
								from={0}
								to={joinedPlayerNumber}
								separator=','
								direction={undefined}
								duration={0.5}
								className={styles.countUpText}
							/>
							<p className={styles.countUpText}>/ {maxPlayerNumber} Players</p>
						</div>
					</div>
					<div className={styles.middlePlayContainer}>
						<Card className={styles.card}>
							<CardHeader>
								<CardTitle>Enter the access id</CardTitle>
								<CardDescription>
									Enter the access id to join the game.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form>
									<div className='flex flex-col gap-6'>
										<div className='grid gap-2'>
											<Label htmlFor='accessId'>Access id</Label>
											<Input
												id='accessId'
												type='text'
												placeholder='xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'
												required
												onChange={(e) => setInputGameId(e.target.value)}
											/>
										</div>
									</div>
								</form>
							</CardContent>
							<Separator />
							<CardHeader>
								<CardTitle>Enter your name</CardTitle>
								<CardDescription>
									This name will be displayed on your profile during the game.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form>
									<div className='flex flex-col gap-6'>
										<div className='grid gap-2'>
											<Label htmlFor='name'>Name</Label>
											<Input
												id='name'
												type='text'
												placeholder='Bruce Wayne'
												required
												onChange={(e) => setInputName(e.target.value)}
											/>
										</div>
									</div>
								</form>
							</CardContent>
							<CardFooter className='flex-col gap-2'>
								{player ? (
									<>
										<Button
											type='submit'
											disabled
											variant='ghost'
											className={styles.buttonPlayDisabled}
										>
											<Loader2 className='mr-1 h-4 w-4 animate-spin' />
											Waiting for the host...
										</Button>
										<Button
											type='submit'
											className={styles.buttonCancel}
											onClick={async () => {
												await quitGame();
											}}
										>
											Quit
										</Button>
									</>
								) : (
									<Button
										type='submit'
										className={styles.buttonPlay}
										onClick={async () => {
											await joinGame(inputGameId, inputName);
											await readGame(inputGameId);
										}}
									>
										Join
									</Button>
								)}
							</CardFooter>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value='create' className={styles.playContainer}>
					<div className={styles.topPlayContainer}>
						<Select
							onValueChange={(value) => setInputGameMode(value)}
							value={inputGameMode}
						>
							<SelectTrigger className='w-[180px] cursor-pointer'>
								<SelectValue placeholder='Pick a game mode' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Game Mode</SelectLabel>
									<SelectItem value='quick'>Quick - 30 min</SelectItem>
									<SelectItem value='medium'>Medium - 1 hour</SelectItem>
									<SelectItem value='long'>Long - 2 hours</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<div className={styles.playersCount}>
							<CountUp
								from={0}
								to={joinedPlayerNumber}
								separator=','
								direction='up'
								duration={0.5}
								className={styles.countUpText}
							/>
							<p className={styles.countUpText}>/ {maxPlayerNumber} Players</p>
						</div>
					</div>
					<div className={styles.middlePlayContainer}>
						<Card className={styles.card}>
							<CardHeader>
								<CardTitle>Select the number of players</CardTitle>
								<CardDescription>
									Select the number of players you want to play with.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form>
									<div className='flex flex-col gap-6'>
										<div className='grid gap-2'>
											<Label htmlFor='playerNumber'>Number of players</Label>
											<Slider
												defaultValue={[5]}
												min={1}
												max={30}
												step={1}
												className='w-[60%] mt-2'
												onValueChange={(value) =>
													setInputPlayerNumber(value[0])
												}
											/>
											<p>{inputPlayerNumber} Players</p>
										</div>
									</div>
								</form>
							</CardContent>
							<Separator />
							<CardHeader>
								<CardTitle>Enter your name</CardTitle>
								<CardDescription>
									This name will be displayed on your profile during the game.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form>
									<div className='flex flex-col gap-6'>
										<div className='grid gap-2'>
											<Label htmlFor='name'>Name</Label>
											<Input
												id='name'
												type='text'
												placeholder='Bruce Wayne'
												required
												value={inputName}
												onChange={(e) => setInputName(e.target.value)}
											/>
										</div>
									</div>
								</form>
							</CardContent>
							{gameId && (
								<p className={styles.gameId}>
									Game ID: <span className='font-bold'>{gameId}</span>
								</p>
							)}
							<CardFooter className='flex-col gap-2'>
								{gameStatus === 'waiting' ? (
									<>
										<Button
											type='submit'
											disabled
											variant='ghost'
											className={styles.buttonPlayDisabled}
										>
											<Loader2 className='mr-1 h-4 w-4 animate-spin' />
											Waiting for players...
										</Button>
										<Button
											type='submit'
											variant='ghost'
											className={styles.buttonCancel}
											onClick={() => deleteGame()}
										>
											<XCircle className='mr-1 h-4 w-4' />
											Cancel
										</Button>
									</>
								) : (
									<Button
										type='submit'
										className={styles.buttonPlay}
										onClick={() =>
											createGame(inputGameMode, inputPlayerNumber, inputName)
										}
									>
										Create
									</Button>
								)}
							</CardFooter>
						</Card>
					</div>
				</TabsContent>
			</Tabs>

			<div className={styles.background}>
				<Card>
					<CardContent>
						<ChartContainer config={chartConfig}>
							<LineChart
								accessibilityLayer
								data={chartData}
								margin={{
									left: 12,
									right: 12,
								}}
							>
								<CartesianGrid vertical={false} />
								<Line
									dataKey='revenue'
									type='natural'
									stroke='var(--main)'
									strokeWidth={2}
									dot={false}
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			{/* about section */}
			<section className={styles.aboutSection} id='about'>
				<SplitText
					text='What is this game?'
					className={styles.aboutTitle}
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
				<div className={styles.grid}>
					<Card className={styles.boxAbout}>
						<CardHeader>
							<CardTitle>Track Clients</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig2}>
								<LineChart
									accessibilityLayer
									data={chartData2}
									margin={{
										top: 24,
										left: 24,
										right: 24,
									}}
								>
									<CartesianGrid vertical={false} />
									<ChartTooltip
										cursor={false}
										content={
											<ChartTooltipContent
												indicator='line'
												nameKey='clients'
												hideLabel
											/>
										}
									/>
									<Line
										dataKey='clients'
										type='natural'
										stroke='var(--color-clients)'
										strokeWidth={2}
										dot={({ payload, ...props }) => {
											return (
												<Dot
													key={payload.browser}
													r={5}
													cx={props.cx}
													cy={props.cy}
													fill={payload.fill}
													stroke={payload.fill}
												/>
											);
										}}
									/>
								</LineChart>
							</ChartContainer>
						</CardContent>
						<CardFooter className='flex-col items-start gap-2 text-sm'>
							<div className='flex gap-2 leading-none font-medium'>
								Trending up by 11% this month <TrendingUp className='h-4 w-4' />
							</div>
							<div className='text-muted-foreground leading-none'>
								Showing total clients for the last 6 months
							</div>
						</CardFooter>
					</Card>
					<Card className={styles.boxAbout}>
						<CardHeader>
							<CardTitle>Track Revenue</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig}>
								<LineChart
									accessibilityLayer
									data={chartData3}
									margin={{
										left: 12,
										right: 12,
									}}
								>
									<CartesianGrid vertical={false} />
									<Line
										dataKey='revenue'
										type='natural'
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ChartContainer>
						</CardContent>
						<CardFooter className='flex-col items-start gap-2 text-sm'>
							<div className='flex gap-2 leading-none font-medium'>
								Trending up by 185% this month <TrendingUp className='h-4 w-4' />
							</div>
							<div className='text-muted-foreground leading-none'>
								Showing total revenue for the last 20 months
							</div>
						</CardFooter>
					</Card>
					<Card className={styles.boxAbout}>
						<CardHeader>
							<CardTitle>Track Expenses</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={chartConfig4}
								className='mx-auto aspect-square max-h-[250px]'
							>
								<PieChart>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent hideLabel />}
									/>
									<Pie
										data={chartData4}
										dataKey='cost'
										nameKey='expense'
										stroke='0'
									/>
								</PieChart>
							</ChartContainer>
						</CardContent>
						<CardFooter className='flex-col items-start gap-2 text-sm'>
							<div className='flex gap-2 leading-none font-medium'>
								Materials expenses shrunk by 6% this month{' '}
								<TrendingDown className='h-4 w-4' />
							</div>
							<div className='text-muted-foreground leading-none'>
								Showing total expenses for the current month
							</div>
						</CardFooter>
					</Card>
				</div>
				<SplitText
					text='Play in real time and compete to earn the most money!'
					className={styles.aboutSubtitle}
					delay={100}
					duration={0.6}
					ease='power3.out'
					splitType='words'
					from={{ opacity: 0, y: 40 }}
					to={{ opacity: 1, y: 0 }}
					threshold={0.1}
					rootMargin='-100px'
					textAlign='center'
				/>

				{/* To modify */}
				<div tabIndex={-1} aria-hidden='true'>
					<Alert variant='inoffensive' className={styles.alertContainer}>
						<AlertCircleIcon />
						<AlertTitle>Russia declared war.</AlertTitle>
						<AlertDescription>
							<p>This moment in the game will be hard to manage.</p>
							<ul className='list-inside list-disc text-sm'>
								<li>Check your revenue often</li>
								<li>Make the right alliances</li>
								<li>Protect your companies</li>
							</ul>
						</AlertDescription>
					</Alert>
				</div>

				<SplitText
					text='Look for all the hazards and try to avoid them.'
					className={styles.aboutSubtitleCommand}
					delay={100}
					duration={0.6}
					ease='power3.out'
					splitType='words'
					from={{ opacity: 0, y: 40 }}
					to={{ opacity: 1, y: 0 }}
					threshold={0.1}
					rootMargin='-100px'
					textAlign='center'
				/>
				<Command className={styles.commandContainer}>
					<CommandInput placeholder='Search for a hazard...' />
					<CommandList className={styles.commandList}>
						<CommandEmpty>No hazard found.</CommandEmpty>
						<CommandGroup heading='Most dangerous'>
							<CommandItem>
								<Globe />
								<span>World War</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<Biohazard />
								<span>Virus</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<DollarSign />
								<span>Economic Crash</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup heading='Lesser inconvenient'>
							<CommandItem>
								<Shield />
								<span>Simple War</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<AlertTriangle />
								<span>Terrorist Attack</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<Earth />
								<span>Earthquake</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<Waves />
								<span>Tsunami</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<FireExtinguisher />
								<span>Fire</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<TrendingUp />
								<span>Inflation</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<TrendingDown />
								<span>Deflation</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
							<CommandItem>
								<Banknote />
								<span>Bankrupt</span>
								<CommandShortcut></CommandShortcut>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>

				<div className={styles.textPressureContainer}>
					<TextPressure
						text='Create a company'
						flex={true}
						alpha={false}
						stroke={false}
						width={true}
						weight={true}
						italic={true}
						textColor='#ffffff'
						strokeColor='#ff0000'
						minFontSize={36}
						className='font-montserrat'
					/>
				</div>
				<Separator className='my-4' />
				<div className={styles.containerPopover}>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button variant='outline' className={styles.buttonPopover}>
								<Plus />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-124'>
							<div className='grid gap-4'>
								<div className='space-y-2'>
									<div className='flex align-center gap-1'>
										<h4 className='leading-none font-medium'>
											Create a company
										</h4>
									</div>
									<p className='text-muted-foreground text-sm'>
										Fill in the form below to create a company.
									</p>
								</div>
								<div className='grid gap-2'>
									<div className='grid grid-cols-3 items-center gap-4'>
										<Label htmlFor='name'>Name</Label>
										<Input
											maxLength={25}
											id='name'
											defaultValue='Anon'
											className='col-span-2 h-8'
										/>
									</div>
									<div className='grid grid-cols-3 items-center gap-4'>
										<Label htmlFor='g-description'>General Description</Label>
										<Textarea
											placeholder='What does your company do?'
											id='g-description'
											className='col-span-2 h-8'
											maxLength={120}
										></Textarea>
									</div>
									<div className='grid grid-cols-3 items-center gap-4'>
										<Label htmlFor='p-description'>Product Description</Label>
										<Textarea
											placeholder='What do you sell?'
											id='p-description'
											className='col-span-2 h-8'
											maxLength={120}
										></Textarea>
									</div>
									<div className='grid grid-cols-3 items-center gap-4'>
										<Label htmlFor='p-description'>Product Description</Label>
										<Select>
											<SelectTrigger className='w-[180px]'>
												<SelectValue placeholder='Select a class' />
											</SelectTrigger>
											<SelectContent>
												{/* tech */}
												<SelectGroup>
													<SelectLabel>Technology</SelectLabel>
													<SelectItem value='information-technology'>
														Information Technology
													</SelectItem>
													<SelectItem value='software-saas'>
														Software & SaaS
													</SelectItem>
													<SelectItem value='hardware-devices'>
														Hardware & Devices
													</SelectItem>
													<SelectItem value='ai-machine-learning'>
														AI & Machine Learning
													</SelectItem>
													<SelectItem value='cybersecurity'>
														Cybersecurity
													</SelectItem>
												</SelectGroup>
												{/* finance */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Finance</SelectLabel>
													<SelectItem value='fintech'>Fintech</SelectItem>
													<SelectItem value='biotech'>Biotech</SelectItem>
													<SelectItem value='healthtech'>
														Healthtech
													</SelectItem>
													<SelectItem value='greentech-cleantech'>
														Greentech / Cleantech
													</SelectItem>
													<SelectItem value='edtech'>Edtech</SelectItem>
													<SelectItem value='banking'>Banking</SelectItem>
													<SelectItem value='investment-asset-management'>
														Investment & Asset Management
													</SelectItem>
													<SelectItem value='insurance'>
														Insurance
													</SelectItem>
													<SelectItem value='accounting-audit'>
														Accounting & Audit
													</SelectItem>
													<SelectItem value='venture-capital-private-equity'>
														Venture Capital / Private Equity
													</SelectItem>
												</SelectGroup>
												{/* manufacturing */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Manufacturing</SelectLabel>
													<SelectItem value='manufacturing'>
														Manufacturing
													</SelectItem>
													<SelectItem value='construction'>
														Construction
													</SelectItem>
													<SelectItem value='automotive'>
														Automotive
													</SelectItem>
													<SelectItem value='aerospace-defense'>
														Aerospace & Defense
													</SelectItem>
													<SelectItem value='logistics-supply-chain'>
														Logistics & Supply Chain
													</SelectItem>
												</SelectGroup>
												{/* energy */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Energy</SelectLabel>
													<SelectItem value='oil-gas'>
														Oil & Gas
													</SelectItem>
													<SelectItem value='renewable-energy'>
														Renewable Energy
													</SelectItem>
													<SelectItem value='utilities'>
														Utilities
													</SelectItem>
													<SelectItem value='environmental-services'>
														Environmental Services / Waste Management
													</SelectItem>
												</SelectGroup>
												{/* healthcare */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Healthcare</SelectLabel>
													<SelectItem value='pharmaceuticals'>
														Pharmaceuticals
													</SelectItem>
													<SelectItem value='medical-devices'>
														Medical Devices
													</SelectItem>
													<SelectItem value='hospitals-clinics'>
														Hospitals & Clinics
													</SelectItem>
													<SelectItem value='healthcare-services'>
														Healthcare Services
													</SelectItem>
													<SelectItem value='r-d-biomed'>
														R&D (Biomed, etc.)
													</SelectItem>
												</SelectGroup>
												{/* services */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Services</SelectLabel>
													<SelectItem value='retail'>Retail</SelectItem>
													<SelectItem value='consumer-goods'>
														Consumer Goods
													</SelectItem>
													<SelectItem value='fashion-apparel'>
														Fashion & Apparel
													</SelectItem>
													<SelectItem value='luxury-goods'>
														Luxury Goods
													</SelectItem>
													<SelectItem value='food-beverage'>
														Food & Beverage
													</SelectItem>
												</SelectGroup>
												{/* media */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Media</SelectLabel>
													<SelectItem value='telecommunications'>
														Telecommunications
													</SelectItem>
													<SelectItem value='media-entertainment'>
														Media & Entertainment
													</SelectItem>
													<SelectItem value='publishing'>
														Publishing
													</SelectItem>
													<SelectItem value='advertising-marketing'>
														Advertising & Marketing
													</SelectItem>
													<SelectItem value='social-media'>
														Social Media
													</SelectItem>
												</SelectGroup>
												{/* education */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Education</SelectLabel>
													<SelectItem value='k12-education'>
														K-12 Education
													</SelectItem>
													<SelectItem value='higher-education'>
														Higher Education
													</SelectItem>
													<SelectItem value='online-learning'>
														Online Learning Platforms
													</SelectItem>
													<SelectItem value='professional-training'>
														Professional Training & Certification
													</SelectItem>
												</SelectGroup>
												{/* travel */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Travel</SelectLabel>
													<SelectItem value='airlines'>
														Airlines
													</SelectItem>
													<SelectItem value='hospitality'>
														Hospitality (Hotels, Resorts)
													</SelectItem>
													<SelectItem value='tourism'>
														Tourism Agencies
													</SelectItem>
													<SelectItem value='recreation'>
														Recreation & Theme Parks
													</SelectItem>
												</SelectGroup>
												{/* government */}
												<SelectSeparator />
												<SelectGroup>
													<SelectLabel>Government</SelectLabel>
													<SelectItem value='government-public'>
														Government & Public Sector
													</SelectItem>
													<SelectItem value='legal-services'>
														Legal Services & Law Firms
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									<Button
										className={styles.buttonPlay}
										onClick={() => setOpen(false)}
									>
										Create
									</Button>
								</div>
							</div>
						</PopoverContent>
					</Popover>
					<p className={styles.textPopover}>
						Click here and let your imagination do the rest
					</p>
				</div>
				<div className='w-[100%] my-[64px] max-w-[664px]'>
					<Button
						className={styles.buttonPlay}
						onClick={(e) => handleSmoothScroll(e, 'playContainer')}
					>
						Play now
					</Button>
				</div>
			</section>
		</div>
	);
}
