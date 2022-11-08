import { PropsWithChildren } from 'react';
import { CircleNotch } from 'phosphor-react';

interface Props extends PropsWithChildren<any> {
	type?: 'button' | 'submit' | 'reset';
	loading?: boolean;
}

const defaultProps: Props = {
	type: 'button',
};

const Button: React.FC<Props> = (props) => {
	return (
		<button
			type={props.type}
			className='flex items-center py-2 px-4 rounded-md bg-teal-600 text-white text-sm hover:bg-teal-700 transition-colors'
		>
			{props.loading ? (
				<CircleNotch className='animate-spin' size={20} />
			) : (
				props.children
			)}
		</button>
	);
};

Button.defaultProps = defaultProps;

export { Button };
