'use server';
import { kv } from '@vercel/kv';

export async function SingleSubscribeToNewsletter(formData) {
  const emailAddress = formData.get('email');

  await kv.sadd('emailAddresses', emailAddress);

  // const readDB = await kv.smembers('emailAddresses');
  //   console.log(readDB);
}
