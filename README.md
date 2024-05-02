![Woyage Logo](https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/og.png)

Woyage is an open-sourced website analytics tool designed to track websites. With Woyage, you can gain a deeper understanding of your audience, their behavior, and the performance of your website.

## Features

- **Visitors**: Track and analyze your visitors' behavior in real-time.
- **Location**: Identify where your visitors are coming from around the world.
- **Languages**: Analyze the languages spoken by your visitors to customize content.
- **Real-Time Data**: Monitor website activity as it happens.
- **Traffic Sources**: Analyze referral, direct, and search traffic sources.
- **Device Analytics**: Gain insights into visitors' devices, browsers, and operating systems.
- **Woyage Privacy**: Trust that your data and your visitors' information are kept safe and private.
- **No Cookies**: We don't store any cookies on visitors' devices.
- **Privacy First**: No personal data is collected that could identify visitors.
- **Performance**: Our technology ensures fast analytics without slowing down your website.

<table>
  <tr>
    <td> <img width="697" alt="Screenshot" src="https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/1.png"></td>
    <td> <img width="697" alt="Screenshot" src="https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/2.png"></td>
    <td> <img width="697" alt="Screenshot" src="https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/3.png"></td>
  </tr>
</table>


<table>
  <tr>
     <td> <img width="697" alt="Screenshot" src="https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/4.png"></td>
    <td> <img width="697" alt="Screenshot" src="https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/5.png"></td>
  </tr>
</table>


<table>
  <tr>
<td> <img width="697" alt="Screenshot" src="https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/6.png"></td>
   <td> <img width="697" alt="Screenshot" src="https://sdkjkskyuwkatrfdiwsx.supabase.co/storage/v1/object/public/assets/repo/7.png"></td>
  </tr>
</table>


## Tech Stack

- **[Supabase](https://supabase.com/)**: From authentication, to database, and realtime updates are powered by Supabase.
- **[Next.js](https://nextjs.org/)**: Woyage is built with Next.js 14 using the [app router](https://nextjs.org/docs/app).
- **Styling & UI**: Built with amazing components from [shadcn/ui](https://ui.shadcn.com/), styled with [TailwindCSS](https://tailwindcss.com/) & [HyperUI](https://hyperui.dev/).
- **[Vercel](https://vercel.com/)**: Woyage is deployed on Vercel ▲
- **[Tremor](https://tremor.so/)**: React components powering charts and dashboard on Woyage
- **[Resend](https://resend.com/)**: For sending and managing authentication & support related emails.

## Supabase Offerings Used:
- **Realtime**: Supabase Realtime is used to track and update visitor data in real-time.
- **Database**: Supabase Database is used to store visitor data.
- **Auth**: Supabase Auth is used for user authentication.
- **Webhooks**: Supabase Webhooks are used to send emails to the admin when a new support request is created.

## Check Out a Demo Video


https://github.com/ishaanbedi/woyage/assets/39641326/eba7193f-4773-4f69-ba2d-3b7c0daf603e



## Using Woyage.co
The easiest way to use Woyage is to use the already deployed version at [woyage.co](https://woyage.co/). 

When you visit the website, you can sign up for an account and add your website to start tracking your visitors. You will be provided with a tracking code that you can add to your website to start tracking visitors.

## Running Woyage Locally
If you want to run Woyage locally, you can follow the steps below:

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
git clone https://github.com/ishaanbedi/woyage
```

2. Rename `.env.example` to `.env.local` and fill in the environment variables as per the following:
```bash

# Name of your website
NEXT_PUBLIC_SITE_NAME="Woyage"

# URL of your website
NEXT_PUBLIC_SITE_URL="https://woyage.co/" 

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
NEXT_PUBLIC_SUPPORT_EMAIL="support@woyage.co"

# Woyage use Supabase Webhooks to email the admin whenever a new support request is created. You can set a webhook in your Supabase project settings:
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

## Deploying Woyage

Deploying Woyage is easy, just follow the steps mentioned in the [Running Woyage Locally](#running-woyage-locally) section to set up the Supabase database and environment variables.

After that, you can easily deploy Woyage to Vercel by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fishaanbedi%2Fwoyage%2F&env=NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_STAGE,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_SUPABASE_URL,RESEND_EMAIL,NEXT_PUBLIC_SUPPORT_EMAIL,SUPABASE_WEBHOOK_HEADER_KEY,SUPPORT_RECIPIENT&project-name=woyage&repository-name=woyage)

## Support Mechanism

Woyage has a built-in support mechanism that allows visitors to send support requests to the admin. The support requests are stored in the `contacts` table in the Supabase database, and the admin is notified via email whenever a new support request is created.

Here's how the support mechanism works:

1. The visitor fills out the support form on the website.
2. Using Supabase JavaScript SDK, the support request is added to the `contacts` table in the Supabase database.
3. Based on the insert operation in the `contacts` table, a Supabase webhook is triggered.
4. The Supabase webhook sends a POST request to the `/api/support-email` endpoint in the application.
5. The webhook is configured with a header key that is used to verify the request, in order to prevent unauthorized requests to the endpoint.
6. The `/api/support-email` further triggers the Resend API to send an email to the admin with the details of the support request.

This ensures that the admin is notified whenever a new support request is created, and can respond to the visitor accordingly.

## Open Source License
Woyage is open-sourced under the MIT License. You can use it for personal or commercial projects.

## Contributing
Issues and PRs are welcome! Feel free to contribute to the project.
