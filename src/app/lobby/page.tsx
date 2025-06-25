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
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, Dot, PieChart, Pie } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from 'react';
import CountUp from '@/components/reactBits/CountUp/CountUp';
import { GameContext } from '@/context/gameContext';
import { useContext } from 'react';
import { Loader2, TrendingDown, TrendingUp, AlertCircleIcon, Calculator, Calendar, CreditCard, Settings, Smile, User, FireExtinguisher, Waves, Earth, AlertTriangle, Shield, Globe, Biohazard, DollarSign, Banknote, Plus, Building, } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import TextPressure from '@/components/reactBits/TextPressure/TextPressure';
import { Separator } from '@/components/ui/separator';
import { handleSmoothScroll } from '@/utils/smoothScroll';


export default function Game() {
    const {playerNumber, setPlayerNumber, userName, setUserName, time, setTime, start, setStart} = useContext(GameContext);

    return (
        <div className={styles.container}>
            
        </div>
    );
}
