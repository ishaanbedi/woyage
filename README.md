![Supalytics Logo](https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/og.png)

Supalytics is an open-sourced website analytics tool designed to track websites. With Supalytics, you can gain a deeper understanding of your audience, their behavior, and the performance of your website.

## Features

- **Visitors**: Track and analyze your visitors' behavior in real-time.
- **Location**: Identify where your visitors are coming from around the world.
- **Languages**: Analyze the languages spoken by your visitors to customize content.
- **Real-Time Data**: Monitor website activity as it happens.
- **Traffic Sources**: Analyze referral, direct, and search traffic sources.
- **Device Analytics**: Gain insights into visitors' devices, browsers, and operating systems.
- **Supalytics Privacy**: Trust that your data and your visitors' information are kept safe and private.
- **No Cookies**: We don't store any cookies on visitors' devices.
- **Privacy First**: No personal data is collected that could identify visitors.
- **Performance**: Our technology ensures fast analytics without slowing down your website.

## Tech Stack

- **[Supabase](https://supabase.com/)**: From authentication, to database, and realtime updates are powered by Supabase.
- **[Next.js](https://nextjs.org/)**: Supalytics is built with Next.js 14 using the [app router](https://nextjs.org/docs/app).
- Styling & UI**: Built with amazing components from [shadcn/ui](https://ui.shadcn.com/), styled with [TailwindCSS](https://tailwindcss.com/) & [HyperUI](https://hyperui.dev/).
- **[Vercel](https://vercel.com/)**: Supalytics is deployed on Vercel ▲
- **[Tremor](https://tremor.so/)**: React components powering charts and dashboard on Supalytics
- **[Resend](https://resend.com/)**: For sending and managin authentication & support related emails.

## Using Supalytics.co
The easiest way to use Supalytics is to use the already deployed version at [supalytics.co](https://supalytics.co/). 

When you visit the website, you can sign up for an account and add your website to start tracking your visitors. You will be provided with a tracking code that you can add to your website to start tracking visitors.

## Running Supalytics Locally
If you want to self-host Supalytics, you can follow the steps below:

1. Clone the repository:
```bash
git clone https://github.com/ishaanbedi/supalytics
```

2. Rename `.env.example` to `.env.local` and fill in the environment variables as per the following:
```bash

# Name of your website
NEXT_PUBLIC_SITE_NAME="Supalytics"

# URL of your website
NEXT_PUBLIC_SITE_URL="https://supalytics.co/" 

# Stage of your website (development/production) used to determine the environment
NEXT_PUBLIC_STAGE="development"

# Get this from your Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY="..." 

 # Get this from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL="https://project_id.supabase.co"

# We are using Resend for everything related to emails, you need to sign up on Resend and set up a domain over there & setup the Supabase integration. Check out the following links for more information:
# https://resend.com/docs/dashboard/domains/introduction
# https://supabase.com/partners/integrations/resend
# https://resend.com/api-keys

# After setting up the domain, set the RESEND_EMAIL variable
RESEND_EMAIL="re_..."
 
# Support email for your website, remove this if you don't plan to implement support
NEXT_PUBLIC_SUPPORT_EMAIL="support@supalytics.co"

# Supalytics use Supabase Webhooks to email the admin whenever a new support request is created. You can set a webhook in your Supabase project settings:
# https://supabase.com/docs/guides/database/webhooks

# When you create a webhook, create a HEADER with a key as `supabase-verified` and a value that will be used to verify it, and set the following environment variable with the value you've set, in order to prevent unauthorized requests to your webhook
SUPABASE_WEBHOOK_HEADER_KEY="...."

# Email of the recipient of the support requests, remove this if you don't plan to implement support
SUPPORT_RECIPIENT="hey@ishaanbedi.com"

```

3. Install the dependencies:
```bash
pnpm install
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Open Source License
Supalytics is open-sourced under the MIT License. You can use it for personal or commercial projects.

## Contributing
Issues and PRs are welcome! Feel free to contribute to the project.
