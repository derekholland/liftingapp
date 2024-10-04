import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
	try {
		// Fetch all workouts with exercises and sets included
		const workouts = await prisma.workout.findMany({
			include: {
				exercises: {
					include: {
						sets: true,
					},
				},
			},
		});

		// Create the response and disable caching with Cache-Control: no-store
		const response = NextResponse.json(workouts);
		response.headers.set('Cache-Control', 'no-store'); // Disable cache to fetch fresh data
		return response;
	} catch (error) {
		console.error('Error fetching workouts:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch workouts' },
			{ status: 500 },
		);
	}
}
