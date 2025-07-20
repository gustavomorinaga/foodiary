import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { cn } from '../utils/cn';

interface IArcProps {
	percentage: number;
	color: string;
	radius: number;
	strokeWidth: number;
	baseStrokeColor?: string;
	className?: string;
}

function Arc({ percentage, color, radius, strokeWidth, className }: IArcProps) {
	const semiCircumference = Math.PI * radius;
	const arcLength = (percentage / 100) * semiCircumference;

	const arcDraw = `M ${strokeWidth / 2},${radius + strokeWidth / 2}
                   A ${radius},${radius} 0 0,1 ${radius * 2 + strokeWidth / 2},${radius + strokeWidth / 2}`;

	return (
		<View className={cn(className)}>
			<Svg height={radius + strokeWidth} width={radius * 2 + strokeWidth}>
				<Path
					d={arcDraw}
					fill="none"
					stroke="#E0E0E0"
					strokeDasharray={semiCircumference}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
				/>

				<Path
					d={arcDraw}
					fill="none"
					stroke={color}
					strokeDasharray={[arcLength, semiCircumference]}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
				/>
			</Svg>
		</View>
	);
}

type MacroProgress = {
	goal: number;
	current: number;
};

interface IGoalArcsProps {
	calories: MacroProgress;
	proteins: MacroProgress;
	carbohydrates: MacroProgress;
	fats: MacroProgress;
}

export function DailyStats({
	calories,
	carbohydrates,
	fats,
	proteins,
}: IGoalArcsProps) {
	return (
		<View className="items-center justify-center">
			<View className="relative min-h-[172px] items-center">
				<Arc
					color="#FF5736"
					percentage={calcMacroPercentage(calories)}
					radius={160}
					strokeWidth={12}
				/>
				<Arc
					className="absolute top-[20]"
					color="#2A9D90"
					percentage={calcMacroPercentage(proteins)}
					radius={140}
					strokeWidth={12}
				/>
				<Arc
					className="absolute top-[40]"
					color="#E8C468"
					percentage={calcMacroPercentage(carbohydrates)}
					radius={120}
					strokeWidth={12}
				/>
				<Arc
					className="absolute top-[60]"
					color="#F4A462"
					percentage={calcMacroPercentage(fats)}
					radius={100}
					strokeWidth={12}
				/>

				<View className="-mt-16 items-center justify-center">
					<Text>
						<Text className="font-sans-bold text-support-tomato text-xl">
							{Math.round(calories.current)}
						</Text>
						<Text className="text-base text-gray-700"> / {calories.goal}</Text>
					</Text>

					<Text className="mt-1 text-center font-sans-regular text-gray-700 text-sm">
						Calorias
					</Text>
				</View>
			</View>

			<View className="w-full flex-row items-center justify-between p-4">
				<View className="w-1/3 items-center justify-center">
					<Text className="font-sans-bold text-base text-support-teal">
						{Math.round(proteins.current)}g
						<Text className="text-gray-700 text-sm"> / {proteins.goal}g</Text>
					</Text>
					<Text className="font-sans-regular text-gray-700 text-sm">
						Proteínas
					</Text>
				</View>

				<View className="w-1/3 items-center justify-center">
					<Text className="font-sans-bold text-base text-support-yellow">
						{Math.round(carbohydrates.current)}g
						<Text className="text-gray-700 text-sm">
							{' '}
							/ {carbohydrates.goal}g
						</Text>
					</Text>
					<Text className="font-sans-regular text-gray-700 text-sm">
						Carboidratos
					</Text>
				</View>

				<View className="w-1/3 items-center justify-center">
					<Text className="font-sans-bold text-base text-support-orange">
						{Math.round(fats.current)}g
						<Text className="text-gray-700 text-sm"> / {fats.goal}g</Text>
					</Text>
					<Text className="font-sans-regular text-gray-700 text-sm">
						Gorduras
					</Text>
				</View>
			</View>
		</View>
	);
}

function calcMacroPercentage({ goal, current }: MacroProgress) {
	const percentage = (current / goal) * 100;
	return Math.min(percentage, 100);
}
