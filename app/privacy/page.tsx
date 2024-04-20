const Privacy = () => {
  const lastUpdated = "19 April 2024";
  const appName = process.env.NEXT_PUBLIC_SITE_NAME;
  return (
    <div className="terms-page prose max-w-xl px-2 mx-auto py-3">
      <h1>{appName} Privacy Policy</h1>

      <h2>1. Introduction</h2>
      <p>
        At {appName}, we are committed to protecting your privacy and ensuring
        the security of your personal information. This Privacy Policy explains
        how we collect, use, disclose, and protect your information when you use
        our website and services.
      </p>
      <p>I have tried my best to keep it simple and easy to understand.</p>

      <h2>2. Information We Collect</h2>
      <p>
        As the intent of {appName} is to provide analytics services, we have to
        collect some information from you and your website. This information may
        include:
        <ul>
          <li>
            Usage information: Browser type, device information, operating
            system, country the user is from, language the user uses, paths of
            your website they visit, and the referral source. Nothing from this
            can be used to identify an individual, keeping it safe and secure.
            <br />
            We collect the user-agent string from the browser, which is a string
            that looks like:
            <br />
            <code>
              Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
              (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3
            </code>
            <br />
            You can see that it does not contain any personal information and
            all the information is about the browser and the device.
          </li>
          <li>
            Cookies: No cookies are stored on your visitors' devices. We use
            cookies to store your session information and to keep you logged in,
            that too is managed by Supabase (our backend and database provider).
          </li>
          <strong className="font-bold">
            We do not collect any personal information from your visitors.
            <br />
            We expect the same from you.
          </strong>
        </ul>
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>
        We may use the information we collect for various purposes, including:
        <ul>
          <li>
            Communicating with you, including responding to your inquiries and
            providing customer support, and we are super serious about it and we
            might not be able to help you out incase you fail to provide us with
            the correct email address or fail to prove your ownership of the
            website, in event of any such case.
          </li>
          <li>
            Creating dashboard for you to view the analytics of your website,
            and the data that you own is only visible to you.
          </li>
          <li>Complying with legal obligations and protecting our rights.</li>
          <strong className="font-bold">
            Do note that we do not share your data with any third party, we
            don't run ads on our website and we do not sell your data to anyone.
          </strong>
        </ul>
      </p>

      <h2>4. Your Information</h2>
      <p>
        You, the owner of the website, can request us to delete your data at any
        time, and we will do it as soon as possible. You can also request a copy
        of all the data that we have collected from your website.
        <br />
        In extreme cases, we may share your information in response to legal
        requests, to protect our rights and interests, as well as the rights of
        you.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        As of {lastUpdated}, all the data that we collect is stored in our
        database and nothing is deleted automatically. We do not have any
        automated process to delete the data.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have certain rights regarding your personal information, including
        the right to access, update, or delete your information. You can
        exercise these rights by contacting me at hey@ishaanbedi.com
      </p>

      <h2>7. Security</h2>
      <p>
        We take appropriate security measures to protect your personal
        information from unauthorized access, disclosure, alteration, or
        destruction. If you come across any security issue, please report it to
        hey@ishaanbedi.com as soon as possible.
      </p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
        <br />
        Last updated: {lastUpdated}
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact me at hey@ishaanbedi.com
      </p>
    </div>
  );
};

export default Privacy;
