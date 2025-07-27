import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { cn } from '$/utils/cn.util';

interface IInputProps extends React.ComponentProps<typeof TextInput> {
	mask?: string;
	label?: string;
	append?: string;
	error?: string;
}

export function Input({
	className,
	mask,
	onChangeText,
	label,
	append,
	error,
	...props
}: IInputProps) {
	const [maskedValue, setMaskedValue] = useState('');

	function handleChangeText(text: string) {
		const value = mask ? applyMask(text, mask) : text;

		setMaskedValue(value);
		onChangeText?.(value);
	}

	return (
		<View className="gap-2">
			{label && (
				<Text className="to-black-700 font-sans-medium text-base">{label}</Text>
			)}

			<View className="flex-row gap-2">
				<TextInput
					className={cn(
						'h-[52px] flex-1 rounded-[10px] border border-gray-400 p-3.5 text-black-700 focus:border-black-700',
						!!error && 'border-support-red',
						className
					)}
					onChangeText={handleChangeText}
					value={mask ? maskedValue : props.value}
					{...props}
				/>

				{append && (
					<View className="size-[52px] items-center justify-center rounded-[10px] bg-gray-400 text-center">
						<Text className="font-sans-regular text-base text-gray-700">
							{append}
						</Text>
					</View>
				)}
			</View>
			{error && (
				<Text className="font-sans-regular text-colors-support-red text-sm">
					{error}
				</Text>
			)}
		</View>
	);
}

function applyMask(value: string, mask: string): string {
	const cleanValue = value.replace(/\D/g, '');
	let result = '';
	let j = 0;

	for (let i = 0; i < mask.length && j < cleanValue.length; i++) {
		if (mask[i] === '9') {
			result += cleanValue[j++];
		} else {
			result += mask[i];
		}
	}

	return result;
}
