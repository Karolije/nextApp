import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const data = [
        { id: 1, name: "Anna" },
        { id: 2, name: "Jarek" },
    ];
    
    return NextResponse.json(data);
}