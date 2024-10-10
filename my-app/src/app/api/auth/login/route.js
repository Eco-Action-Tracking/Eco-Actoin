// import connectDB from '../../../../db';
// import User from '../../../../models/users';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// connectDB();

// export async function POST(req) {
//   const { email, password } = await req.json();

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return new Response(JSON.stringify({ token }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Error logging in' }), { status: 500 });
//   }
// }








import connectDB from '../../../../db';
import User from '../../../../models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email, isDeleted: false, isActive: true });
    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials or account disabled' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }
    const v = process.env.JWT_SECRET || "omar";
    const token = jwt.sign({ id: user._id }, v , { expiresIn: '1h' });
    console.log("messi");
    return new Response(JSON.stringify({ token }), { status: 200 });
 
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error logging in' }), { status: 500 });
  }
}
