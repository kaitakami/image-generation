import { ImageResponse } from '@vercel/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const fontBold = fetch(new URL('../../../public/Poppins-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);
const fontLight = fetch(new URL('../../../public/Poppins-Light.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);
const fontMedium = fetch(new URL('../../../public/Poppins-Medium.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export async function GET(req: NextRequest) {
  const fontDataM = await fontMedium;
  const fontDataB = await fontBold;
  const fontDataL = await fontLight;

  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role') || 'Role'
  const guest = searchParams.get('guest') || 'Guest Name'
  const imageUrl = searchParams.get('image') || 'https://vptzberkenstein.nl/wp/wp-content/uploads/2019/06/placeholder_persoon.png'


  const response = new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          fontFamily: '"Poppins"',
          background: "linear-gradient(to left bottom, rgb(217, 249, 157), rgb(5, 150, 105), rgb(3, 105, 161))",
          color: 'white',
        }}
      >
        <label
          style={{
            position: 'absolute',
            transform: 'translate(0, -50%)',
            top: '50%',
            right: 0,
            height: '1000',
            width: '500',
            background: 'white',
            borderTopLeftRadius: '999',
            borderBottomLeftRadius: '999',
          }}
          className='rounded-full'
        />

        <div
          style={{
            display: 'flex'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '70',
              left: '60',
            }}
          >
            <p
              style={{
                fontSize: '40',
                maxWidth: '500',
              }}
            >
              Fundadores Podcast
              entrevista a
            </p>
            <p
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: '"PoppinsBold"',
                fontSize: '115',
                lineHeight: '85',
                maxWidth: '665',
                textAlign: 'justify'

              }}
            >
              {guest}
            </p>
            <p
              style={{
                fontSize: '55',
                fontFamily: '"PoppinsLight"',
                textTransform: 'uppercase',
                maxWidth: '620',
                lineHeight: '50',
                marginBottom: 0,
              }}
            >
              {role}
            </p>
            <img
              style={{
                width: '160',
              }} src={`${process.env.NEXT_PUBLIC_URL}/fundadores-logo.png`}
              alt="Fundadores Podcast Logo"
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 720,
      emoji: "noto",
      fonts: [
        {
          name: 'Poppins',
          data: fontDataM,
          style: 'normal',
        },
        {
          name: 'PoppinsBold',
          data: fontDataB,
          style: 'normal',
        },
        {
          name: 'PoppinsLight',
          data: fontDataL,
          style: 'normal'
        }
      ]
    }
  ) as { body: Buffer };

  return new Response(response.body, { status: 200 });
}
