export interface User {
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
