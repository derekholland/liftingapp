import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	// Fetch the workout by its ID, including exercises and their sets
	const workout = await prisma.workout.findUnique({
		where: { id: parseInt(params.id) }, // Parse the ID from params as an integer
		include: {
			exercises: {
				include: {
					sets: true, // Include sets associated with exercises
				},
			},
		},
	});

	// If the workout is not found, return a 404 response
	if (!workout) {
		return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
	}

	// Create the response and disable caching with Cache-Control: no-store
	const response = NextResponse.json(workout);
	response.headers.set('Cache-Control', 'no-store'); // Disable caching for real-time updates

	return response;
}
