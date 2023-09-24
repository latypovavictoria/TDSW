import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import EInput from "./EInput";

export interface PhoneInputProps {
	value: string;
	onChange: (_: string) => void;
	onValid: (_: boolean) => void;
}

const PhoneInput = ({ value, onChange, onValid }: PhoneInputProps) => {
	const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (value === "") {
			onChange("");
			onValid(true);
			return;
		}
		if (value[0] === "8") {
			value = "+7" + value.substring(1);
		}
		const res = new AsYouType().input(value);

		onValid(isValidPhoneNumber(res));

		onChange(res);
	};

	return (
		<EInput
			className="my-3 flex"
			inputClassName="p-1"
			value={value}
			onChange={(e) => handleNumber(e)}
		/>
	);
};

export default PhoneInput;
