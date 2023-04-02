export interface User {
    _id: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    isActive: boolean;
    isAdmin: boolean;
}

export interface Plan {
    name?: string;
    description?: string;
    exercises: string[];
}

export interface Exercise {
    _id: string;
    name: string;
    description: string;
    sets: number;
    reps: number;
    weight: number;
}

export interface Session {
    _id: string;
    start: string;
    end: string;
    userId: string;
    score: number;
}

export interface Progress {
    _id: string;
    exerciseId: string;
    sessionId: string;
    sets: number;
    reps: number;
    weight: number;
    isComplete: boolean;
}
