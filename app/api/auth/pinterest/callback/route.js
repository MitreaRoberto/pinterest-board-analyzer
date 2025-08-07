import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const response = await axios.post('https://api.pinterest.com/v5/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: process.env.PINTEREST_CLIENT_ID,
      client_secret: process.env.PINTEREST_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    });

    const { access_token } = response.data;

    // Redirect to dashboard with token in query (for demo purposes)
    return NextResponse.redirect(
      new URL(`/dashboard?token=${access_token}`, request.url)
    );
  } catch (error) {
    console.error('Token exchange error:', error?.response?.data || error.message);
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
  }
}
