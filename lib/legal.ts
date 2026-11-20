// Legal copy adapted from photobooth.dotworld.tech (terms-of-service, privacy-policy) for FunFoto:
// the product name and website changed; spacing typos were corrected. Otherwise the published wording.
export type LegalBlock={heading?:string;sub?:boolean;paras?:string[];items?:string[]};
export type LegalDoc={title:string;intro:string[];blocks:LegalBlock[]};

import {contactEmail} from './site';
const email=contactEmail;
export const legalEmail=email;

export const terms:LegalDoc={
 title:'Terms and Conditions',
 intro:[
  'When we say “Company”, “we”, “our”, or “us” in this document, we are referring to Dotworld Technologies Private Limited, a company registered in India.',
  'When we say “Services”, we mean the FunFoto application, the website at funfoto.dotworld.in, and any related products created and maintained by Dotworld Technologies Private Limited.',
  'When we say “You” or “your”, we are referring to individuals who use the FunFoto kiosk or application to capture and purchase photos.',
  'We may update these Terms and Conditions in the future. Whenever we make a significant change, we will refresh the date at the top of this page and take appropriate steps to notify account holders.',
  'When you use our Services, now or in the future, you are agreeing to the latest Terms and Conditions. These terms contain a limitation of our liability.',
 ],
 blocks:[
  {heading:'Account Terms',items:[
   'You are responsible for any activity that occurs under your session at the FunFoto kiosk.',
   'You must be a human. Automated or bot-based interactions are not permitted.',
   'You must be at least 18 years of age, or have the consent of a parent or guardian, to make a purchase.',
   'You may not use the Services for any unlawful, unethical, or immoral purpose.',
  ]},
  {heading:'Payment and Pricing',items:[
   'Users select a layout at the kiosk. Each layout is a pre-designed template containing a defined number of photo slots arranged in a specific design.',
   'Each layout is priced based on its design and the number of photo slots it contains. The price is displayed clearly at the kiosk before you confirm your selection.',
   'Once a layout is selected and photos are taken, users may purchase additional print copies of the same completed layout. Each additional print copy is charged at the applicable per-print rate displayed at the time of purchase.',
   'All fees are exclusive of applicable taxes including GST as required under Indian law. Where required, we will collect those taxes on behalf of the taxing authority and remit them accordingly.',
   'Payment is collected at the point of use via our integrated payment gateway.',
  ]},
  {heading:'Refunds and Disputes',items:[
   'All purchases are non-refundable once the layout has been selected, photos have been captured, and payment has been processed. This applies to both layout purchases and additional print copy purchases.',
   `If you believe a charge was made in error, please contact us at ${email} within 7 days of the transaction. We will investigate and respond within 5 business days.`,
   'Please contact us before initiating a charge back with your bank.',
  ]},
  {heading:'Photo Content and Ownership',items:[
   'You retain ownership of the photos taken of you at the FunFoto kiosk.',
   'By using the Services, you consent to your image being captured, processed, and temporarily stored for the purpose of delivering your purchased layout and print copies.',
   'You agree not to use photos taken through our Services for any illegal, defamatory, or harmful purpose.',
   'We do not use your photos for advertising, marketing, or AI training purposes without your explicit consent.',
   'All photos, completed layouts, and associated session data are automatically and permanently deleted from our systems after 3 days from the date of capture, with no exceptions.',
  ]},
  {heading:'Data Retention Policy',items:[
   'Photos, completed layouts, and associated session data are retained for a maximum of 3 days from the date of capture.',
   'After 3 days, all photos, layouts, and session data are permanently and automatically deleted from our active systems and backups.',
   'No manual retrieval is possible after deletion. We strongly encourage you to download your photos and layouts promptly.',
   'We do not archive, resell, or transfer your photos or layouts to any third party after the 3-day period.',
   'Billing and transaction records may be retained longer as required under Indian tax and accounting laws, including GST regulations.',
  ]},
  {heading:'Uptime and Security',items:[
   'Your use of the Services is at your sole risk. We provide these Services on an “as is” and “as available” basis.',
   'We take many measures to protect and secure your data through backups, redundancies, and encryption. We enforce encryption for data transmission over the public Internet.',
   'We use Amazon Web Services (AWS) and Digital Ocean as our cloud infrastructure provider. Data may be hosted in India or in other AWS regions globally. By using our Services, you consent to this.',
   'We use third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Services.',
  ]},
  {heading:'Copyright and Content Ownership',items:[
   'All content posted on the Services must comply with applicable Indian copyright law and the Copyright Act, 1957.',
   'We claim no intellectual property rights over the photos you capture using our Services. All photos remain yours.',
   'The names, look, and feel of the Services are copyright to the Company. All rights reserved. You may not duplicate, copy, or reuse any portion of the HTML, CSS, JavaScript, or visual design elements without express written permission from the Company.',
   'You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services without express written permission from the Company.',
  ]},
  {heading:'Features and Bugs',paras:[
   'We design our Services with care, based on our own experience and the experiences of customers who share their time and feedback. We make no guarantees that our Services will meet your specific requirements or expectations.',
   'We test all of our features before releasing them. As with any software, our Services may have some bugs. We track reported bugs and work through them, especially those related to security or privacy.',
  ]},
  {heading:'Governing Law and Disputes',paras:[
   'These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts located in India.',
   `For any consumer grievances, you may contact our Grievance Officer as required under the Information Technology Act, 2000 and applicable Indian regulations at ${email}.`,
  ]},
  {heading:'Liability',paras:[
   'You expressly understand and agree that the Company shall not be liable, in law or in equity, to you or to any third party for any direct, indirect, incidental, lost profits, special, consequential, punitive or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data or other intangible losses (even if the Company has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the Services; (ii) unauthorized access to or alteration of your transmissions or data; (iii) loss of photos or layouts due to technical failure; (iv) any deletion of data after the 3-day retention period; (v) statements or conduct of any third party on the service; or (vi) any other matter relating to these Terms and Conditions or the Services, whether as a breach of contract, tort (including negligence whether active or passive), or any other theory of liability.',
   `If you have questions about any of these Terms and Conditions, please contact us at ${email}.`,
  ]},
 ],
};

