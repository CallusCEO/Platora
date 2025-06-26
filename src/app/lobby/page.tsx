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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import CountUp from '@/components/reactBits/CountUp/CountUp';
import { GameContext } from '@/context/gameContext';
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
import { handleSmoothScroll } from '@/utils/smoothScroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Game() {
	const {
		playerNumber,
		setPlayerNumber,
		userName,
		setUserName,
		time,
		setTime,
		start,
		setStart,
	} = useContext(GameContext);

	return (
		<div className={styles.container}>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<Tabs defaultValue='account'>
					<TabsList>
						<TabsTrigger value='account'>Account</TabsTrigger>
						<TabsTrigger value='password'>Password</TabsTrigger>
					</TabsList>
					<TabsContent value='account'>
						<Card>
							<CardHeader>
								<CardTitle>Account</CardTitle>
								<CardDescription>
									Make changes to your account here. Click
									save when you&apos;re done.
								</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-6'>
								<div className='grid gap-3'>
									<Label htmlFor='tabs-demo-name'>Name</Label>
									<Input
										id='tabs-demo-name'
										defaultValue='Pedro Duarte'
									/>
								</div>
								<div className='grid gap-3'>
									<Label htmlFor='tabs-demo-username'>
										Username
									</Label>
									<Input
										id='tabs-demo-username'
										defaultValue='@peduarte'
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save changes</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value='password'>
						<Card>
							<CardHeader>
								<CardTitle>Password</CardTitle>
								<CardDescription>
									Change your password here. After saving,
									you&apos;ll be logged out.
								</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-6'>
								<div className='grid gap-3'>
									<Label htmlFor='tabs-demo-current'>
										Current password
									</Label>
									<Input
										id='tabs-demo-current'
										type='password'
									/>
								</div>
								<div className='grid gap-3'>
									<Label htmlFor='tabs-demo-new'>
										New password
									</Label>
									<Input id='tabs-demo-new' type='password' />
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save password</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
