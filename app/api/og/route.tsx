import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.has('title') ? searchParams.get('title') : 'Hello world!';
  const response = new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-0-ypxfmJLq8%2FWlzHPs9iihI%2FAAAAAAAAZKU%2F7SACNQrJjh8GeNfilKahc--mB3q7bgzKgCLcBGAs%2Fs1600%2FOpenAI_Logo.png&f=1&nofb=1&ipt=6a04272bfee3ba6a565ceb911dc8fa0009e7463d30e70c3392b839d933d2c689&ipo=images"
          style={{
            width: 300,
          }}
        />
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  ) as { body: Buffer };

  return new Response(response.body, { status: 200 });
}