export const privacy:LegalDoc={
 title:'Privacy Policy',
 intro:[
  'The privacy of your data — and it is your data, not ours — is a big deal to us. In this policy, we lay out: what data we collect and why; how your data is handled; and your rights with respect to your data. We do not sell your data: never have, never will.',
  'This policy applies to FunFoto, the website at funfoto.dotworld.in, and all other products built and maintained by Dotworld Technologies Private Limited.',
 ],
 blocks:[
  {heading:'What We Collect and Why',paras:['Our guiding principle is to collect only what we need. Here’s what that means in practice:']},
  {heading:'Identity and Access',sub:true,paras:['When you use the FunFoto kiosk, we may collect basic identifying information such as your name, email address, or phone number if you choose to provide it for the purpose of receiving or downloading your photos digitally. This information is used solely to deliver the service.']},
  {heading:'Photos and Images',sub:true,paras:['When you use the FunFoto kiosk, we capture your photograph(s) as the core function of our service. These photos are processed and stored temporarily to allow you to receive your purchased layout and print copies. All photos and associated data are permanently and automatically deleted after 3 days from the date of capture.']},
  {heading:'Billing Information',sub:true,paras:['When you make a payment, your transaction is processed directly through our third-party payment gateway. We do not store your card details on our servers. We retain only billing metadata such as transaction ID, amount, and date for accounting and dispute resolution purposes as required under Indian law.']},
  {heading:'Session Data',sub:true,paras:['We collect basic session information such as the date, time, kiosk location, number of photos taken, layout selected, and transaction details. This is used for operational and accounting purposes only.']},
  {heading:'Website and Kiosk Interactions',sub:true,paras:['We collect information about your interactions with the kiosk and any associated web interface for analytics and statistical purposes. This includes device information, session duration, and error logs to help us maintain and improve the service.']},
  {heading:'Anti-Bot Assessments',sub:true,paras:['We use CAPTCHA services across our applications to mitigate brute force attempts and as a means of spam protection.']},
  {heading:'Cookies',sub:true,paras:['Where applicable on our web interface, we use persistent first-party cookies and some third-party cookies to store certain preferences and support analytics. You can adjust cookie settings in your browser, although some aspects of our service may not function properly if cookies are disabled.']},
  {heading:'Voluntary Correspondence',sub:true,paras:['When you contact us with a question or to ask for help, we keep that correspondence, including your email address, so that we have a history of past correspondence to reference if you reach out in the future.']},
  {heading:'When We Access or Share Your Information'},
  {heading:'To Provide the Service',sub:true,paras:['We use third-party subprocessors to help run our applications and provide the Services to you. This includes Amazon Web Services (AWS) and Digital Ocean for cloud hosting and storage, and a payment gateway provider for processing transactions. These subprocessors are contractually obligated to handle your data securely and only for the purposes of providing services to us.']},
  {heading:'Payment Processing',sub:true,paras:['We use a third-party payment gateway to process transactions. Your payment card details are handled entirely by the payment processor under their own security standards and privacy policy. We do not store card details on our servers.']},
  {heading:'To Investigate Abuse',sub:true,paras:['Accessing a customer’s session data when investigating potential abuse is a measure of last resort. We want to protect the privacy and safety of both our customers and the people reporting issues to us. If we discover the Services are being used for a restricted purpose, we will take action as necessary, including notifying appropriate authorities where warranted.']},
  {heading:'Aggregated and De-identified Data',sub:true,paras:['We may aggregate and de-identify information collected through the Services. We may use de-identified or aggregated data for operational or analytical purposes.']},
  {heading:'When Required by Law',sub:true,paras:['Dotworld Technologies Private Limited is an India-registered company. Our policy is to not respond to government requests for user data unless we are compelled by legal process. We will comply with requests from Indian law enforcement authorities when presented with a valid court order, warrant, or legal notice under applicable Indian law, including the Information Technology Act, 2000. It is our policy to notify affected users before we share data unless we are legally prohibited from doing so, or in emergency cases.']},
  {heading:'Your Rights With Respect to Your Information',paras:['We strive to apply the same data rights to all customers. These rights include:']},
  {heading:'Right to Know',sub:true,paras:['You have the right to know what personal information is collected, used, and shared.']},
  {heading:'Right of Access',sub:true,paras:['You may request access to your personal information during the retention period.']},
  {heading:'Right to Correction',sub:true,paras:['You have the right to request correction of inaccurate personal data.']},
  {heading:'Right to Erasure',sub:true,paras:[`You may request early deletion of your photos and session data before the 3-day auto-delete. Contact us at ${email}.`]},
  {heading:'Right to Restrict Processing',sub:true,paras:['You have the right to request restriction of how and why your personal information is used.']},
  {heading:'Right to Object',sub:true,paras:['You have the right, in certain situations, to object to how your personal information is processed.']},
  {heading:'Right to Non-Discrimination',sub:true,paras:['We will not treat you differently or provide a lower level of service because you have exercised your data privacy rights.']},
  {heading:'Right to Complain',sub:true,paras:['You have the right to make a complaint regarding our handling of your personal information with the appropriate supervisory authority under Indian law.',`To exercise any of these rights, please contact us at ${email}.`]},
  {heading:'How We Secure Your Data',items:[
   'All data is encrypted via SSL/TLS when transmitted from our servers to your browser or device.',
   'Photos and session data are stored with encryption at rest on AWS infrastructure.',
   'Access to customer data is restricted to authorized personnel on a need-to-know basis.',
   'We perform regular security assessments of our infrastructure.',
   'We use AWS infrastructure which may host data in India or other global AWS regions. By using our Services, you acknowledge and consent to this cross-border data processing.',
  ]},
  {heading:'Data Retention — 3-Day Auto-Delete Policy',items:[
   'Photos, completed layouts, and session data are retained for a maximum of 3 days from the date of capture.',
   'After 3 days, all such data is automatically and permanently deleted from our active systems and AWS and Digital Ocean backups.',
   'We do not archive photos beyond the 3-day window under any circumstances.',
   'We strongly encourage you to download your photos promptly as no retrieval is possible after deletion.',
   'Billing and transaction records may be retained longer as required by Indian tax and accounting laws, including GST regulations (typically 7 years).',
  ]},
  {heading:'Location of Site and Data',paras:['Our Services are hosted on Amazon Web Services (AWS) and Digital Ocean. Your data may be stored and processed in data centers operated by AWS and Digital Ocean, located in India or other regions globally. By using our Services and providing your personal information, you consent to the storage, transfer, and processing of your data in these locations.']},
  {heading:'Children’s Privacy',paras:[`FunFoto Services are not directed at children under the age of 13. We do not knowingly capture or store photos of unaccompanied minors. If you believe a minor’s data has been collected without parental consent, please contact us immediately at ${email}.`]},
  {heading:'Changes and Questions',paras:[
   'We may update this policy as needed to comply with relevant regulations and reflect any new practices. Whenever we make a significant change, we will refresh the date at the top of this page.',
   `Have any questions, comments, or concerns about this privacy policy, your data, or your rights? Please get in touch by emailing us at ${email} and we will be happy to assist.`,
   `Grievance Officer (as required under the Information Technology Act, 2000): ${email}`,
  ]},
 ],
};
