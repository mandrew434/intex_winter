const PrivacyPolicyPage = () => {
  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <header className="mb-5">
        <h1 className="mb-3 text-center" style={{ color: '#22B8CF', fontWeight: 'bold' }}>
          CineNiche Privacy Policy
        </h1>
        <p className="text-muted text-center">Last Updated: [Insert Date]</p>
        <hr style={{ borderTop: '1px solid #ddd' }} />
      </header>

      {/* Section 1: Introduction */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          1. Introduction
        </h2>
        <p>
          At CineNiche ("we," "us," or "our"), we value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, share, and safeguard your data when you access our streaming services—
          including our website and mobile/connected device applications (collectively, the “Services”).
          By using our Services, you consent to the practices described in this policy.
        </p>
      </section>

      {/* Section 2: Information We Collect */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          2. Information We Collect
        </h2>
        <h3 style={{ color: '#22B8CF' }}>2.1 Personal Information You Provide</h3>
        <p>
          When you register for a CineNiche account or use certain features of our Services,
          we may request and collect personally identifiable information ("Personal Information"), such as:
        </p>
        <ul>
          <li>
            <strong>Account Information:</strong> Your name, email address, password, and billing details.
          </li>
          <li>
            <strong>Profile Information:</strong> Usernames, profile photos, and preferences.
          </li>
          <li>
            <strong>Communication Information:</strong> Your contact details if you choose to contact support or subscribe
            to communications (e.g., newsletters).
          </li>
        </ul>
        <h3 className="mt-4" style={{ color: '#22B8CF' }}>2.2 Information Collected Automatically</h3>
        <p>
          We collect non-personal data and metadata automatically as you use our Services, including:
        </p>
        <ul>
          <li>
            <strong>Usage Data:</strong> Information about your interactions—pages viewed, movie selections, and time spent
            on the platform.
          </li>
          <li>
            <strong>Device Information:</strong> Details about your device including model, operating system, browser type, and IP address.
          </li>
          <li>
            <strong>Cookies &amp; Tracking Technologies:</strong> We use cookies, pixels, and similar tracking tools to gather this data.
            (See Section 5 for details.)
          </li>
        </ul>
        <h3 className="mt-4" style={{ color: '#22B8CF' }}>2.3 Data from Third-Party Sources</h3>
        <p>
          In some cases, we may combine the data you provide with information obtained from third parties (e.g., social media platforms)
          to enhance your experience. This data is subject to the terms of the respective platforms.
        </p>
      </section>

      {/* Section 3: How We Use Your Information */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          3. How We Use Your Information
        </h2>
        <ul>
          <li>
            <strong>Service Delivery:</strong>
            <ul>
              <li>Manage and maintain your account.</li>
              <li>Provide personalized content recommendations.</li>
              <li>Process transactions, manage subscriptions, and handle billing.</li>
            </ul>
          </li>
          <li className="mt-3">
            <strong>Enhance User Experience:</strong>
            <ul>
              <li>Customize and improve our platform features.</li>
              <li>Analyze usage trends to optimize performance and recommendations.</li>
            </ul>
          </li>
          <li className="mt-3">
            <strong>Customer Support &amp; Communications:</strong>
            <ul>
              <li>Respond to inquiries and provide technical support.</li>
              <li>Send updates, promotions, or important account-related notices.</li>
            </ul>
          </li>
          <li className="mt-3">
            <strong>Security &amp; Compliance:</strong>
            <ul>
              <li>Monitor and prevent unauthorized access or fraudulent activity.</li>
              <li>Comply with applicable legal, regulatory, and governmental requirements.</li>
            </ul>
          </li>
          <li className="mt-3">
            <strong>Research &amp; Analytics:</strong>
            <ul>
              <li>Conduct aggregate research to enhance our services while keeping data anonymized.</li>
            </ul>
          </li>
        </ul>
      </section>

      {/* Section 4: How We Share Your Information */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          4. How We Share Your Information
        </h2>
        <h3 style={{ color: '#22B8CF' }}>4.1 With Service Providers</h3>
        <p>
          We share your information with trusted third-party providers (e.g., payment processors, cloud storage, analytics)
          under strict confidentiality agreements and solely for delivering our Services.
        </p>
        <h3 className="mt-4" style={{ color: '#22B8CF' }}>4.2 In Response to Legal Requests</h3>
        <p>
          Your Personal Information may be disclosed to comply with legal obligations or in response to lawful requests from authorities.
        </p>
        <h3 className="mt-4" style={{ color: '#22B8CF' }}>4.3 Business Transfers</h3>
        <p>
          In the event of a merger, acquisition, or asset sale, your information may be transferred.
          We will notify you of any change in the ownership or use of your Personal Information.
        </p>
        <h3 className="mt-4" style={{ color: '#22B8CF' }}>4.4 Aggregated or Anonymized Data</h3>
        <p>
          We may share aggregated or anonymized data that does not directly identify you.
        </p>
      </section>

      {/* Section 5: Cookies and Tracking Technologies */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          5. Cookies and Tracking Technologies
        </h2>
        <h3 style={{ color: '#22B8CF' }}>5.1 What Are Cookies?</h3>
        <p>
          Cookies are small text files placed on your device to help us remember your preferences,
          analyze usage, and enhance your experience.
        </p>
        <h3 className="mt-4" style={{ color: '#22B8CF' }}>5.2 How We Use Cookies</h3>
        <ul>
          <li>Authenticate and maintain your session.</li>
          <li>Collect usage data for understanding user interactions.</li>
          <li>Customize content and provide personalized recommendations.</li>
        </ul>
        <h3 className="mt-4" style={{ color: '#22B8CF' }}>5.3 Managing Cookies</h3>
        <p>
          You can manage your cookie preferences via your browser settings. Please note that disabling cookies may affect some functionalities of our Services.
        </p>
      </section>

      {/* Section 6: Data Security */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          6. Data Security
        </h2>
        <p>
          We implement technical, administrative, and physical safeguards (such as encryption, firewalls, SSL, and access controls)
          to protect your Personal Information. However, no method of data transmission or storage is entirely secure.
        </p>
      </section>

      {/* Section 7: Data Retention */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          7. Data Retention
        </h2>
        <p>
          We retain your Personal Information only as long as necessary to fulfill the purposes outlined in this Privacy Policy,
          unless a longer retention period is required or permitted by law. We periodically review and securely dispose of data that is no longer needed.
        </p>
      </section>

      {/* Section 8: Your Rights and Choices */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          8. Your Rights and Choices
        </h2>
        <p>
          Depending on your location and applicable laws, you may have certain rights regarding your Personal Information, including:
        </p>
        <ul>
          <li>
            <strong>Access &amp; Correction:</strong> Request copies of your data or have inaccuracies corrected.
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your Personal Information, subject to certain limitations.
          </li>
          <li>
            <strong>Objection &amp; Restriction:</strong> Object to or restrict the processing of your Personal Information.
          </li>
          <li>
            <strong>Data Portability:</strong> Request that your information be transferred in a common format.
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us. We may need to verify your identity before processing your request.
        </p>
      </section>

      {/* Section 9: International Data Transfers */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          9. International Data Transfers
        </h2>
        <p>
          CineNiche operates globally and may transfer your Personal Information to countries outside of your home jurisdiction.
          We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
        </p>
      </section>

      {/* Section 10: Children's Privacy */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          10. Children's Privacy
        </h2>
        <p>
          Our Services are not directed to children under the age of 13, and we do not knowingly collect Personal Information from them.
          If we discover that such data has been inadvertently collected, we will promptly take steps to delete it.
        </p>
      </section>

      {/* Section 11: Changes to This Privacy Policy */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          11. Changes to This Privacy Policy
        </h2>
        <p>
          We regularly review and update this Privacy Policy. Any material changes will be posted on our website along with an updated “Last Updated” date.
          Continued use of our Services will signify your acceptance of the revised policy.
        </p>
      </section>

      {/* Section 12: Contact Us */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', color: '#22B8CF' }}>
          12. Contact Us
        </h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us using the information below:
        </p>
        <address>
          <strong>CineNiche Privacy Office</strong>
          <br />
          Email: <a href="mailto:privacy@cineniche.com" style={{ color: '#E85D75' }}>privacy@cineniche.com</a>
          <br />
          Address: [Insert Physical Address]
          <br /><br />
          For inquiries about your data protection rights, please contact our Data Protection Officer at{' '}
          <a href="mailto:dpo@cineniche.com" style={{ color: '#E85D75' }}>dpo@cineniche.com</a>.
        </address>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
