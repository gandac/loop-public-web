'use client';
import React, { useOptimistic } from 'react';

import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

import { SingleSubscribeToNewsletter } from '../../actions/newsletter/subscribe';

export async function SubscribeToNewsletter() {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state, newMessage) => [
    ...state,
    { message: newMessage }
  ]);
  // async function SingleSubscribeToNewsletter(formData) {
  //   // event.preventDefault();
  //   // const { email } = event.target.elements;
  //   // const emailAddress = email.value;

  //   console.log(process.env);

  //   // await kv.hset(emailAddress, { emailAddress });
  // }

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-50 p-8 sm:p-12">
      <div className="w-full max-w-4xl rounded-md border-2 border-gray-100 bg-white p-14">
        <div className="flex flex-col items-center">
          <h3 className="mt-2 max-w-2xl text-center text-lg font-bold leading-tight sm:text-lg md:text-lg md:leading-tight">
            Stay in touch
          </h3>
          <p className="">
            Curious to see our achievements or you want to stay in the loop with latest tech trends? Get updates and
            special offers from LoopLine Studios
          </p>
          <form
            action={SingleSubscribeToNewsletter}
            className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <input
              type="email"
              name="email"
              id="email"
              className="grow rounded border-2 border-gray-300 py-3 px-3 focus:border-indigo-700 focus:outline-none sm:rounded-l-md sm:rounded-r-none sm:border-r-0"
              placeholder="Email Address"
            />
            <button
              type="submit"
              className="rounded bg-indigo-700 px-5 py-4 text-white sm:rounded-l-none sm:rounded-r-md hover:bg-indigo-900"
            >
              Get Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
