import { add } from '@core';
import { Button, Header } from 'ui';

export default function Page() {
	return (
		<>
			<Header text='Web' />
			<Button />
			{add(1, 2)}
		</>
	);
}
