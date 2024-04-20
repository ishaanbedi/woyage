const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/terms`
  : "http://localhost:3000/terms";

import { type Metadata } from "next";
export const metadata: Metadata = {
  title: 'Terms of Service',
};
const Terms = () => {
  const lastUpdated = "19 April 2024";
  const appName = process.env.NEXT_PUBLIC_SITE_NAME;
  return (
    <div className="terms-page prose max-w-xl px-2 mx-auto py-3">
      <h1>{appName} Terms of Service</h1>
      <p>
        Please note that {appName} is a project created by indie developers and
        is not affiliated in any way with any other company or service.
      </p>
      <p>
        Welcome to {appName}! These terms govern your use of {appName} and any
        related services provided by {appName}.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using {appName}, you agree to be bound by these terms of
        service. If you do not agree to these terms, please do not use
        {appName}.
      </p>
      <h2>2. Description of Service</h2>
      <p>
        {appName} provides analytics services for websites and applications,
        allowing users to track and analyze traffic to their websites.
      </p>
      <h2>3. Privacy Policy</h2>
      <p>
        Your use of {appName} is also subject to our Privacy Policy, which
        explains how we collect, use, and disclose your information. Please
        review our Privacy Policy carefully.
      </p>
      <h2>4. Modifications to Terms</h2>
      <p>
        We reserve the right to modify these terms of service at any time.
        Changes will be effective immediately upon posting to the website. Your
        continued use of {appName} after any such changes constitutes your
        acceptance of the new terms.
      </p>
      <h2>5. Limitation of Liability</h2>
      <p>
        {appName} and its developers and contributors will not be liable for any
        direct, indirect, incidental, special, consequential, or exemplary
        damages, including but not limited to, damages for loss of profits,
        goodwill, use, data, or other intangible losses resulting from the use
        of or inability to use {appName}.
      </p>
      <h2>6. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless {appName} and its developers
        and contributors from and against any and all claims and expenses,
        including attorneys' fees, arising out of your use of {appName},
        including but not limited to your violation of these terms of service.
      </p>
      <h2>7. Request from Government or Law Enforcement</h2>
      <p>
        We may disclose your information to government or law enforcement
        officials if we believe it is necessary to comply with a legal
        requirement, protect the rights, property, or safety of {appName} or
        others, or prevent illegal activity.
      </p>
      <h2>8. Termination</h2>
      <p>
        We reserve the right to terminate or suspend your account and access to
        {appName} at any time, with or without notice. A valid reason for such a
        termination would be provided.
      </p>
      <h2>9. What counts as a breach of terms?</h2>
      <p>
        A breach of terms would be considered if you use {appName} for any
        illegal or unauthorized purpose, or violate any laws in your
        jurisdiction.
      </p>
      <h2>10. Payment & Expenses</h2>
      <p>
        {appName} is a free service and does not require any payment. However,
        we reserve the right to introduce paid features in the future.
        <br />
        As of {lastUpdated}, {appName} is a free service and does not require
        any payment at all.
      </p>
      <h2>11. Copyright and Intellectual Property</h2>
      <p>
        All content on {appName}, including but not limited to text, graphics,
        logos, icons, images, audio clips, digital downloads, data compilations,
        and software, is either owned by {appName} or sourced from the public
        domain. I have made every effort to ensure that all content on this
        website is either original or sourced from the public domain. If you
        believe that any content on this website infringes on your copyright,
        please reach out to me and I will be happy to address.
      </p>
      <h2>12. Developer Note</h2>
      <p>
        Phew, that was a lot of legal jargon! Obviously, that's not my forte.
        <br />I am an indie developer and I created {appName} as a side project.
        Please let me know if something more needs to be added to this in order
        to make it more clear and safe and secure for everyone.
      </p>

      <h2> Contact Information</h2>
      <p>
        If you have any questions about these terms of service, please contact
        me at hey@ishaanbedi.com
      </p>
    </div>
  );
};

export default Terms;
