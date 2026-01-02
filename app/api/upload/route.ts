'use server';

import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists
    const relativeUploadDir = '/uploads';
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    // Create unique name
    const ext = file.name.split('.').pop();
    const uniqueName = `${uuidv4()}.${ext}`;
    const filePath = join(uploadDir, uniqueName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `${relativeUploadDir}/${uniqueName}` });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload unknown error' }, { status: 500 });
  }
}
