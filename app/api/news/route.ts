import { NextResponse } from 'next/server';
import { getJSON, saveJSON } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE = 'news.json';

export async function GET() {
    const data = getJSON(DATA_FILE);
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    const data = getJSON(DATA_FILE);
    const newItem = { id: uuidv4(), ...body };
    data.unshift(newItem); // Add to top
    saveJSON(DATA_FILE, data);
    return NextResponse.json(newItem);
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    let data = getJSON(DATA_FILE);
    const index = data.findIndex((item: any) => item.id === id);

    if (index === -1) return NextResponse.json({ error: 'Item not found' }, { status: 404 });

    data[index] = { ...data[index], ...updates };
    saveJSON(DATA_FILE, data);
    return NextResponse.json(data[index]);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    let data = getJSON(DATA_FILE);
    data = data.filter((item: any) => item.id !== id);
    saveJSON(DATA_FILE, data);
    return NextResponse.json({ success: true });
}
