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
			className={`'flex items-center py-2 px-4 rounded-md  text-white text-sm  transition-colors' ${
				!props.loading
					? 'bg-teal-600 hover:bg-teal-700'
					: 'bg-slate-400 hover:cursor-wait'
			}`}
			disabled={props.loading}
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
