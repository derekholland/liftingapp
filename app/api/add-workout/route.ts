import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma'; // Adjust the import path to match your prisma setup

// Define TypeScript interfaces for the incoming workout data
interface SetData {
	reps: number;
	weight: number;
}

interface ExerciseData {
	name: string;
	sets: SetData[];
}

interface WorkoutData {
	title: string;
	date: string;
	exercises: ExerciseData[];
}

export async function POST(request: Request) {
	try {
		// Parse the incoming request data and type it as WorkoutData
		const body: WorkoutData = await request.json();

		console.log('Received data from form:', JSON.stringify(body, null, 2));

		// Create a new workout entry in the database using Prisma
		const newWorkout = await prisma.workout.create({
			data: {
				title: body.title,
				date: new Date(body.date),
				exercises: {
					create: body.exercises.map(exercise => ({
						name: exercise.name,
						sets: {
							create: exercise.sets.map(set => ({
								reps: set.reps,
								weight: set.weight,
							})),
						},
					})),
				},
			},
		});

		// Create the response and disable caching with Cache-Control: no-store
		const response = NextResponse.json({
			message: 'Workout created successfully',
			workout: newWorkout,
		});
		// Set cache control to no-store to prevent caching
		response.headers.set('Cache-Control', 'no-store');

		return response;
	} catch (error) {
		console.error('Error creating workout:', error);
		return NextResponse.json(
			{ error: 'Failed to create workout' },
			{ status: 500 },
		);
	}
}
