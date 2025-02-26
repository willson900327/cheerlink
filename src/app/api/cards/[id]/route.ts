import { NextResponse } from 'next/server';
import { getBusinessCard } from '@/app/firebase/services';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cardData = await getBusinessCard(params.id);
    
    if (!cardData) {
      return NextResponse.json(
        { error: 'Card not found or not public' },
        { status: 404 }
      );
    }

    return NextResponse.json(cardData);
  } catch (error) {
    console.error('Error fetching card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
