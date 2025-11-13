import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    EMAIL_USER: !!process.env.EMAIL_USER ? 'Found' : 'Missing',
    EMAIL_PASS: !!process.env.EMAIL_PASS ? 'Found' : 'Missing', 
    EMAIL_TO: !!process.env.EMAIL_TO ? 'Found' : 'Missing',
    NODE_ENV: process.env.NODE_ENV || 'undefined'
  };

  return NextResponse.json(envCheck);
}