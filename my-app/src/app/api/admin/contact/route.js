import Contact from '../../../../models/contactModel';
import db from '../../../../db';

db();

export async function GET() {
  const messages = await Contact.find();
  return NextResponse.json(messages);
}
