import { NextResponse } from 'next/server';
import { getJSON, saveJSON } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE = 'applications.json';

export async function GET() {
    const data = getJSON(DATA_FILE);
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    const data = getJSON(DATA_FILE);
    const newItem = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        status: 'new', // new, reviewed, contacted
        ...body
    };
    data.unshift(newItem);
    saveJSON(DATA_FILE, data);
    return NextResponse.json(newItem);
}
