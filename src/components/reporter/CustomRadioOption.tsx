import { Fragment } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CgCheck } from 'react-icons/cg';

type CustomRadioOptionProps = {
    value: string;
    children?: React.ReactNode;
}

const CustomRadioOption = ({ value, children, ...props }: CustomRadioOptionProps) => {
    return (
        <RadioGroup.Option key={value} value={value} {...props} as={Fragment}>
            {({ checked }) => (
                <li
                    className={`flex gap-2 p-1  items-center flex-row ${checked ? ' duration-500 active:bg-opacity-80 bg-custom-guinda bg-opacity-40' : ' '}`}
                >
                    <div className=' border w-4 h-4 justify-center items-center flex'>
                        {checked && <CgCheck className='w-4 h-4' />
                        }</div>
                    {children}
                </li>
            )}
        </RadioGroup.Option>
    );
};

export default CustomRadioOption;