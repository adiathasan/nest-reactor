'use client';

import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PlaceHolder } from '@components/PlaceHolder';
import { Button } from 'ui/Button';
import { queryConfig } from 'core';

export default function Page() {
	return (
		<QueryClientProvider client={queryConfig.client}>
			<PlaceHolder />
			<Button />
		</QueryClientProvider>
	);
}
