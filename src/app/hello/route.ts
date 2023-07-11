import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as React from 'react';

export async function GET() {

    const trips = await prisma.trip.findMany();

    return new NextResponse(JSON.stringify(trips), { status: 200 })
}