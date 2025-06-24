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
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export default function Home() {
	const [gameMode, setGameMode] = useState<string>('');
	const [userName, setUserName] = useState<string>('');

	return (
		<div className={styles.container}>
			<Navbar />
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

			<div className={styles.playContainer}>
				<Select onValueChange={(value) => setGameMode(value)}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Pick a game mode' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Game Mode</SelectLabel>
							<SelectItem value='quick'>Quick</SelectItem>
							<SelectItem value='medium'>Medium</SelectItem>
							<SelectItem value='long'>Long</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
