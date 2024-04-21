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

<table>
  <tr>
    <td> <img width="697" alt="Screenshot 1" src="https://github.com/ishaanbedi/supalytics/assets/39641326/3e69c00a-990c-473b-ae8c-9563654009f7"></td>
    <td><img width="695" alt="Screenshot 2" src="https://github.com/ishaanbedi/supalytics/assets/39641326/c7b75e80-82e2-4656-91d5-30667975df8a"> </td>
    <td><img width="695" alt="Screenshot 3" src="https://github.com/ishaanbedi/supalytics/assets/39641326/f2e47722-7658-4921-ac10-700986a6fd71"></td>
  </tr>
</table>


<table>
  <tr>
    <td>
     <img width="693" alt="Screenshot 2024-04-20 at 8 18 40 PM" src="https://github.com/ishaanbedi/supalytics/assets/39641326/6e1c00b8-a82d-46f9-ad19-383c29b3f4a9">
   </td>
   <td>
    <img width="701" alt="Screenshot 2024-04-20 at 8 18 52 PM" src="https://github.com/ishaanbedi/supalytics/assets/39641326/6100171a-fea6-44fa-9f19-1e38fa540ee6">
    </td>
  </tr>
</table>


<table>
  <tr>
    <td>
<img width="693" alt="Screenshot 2024-04-20 at 8 20 17 PM" src="https://github.com/ishaanbedi/supalytics/assets/39641326/b628b97d-11dd-480c-b86f-e788aae83486">

   </td>
   <td>
<img width="697" alt="Screenshot 2024-04-20 at 8 20 27 PM" src="https://github.com/ishaanbedi/supalytics/assets/39641326/718addf5-9d7c-4816-a24e-ffff70a7f7a2">
    </td>
  </tr>
</table>


## Tech Stack

- **[Supabase](https://supabase.com/)**: From authentication, to database, and realtime updates are powered by Supabase.
- **[Next.js](https://nextjs.org/)**: Supalytics is built with Next.js 14 using the [app router](https://nextjs.org/docs/app).
- **Styling & UI**: Built with amazing components from [shadcn/ui](https://ui.shadcn.com/), styled with [TailwindCSS](https://tailwindcss.com/) & [HyperUI](https://hyperui.dev/).
- **[Vercel](https://vercel.com/)**: Supalytics is deployed on Vercel ▲
- **[Tremor](https://tremor.so/)**: React components powering charts and dashboard on Supalytics
- **[Resend](https://resend.com/)**: For sending and managin authentication & support related emails.

## Supabase Offerings Used:
- **Realtime**: Supabase Realtime is used to track and update visitor data in real-time.
- **Database**: Supabase Database is used to store visitor data.
- **Auth**: Supabase Auth is used for user authentication.
- **Webhooks**: Supabase Webhooks are used to send emails to the admin when a new support request is created.

## Check Out a Demo Video


https://github.com/ishaanbedi/supalytics/assets/39641326/eba7193f-4773-4f69-ba2d-3b7c0daf603e



## Using Supalytics.co
The easiest way to use Supalytics is to use the already deployed version at [supalytics.co](https://supalytics.co/). 

When you visit the website, you can sign up for an account and add your website to start tracking your visitors. You will be provided with a tracking code that you can add to your website to start tracking visitors.

## Running Supalytics Locally
If you want to self-host Supalytics, you can follow the steps below:

Before you start, you need to setup a Supabase project. You can sign up for a free account at [Supabase](https://supabase.com/).

### Supabase Schema
There are three tables in the Supabase database to facilitate the tracking of visitors:

1. **site_domains**: This table stores the domains of the websites that are being tracked, and has the following columns:
   - **id**: Auto-incrementing ID.
   - **domain_name**: The domain name of the website, unique and binded to the user.
   - **email**: The email of the user who added the domain, used for authentication and authorization for the domain.
   - **website_id**: The ID of the website, used to track visitors, used as a foreign key in other related tables.
   - **added_timestamp**: The timestamp when the domain was added, used for displaying in the dashboard in a sorted manner.

Execute the following SQL query in Supabase's SQL editor to create the `site_domains` table:
   ```sql
   CREATE TABLE IF NOT EXISTS site_domains (
     id SERIAL PRIMARY KEY,
     domain_name text,
     email varchar(250),
     website_id uuid,
     added_time timestamp with time zone
   );
   ```

   2. **analytics**: This table stores the visitor data, and has the following columns:
    - **id**: The ID of the website, which is the same as the `website_id` in the `site_domains` table.
    - **path**: The path of the page visited by the visitor.
    - **browser**: The browser used by the visitor.
    - **device**: The device used by the visitor.
    - **language**: The language spoken by the visitor.
    - **referrer**: The referrer of the visitor.
    - **os**: The operating system used by the visitor's device.
    - **country**: The country of the visitor.
    - **website_id**: The ID of the website, can be used interchangeably with the `id` column, but is not used to relate to the `site_domains` table.
    - **domain**: The domain of the website, used to identify the website, and prevent unauthorized tracking.
    - **timestamp**: The timestamp when the visitor visited the website, used to track the time of the visit.

Execute the following SQL query in Supabase's SQL editor to create the `analytics` table:

```sql
CREATE TABLE IF NOT EXISTS analytics (
  id uuid,
  path text,
  browser text,
  device text,
  language text,
  referrer text,
  os text,
  country text,
  website_id uuid,
  domain text,
  timestamp timestamp with time zone
);
```

3. **contacts**: This table stores the support requests from the visitors, and has the following columns:
    - **id**: Auto-incrementing ID.
    - **name**: The name of the visitor.
    - **email**: The email of the visitor.
    - **query_type**: The type of query, like a bug report, feature request, etc.
    - **message**: The message sent by the visitor.
    - **created_at**: The timestamp when the support request was created.

Execute the following SQL query in Supabase's SQL editor to create the `contacts` table:
    
```sql  
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name text,
      email text,
      query_type text,
      message text,
      created_at timestamp with time zone
    );

```

The `contacts` table is used to store the support requests from the visitors, and is used to send emails to the admin when a new support request is created. In case you don't want to implement support, you can ignore the `contacts` table and the related code in the Supabase functions, and the Supabase Webhooks.



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

## Deploying Supalytics
You can deploy Supalytics to Vercel by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fishaanbedi%2Fsupalytics%2F&env=NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_STAGE,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_SUPABASE_URL,RESEND_EMAIL,NEXT_PUBLIC_SUPPORT_EMAIL,SUPABASE_WEBHOOK_HEADER_KEY,SUPPORT_RECIPIENT&project-name=supalytics&repository-name=supalytics)

## Open Source License
Supalytics is open-sourced under the MIT License. You can use it for personal or commercial projects.

## Contributing
Issues and PRs are welcome! Feel free to contribute to the project.
