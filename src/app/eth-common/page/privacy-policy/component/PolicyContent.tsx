// tslint:disable:max-line-length
import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { LegalEntityNameBox } from "./LegalEntityNameBox";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";

const Bold = styled.span`
    font-weight: 600;
`;
const Section = styled.div`
    padding-right: 15%;
`;
const Paragraph = styled.p``;
const Head4 = styled.h4`
    font-weight: 600;
`;
const Table = styled.table`
    border: 1px solid ${({theme}) => theme.colors.privacyPolicyTableBorder};
    border-collapse: collapse;

    th, td {
        border: 1px solid ${({theme}) => theme.colors.privacyPolicyTableBorder};
        padding: 8px;
    }
`;

export class PolicyContent extends React.Component {
    render() {
        return <>
            <LayoutRow>
                <LayoutRowItem>
                    <Label>Privacy Policy</Label>
                    <LegalEntityNameBox>Consensys AG's Alethio</LegalEntityNameBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>Last updated</Label>
                    <ValueBox>11.2018</ValueBox>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label></Label>
                    <Section>
                        <Paragraph>
This privacy policy ("<Bold>Policy</Bold>") describes how ConsenSys AG’s Alethio
("<Bold>Alethio</Bold>", "<Bold>Company</Bold>", "<Bold>we</Bold>", "<Bold>our</Bold>",
or "<Bold>us</Bold>") collects, uses, shares and stores personal information of users of
this website, <a href="https://aleth.io/" target="_blank" rel="noopener noreferrer">https://aleth.io/</a>
(the "<Bold>Site</Bold>"). This Policy applies to the Site, applications, products and services
(collectively, "<Bold>Services</Bold>") on or in which it is posted, linked, or referenced.
                        </Paragraph>
                        <Paragraph>
Please note that this Policy does not apply to information collected through third-party
websites or services that you may access through the Services or that you submit to us
through email, text message or other electronic message or offline.
                        </Paragraph>
                        <Paragraph>
If you are visiting this site from the European Union (EU), see our Notice to EU
Data Subjects below for our legal bases for processing and transfer of your data.
                        </Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>What we collect</Label>
                    <Section>
                        <Paragraph>
We get information about you in a range of ways.
                        </Paragraph>
                        <Paragraph>
<Bold>Information You Give Us</Bold>. Information we may collect from you includes:
                        </Paragraph>
<ul>
    <li>
Contact information, such as your email address;
    </li>
    <li>
Feedback and correspondence, such as information you provide in order to report a problem with Service, receive customer support or otherwise correspond with us;
    </li>
    <li>
Technical information, such as your Ethereum wallet address;
    </li>
    <li>
Usage information, such as information about how you use the Service and interact with us;
    </li>
    <li>
Marketing information, such as your preferences for receiving marketing communications and details about how you engage with them.
    </li>
</ul>
                        <Paragraph>
<Bold>Information We Get From Others.</Bold> We may get information about you from other third party sources and we may add this to information we get from your use of the Services.
                        </Paragraph>
                        <Paragraph>
<Bold>Information Automatically Collected.</Bold> We may automatically record certain information about how you use our Site (we refer to this information as “Log Data“). Log Data may include information such as a user’s Internet Protocol (IP) address, device and browser type, operating system, the pages or features of our Site to which a user browsed and the time spent on those pages or features, the frequency with which the Site is used by a user, search terms, the links on our Site that a user clicked on or used, the last page you visited before entering our Site, your language preferences, your city and country location, and other statistics. We use this information to administer the Service and we analyze (and may engage third parties to analyze) this information to improve and enhance the Service by expanding its features and functionality and tailoring it to our users’ needs and preferences.
                        </Paragraph>
                        <Paragraph>
We may use cookies or similar technologies to analyze trends, administer the website, track users’ movements around the website, and to gather demographic information about our user base as a whole. Users can control the use of cookies at the individual browser level. For more information, please see the section entitled “Cookies Policy” below.
                        </Paragraph>
                        <Paragraph>
We also use Google Analytics to help us offer you an optimized user experience. You can find more information about Google Analytics' use of your personal data <a href="https://www.google.com/analytics/terms/us.html" target="_blank" rel="noopener noreferrer">here</a>.
                        </Paragraph>
                        <Paragraph>
<Bold>Information we will never collect.</Bold> We will never ask you to share your private keys or wallet seed. Never trust anyone or any site that asks you to enter your private keys or wallet seed.
                        </Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>Use of personal information</Label>
                    <Section>
<Head4>To provide our service</Head4>
<Paragraph>We will use your personal information in the following ways:</Paragraph>
<ul>
    <li>
We use your email address to verify your identity when you access and use our Services and to identify which nodes are related to you.
    </li><li>
To identify, establish and maintain our relationship with you.
    </li><li>
To enable you to access and use the Services.
    </li><li>
To provide and deliver products and services that you may request.
    </li><li>
To send information, including confirmations, technical notices, updates, security alerts, and support and administrative messages.
    </li>
</ul>
<Head4>To comply with law</Head4>
<Paragraph>
We use your personal information as we believe necessary or appropriate to comply with applicable laws, lawful requests and legal process, such as to respond to subpoenas or requests from government authorities.
</Paragraph>
<Head4>To communicate with you</Head4>
<Paragraph>
We use your personal information to communicate about promotions, upcoming events, and other news about products and services offered by us.
</Paragraph>
<Head4>To optimize our platform</Head4>
<Paragraph>
In order to optimize your user experience, we may use your personal information to operate, maintain, and improve our Services. We may also use your information to respond to your comments and questions regarding the Services, and to provide you and other users with general customer service.
</Paragraph>
<Head4>With your consent</Head4>
<Paragraph>
We may use or share your personal information with your consent, such as when you consent to let us post your testimonials or endorsements on our Site, you instruct us to take a specific action with respect to your personal information, or you opt into third party marketing communications.
</Paragraph>
<Head4>For compliance, fraud prevention, and safety</Head4>
<Paragraph>
We may use your personal information to protect, investigate, and deter against fraudulent, unauthorized, or illegal activity.
</Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>Sharing of personal information</Label>
                    <Section>
<Paragraph>
We do not share or sell the personal information that you provide us with other organizations without your express consent, except as described in this Privacy Policy. We disclose personal information to third parties under the following circumstances:
</Paragraph>
<ul>
    <li>
<Bold>Affiliates.</Bold> We may disclose your personal information to our subsidiaries and corporate affiliates for purposes consistent with this Privacy Policy.
    </li>
    <li>
<Bold>Business Transfers.</Bold> We may share personal information when we do a business deal, or negotiate a business deal, involving the sale or transfer of all or a part of our business or assets. These deals can include any merger, financing, acquisition, or bankruptcy transaction or proceeding.
    </li>
    <li>
<Bold>Compliance with Laws and Law Enforcement; Protection and Safety.</Bold> We may share personal information for legal, protection, and safety purposes.
        <ul>
            <li>
We may share information to comply with laws.
            </li>
            <li>
We may share information to respond to lawful request sand legal processes.
            </li>
            <li>
We may share information to protect the rights and property of the Company, ouragents, customers, and others. This includes enforcing our agreements, policies, and terms of use.
            </li>
            <li>
We may share information in an emergency. This includes protecting the safety of our employees and agents, our customers, or any person.
            </li>
        </ul>
    </li>
    <li>
<Bold>Professional Advisors and Service Providers.</Bold> We may share information with those who need it to do work for us. These recipients may include third party companies and individuals to administer and provide the Service on our behalf (such as customer support, hosting, email delivery and database management services), as well as lawyers, bankers, auditors, and insurers.
    </li>
    <li>
<Bold>Other.</Bold> You may permit us to share your personal information with other companies or entities of your choosing. Those uses will be subject to the privacy policies of the recipient entity or entities.
    </li>
</ul>
We may also share aggregated and/or anonymized data with others for their own uses.
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>International transfer</Label>
                    <Section>
<Paragraph>
The Company has offices outside of the EU and has affiliates and service providers in the United States and in other countries. Your personal information may be transferred to or from the United States or other locations outside of your state, province, country or other governmental jurisdiction where privacy laws may not be as protective as those in your jurisdiction.
</Paragraph>
<Paragraph>
EU users should read the important information provided below about transfer of personal information outside of the European Economic Area (EEA).
</Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>How information is secured</Label>
                    <Section>
<Paragraph>
We retain personal information we collect as long as it is necessary and relevant to fulfill the purposes outlined in this privacy policy. In addition, we retain personal information to comply with applicable law where required, prevent fraud, resolve disputes, troubleshoot problems, assist with any investigation, and other actions permitted by law. To determine the appropriate retention period for personal information, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure of your personal information, the purposes for which we process your personal information and whether we can achieve those purposes through other means, and the applicable legal requirements.
</Paragraph>
<Paragraph>
In some circumstances we may anonymize your personal information (so that it can no longer be associated with you) in which case we may use this information indefinitely without further notice to you.
</Paragraph>
<Paragraph>
We employ industry standard security measures designed to protect the security of all information submitted through the Services. However, the security of information transmitted through the internet can never be guaranteed. We are not responsible for any interception or interruption of any communications through the internet or for changes to or losses of data. Users of the Services are responsible for maintaining the security of any password, biometrics, user ID or other form of authentication involved in obtaining access to password protected or secure areas of any of our digital services. In order to protect you and your data, we may suspend your use of any of the Services, without notice, pending an investigation, if any breach of security is suspected.
</Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>INFORMATION CHOICES AND CHANGES</Label>
                    <Section>
<Head4>Accessing, Updating, Correcting, and Deleting your Information</Head4>
<Paragraph>
You may access information that you have voluntarily provided through your account on the Services, and to review, correct, or delete it by sending a request to privacy@aleth.io. You can request to change contact choices, opt-out of our sharing with others, and update your personal information and preferences.
</Paragraph>
<Head4>Tracking Technologies Generally</Head4>
<Paragraph>
Regular cookies may generally be disabled or removed by tools available as part of most commercial browsers, and in some instances blocked in the future by selecting certain settings. For more information, please see the section entitled "Cookies Policy" below.
</Paragraph>
<Head4>Google Analytics</Head4>
<Paragraph>
You may exercise choices regarding the use of cookies from Google Analytics by going to <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a> and downloading the Google Analytics Opt-out Browser Add-on.
</Paragraph>
<Paragraph>
<Bold>Contact information.</Bold> We welcome your comments or questions about this Policy, and you may contact us at: privacy@aleth.io.
</Paragraph>
<Paragraph>
<Bold>Changes to this privacy policy.</Bold> We may change this privacy policy at any time. We encourage you to periodically review this page for the latest information on our privacy practices. If we make any changes, we will change the Last Updated date above.
</Paragraph>
<Paragraph>
Any modifications to this Privacy Policy will be effective upon our posting of the new terms and/or upon implementation of the changes to the Site (or as otherwise indicated at the time of posting).
</Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>Eligibility</Label>
                    <Section>
<Paragraph>
Our Services are intended for general audiences over the age of 13 years old (or over the age of 16 if you are resident in the EEA). We do not knowingly collect information from children under the age of 13 years old, or 16 in the EEA. Consistent with the requirements of the Children's Online Privacy Protection Act (COPPA), if we learn that we have received any information directly from a child under age 13 without first receiving his or her parent's verified consent, we will use that information only to respond directly to that child (or his or her parent or legal guardian) to inform the child that he or she cannot use the Site and subsequently we will delete that information.
</Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>NOTICE TO CALIFORNIA RESIDENTS</Label>
                    <Section>
<Paragraph>
Under California Civil Code Section 1789.3, California users are entitled to the following consumer rights notice: California residents may reach the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by mail at 1625 North Market Blvd., Sacramento, CA 95834, or by telephone at (916) 445-1254 or (800) 952-5210.
</Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label>NOTICE TO EU DATA SUBJECTS</Label>
                    <Section>
<Head4>Personal Information</Head4>
<Paragraph>
With respect to EU data subjects, "personal information," as used in this Privacy Policy, is equivalent to "personal data" as defined in the <a href="https://gdpr-info.eu/art-4-gdpr/" target="_blank" rel="noopener noreferrer">European Union General Data Protection Regulation</a> (GDPR).
</Paragraph>
<Head4>Sensitive Data</Head4>
<Paragraph>
Some of the information you provide us may constitute sensitive data as defined in the GDPR (also referred to as special categories of personal data).
</Paragraph>
<Head4>Legal Bases for Processing</Head4>
<Paragraph>
We only use your personal information as permitted by law. We are required to inform you of the legal bases of our processing of your personal information, which are described in the table below. If you have questions about the legal bases under which we process your personal information, contact us at privacy@aleth.io.
</Paragraph>
<Table>
    <thead>
        <tr>
            <th style={{width: "50%"}}>Processing Purpose</th>
            <th style={{width: "50%"}}>Legal basis</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <Paragraph>To communicate with you</Paragraph>
                <Paragraph>To optimize our platform</Paragraph>
                <Paragraph>For compliance, fraud prevention, and safety</Paragraph>
                <Paragraph>To provide our service</Paragraph>
            </td>
            <td>
                <Paragraph>
These processing activities constitute our legitimate interests. We make sure we consider and balance any potential impacts on you (both positive and negative) and your rights before we process your personal information for our legitimate interests. We do not use your personal information for activities where our interests are overridden by any adverse impact on you (unless we have your consent or are otherwise required or permitted to by law).
                </Paragraph>
            </td>
        </tr>
        <tr>
            <td>
                <Paragraph>To comply with law</Paragraph>
            </td>
            <td>
                <Paragraph>We use your personal information to comply with applicable laws and our legal obligations.</Paragraph>
            </td>
        </tr>
        <tr>
            <td>
                <Paragraph>With your consent</Paragraph>
            </td>
            <td>
                <Paragraph>Where our use of your personal information is based upon your consent, you have the right to withdraw it anytime in the manner indicated in the Service or by contacting us at privacy@aleth.io.</Paragraph>
            </td>
        </tr>
    </tbody>
</Table>
<Head4>Use for New Purposes</Head4>
<Paragraph>
We may use your personal information for reasons not described in this Privacy Policy, where we are permitted by law to do so and where the reason is compatible with the purpose for which we collected it. If we need to use your personal information for an unrelated purpose, we will notify you and explain the applicable legal basis for that use. If we have relied upon your consent for a particular use of your personal information, we will seek your consent for any unrelated purpose.
</Paragraph>
<Head4>Your rights</Head4>
<Paragraph>
Under the GDPR, you have certain rights regarding your personal information. You may ask us to take the following actions in relation to your personal information that we hold:
</Paragraph>
<ul>
<li><Bold>Opt-out.</Bold> Stop sending you direct marketing communications which you have previously consented to receive. We may continue to send you Service-related and other non-marketing communications.</li>
<li><Bold>Access.</Bold> Provide you with information about our processing of your personal information and give you access to your personal information.</li>
<li><Bold>Correct.</Bold> Update or correct inaccuracies in your personal information.</li>
<li><Bold>Delete.</Bold> Delete your personal information.</li>
<li><Bold>Transfer.</Bold> Transfer a machine-readable copy of your personal information to you or a third party of your choice.</li>
<li><Bold>Restrict.</Bold> Restrict the processing of your personal information.</li>
<li><Bold>Object.</Bold> Object to our reliance on our legitimate interests as the basis of our processing of your personal information that impacts your rights.</li>
</ul>
<Paragraph>
You can submit these requests by email to privacy@aleth.io. We may request specific information from you to help us confirm your identity and process your request. Applicable law may require or permit us to decline your request. If we decline your request, we will tell you why, subject to legal restrictions. If you would like to submit a complaint about our use of your personal information or response to your requests regarding your personal information, you may contact us at privacy@aleth.io or submit a complaint to the data protection regulator in your jurisdiction. You can find your data protection regulator <a href="http://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm" target="_blank" rel="noopener noreferrer">here</a>.
</Paragraph>
<Head4>Cross-Border data transfer</Head4>
<Paragraph>
Please be aware that your personal data will be transferred to, processed, and stored in the United States. Data protection laws in the U.S. may be different from those in your country of residence. Whenever we transfer your personal information out of the EEA to the U.S. or countries not deemed by the European Commission to provide an adequate level of personal information protection, the transfer will be based on a data transfer mechanism recognized by the European Commission as providing adequate protection for personal information.
</Paragraph>
<Paragraph>
Please contact us if you want further information on the specific mechanism used by us when transferring your personal information out of the EEA.
</Paragraph>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem autoHeight fullRow>
                    <Label><a id="cookies">COOKIES POLICY</a></Label>
                    <Section>
<Paragraph>
We understand that your privacy is important to you and are committed to being transparent about the technologies we use. In the spirit of transparency, this policy provides detailed information about how and when we use cookies on our Site.
</Paragraph>
<Head4>Do we use Cookies?</Head4>
<Paragraph>
Yes. We and our marketing partners, affiliates, and analytics or service providers use cookies, web beacons, or pixels and other technologies to ensure everyone who uses the Site has the best possible experience.
</Paragraph>
<Head4>What is a Cookie?</Head4>
<Paragraph>
A cookie ("Cookie") is a small text file that is placed on your hard drive by a web page server. Cookies contain information that can later be read by a web server in the domain that issued the cookie to you. Some of the cookies will only be used if you use certain features or select certain preferences, and some cookies will always be used. You can find out more about each cookie by viewing our current cookie list below. We update this list periodically, so there may be additional cookies that are not yet listed. Web beacons, tags and scripts may be used in the Site or in emails to help us to deliver cookies, count visits, understand usage and campaign effectiveness and determine whether an email has been opened and acted upon. We may receive reports based on the use of these technologies by our service/analytics providers on an individual and aggregated basis.
</Paragraph>
<Head4>Why do we use Cookies?</Head4>
<Paragraph>
We generally use Cookies for the following purposes:
</Paragraph>
<ul>
    <li>To recognize new or past customers.</li>
    <li>To store your password if you are registered on our Site.</li>
    <li>To improve our Site and to better understand your visits on our platforms and Site.</li>
    <li>To serve you with interest-based or targeted advertising.</li>
    <li>To observe your behaviors and browsing activities over time across multiple websites or other platforms.</li>
    <li>To better understand the interests of our customers and our website visitors.</li>
</ul>
<Paragraph>
Some Cookies are necessary for certain uses of the Site, and without such Cookies, we would not be able to provide many services that you need to properly use the Site. These Cookies, for example, allow us to operate our Site so you may access it as you have requested and let us recognize that you have created an account and have logged into that account to access Site content. They also include Cookies that enable us to remember your previous actions within the same browsing session and secure our Sites.
</Paragraph>
<Paragraph>
We also use functional Cookies and Cookies from third parties for analysis and marketing purposes. Functional Cookies enable certain parts of the site to work properly and your user preferences to remain known. Analysis Cookies, among other things, collect information on how visitors use our Site, the content and products that users view most frequently, and the effectiveness of our third party advertising. Advertising Cookies assist in delivering ads to relevant audiences and having our ads appear at the top of search results. Cookies are either “session” Cookies which are deleted when you end your browser session, or “persistent,” which remain until their deletion by you (discussed below) or the party who served the cookie. Full details on all of the Cookies used on the Site are available at our Cookie Disclosure table below.
</Paragraph>
<Head4>How to disable Cookies</Head4>
<Paragraph>
You can generally activate or later deactivate the use of cookies through a functionality built into your web browser. To learn more about how to control cookie settings through your browser:
</Paragraph>
<Paragraph>
Click <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">here</a> to learn more about the “Private Browsing” setting and managing cookie settings in Firefox;
</Paragraph>
<Paragraph>
Click <a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener noreferrer">here</a> to learn more about “Incognito” and managing cookie settings in Chrome;
</Paragraph>
<Paragraph>
Click <a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">here</a> to learn more about “InPrivate” and managing cookie settings in Internet Explorer;
</Paragraph>
<Paragraph>
Click <a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer">here</a> to learn more about “Private Browsing” and managing cookie settings in Safari.
</Paragraph>
<Paragraph>
If you want to learn more about cookies, or how to control, disable or delete them, please visit <a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">http://www.aboutcookies.org</a> for detailed guidance. In addition, certain third party advertising networks, including Google, permit users to opt out of or customize preferences associated with your internet browsing. To learn more about this feature from Google, click <a href="https://adssettings.google.com/u/0/authenticated?hl=en" target="_blank" rel="noopener noreferrer">here</a>.
</Paragraph>
<Paragraph>
To control flash cookies, which we may use on our Site from time to time, you can go to this <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_blank" rel="noopener noreferrer">link</a> because Flash cookies cannot be controlled through your browser settings. Please note that if you decline the use of Cookies, some functions of the website may be unavailable and we will not be able to present personally tailored content and advertisements to you.
</Paragraph>
<Paragraph>
We may link the information collected by Cookies with other information we collect from you pursuant to this Privacy Policy and use the combined information as set forth herein. Similarly, the third parties who serve cookies on our Site may link your name or email address to other information they collect, which may include past purchases made offline or online, or your online usage information. If you are located in the European Economic Area, you have certain rights that are described above under the header "Notice to EU Data Subjects", including the right to inspect and correct or delete the data that we have about you.
</Paragraph>
<Head4>Cookies Disclosure</Head4>
<Table>
    <thead>
        <tr>
            <td>Name of Cookie/Identifier</td>
            <td>What does the cookie generally do (e.g., website function and administration, analytics, marketing)?</td>
            <td>Is it a 1st or 3rd party cookie and what is the name of the party providing it?</td>
            <td>What type of cookie is it (persistent or session)?</td>
            <td>What is the duration of the cookie on the website (if not cleared by the user)?</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Google Analytics (_ga)</td>
            <td>Analytics</td>
            <td>3rd - Google</td>
            <td>Persistent</td>
            <td>[2 years]</td>
        </tr>
        <tr>
            <td>(_gid)</td>
            <td>Analytics</td>
            <td>3rd - Google</td>
            <td>Persistent</td>
            <td>[1 day]</td>
        </tr>
    </tbody>
</Table>
                    </Section>
                </LayoutRowItem>
            </LayoutRow>
        </>;
    }
}
