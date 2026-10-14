'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
} from '@mui/material';
import { Gavel, CheckCircle } from '@mui/icons-material';
import Header from '@/components/Header';

export default function TermsOfService() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Gavel sx={{ fontSize: 50 }} />
              </Box>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Terms of Service
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.95,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Please read these terms carefully before using our services.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="md">
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 2,
              p: { xs: 3, md: 6 },
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontStyle: 'italic' }}>
              Last Updated: November 2025
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              Introduction
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Welcome to Ethio Entrance, Freshman Tricks (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern
              your access to and use of our mobile application, website, and services (collectively, the &quot;Services&quot;).
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms,
              please do not use our Services.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              By creating an account, downloading our app, or using any of our Services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms, as well as our Privacy Policy.
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              These Terms apply to all users of the Services, including but not limited to students, educators, parents,
              and visitors.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              2. Eligibility
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              To use our Services, you must:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Be at least <strong>13 years of age</strong></Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Have the legal capacity to enter into a binding agreement</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Not be prohibited from using the Services under applicable laws</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Provide accurate and complete information during registration</Typography></li>
            </Box>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              If you are under 18, you confirm that you have obtained parental or guardian consent to use our Services.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              3. Account Registration and Security
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Account Creation
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You must create an account to access certain features of our Services</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You agree to provide accurate, current, and complete information</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You are responsible for maintaining the confidentiality of your account credentials</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You must notify us immediately of any unauthorized access to your account</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Account Responsibility
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You are solely responsible for all activities that occur under your account</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We are not liable for any loss or damage arising from your failure to maintain account security</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You may not share your account with others or allow others to access your account</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Each user must maintain their own individual account</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              4. Use of Services
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Permitted Use
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              You may use our Services for:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Personal, non-commercial educational purposes</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Accessing practice exams and study materials</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Tracking your academic progress and performance</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Participating in leaderboards and community features</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Prohibited Activities
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              You agree <strong>NOT</strong> to:
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Violate any applicable laws, regulations, or third-party rights</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Copy, modify, distribute, or create derivative works from our content</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Use automated systems (bots, scrapers) to access the Services</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Share, sell, or distribute exam questions or study materials</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Attempt to gain unauthorized access to our systems or networks</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Reverse engineer, decompile, or disassemble any part of the Services</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Upload viruses, malware, or any malicious code</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Harass, abuse, or harm other users</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Impersonate any person or entity</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Use the Services for any commercial purpose without our written permission</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              5. Intellectual Property Rights
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Our Content
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>All content, materials, and intellectual property on our Services are owned by us or our licensors</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>This includes but is not limited to: exam questions, study materials, text, graphics, logos, images, videos, and software</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>All content is protected by copyright, trademark, and other intellectual property laws</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You may not use, reproduce, or distribute our content without explicit written permission</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Limited License
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services
              for personal educational purposes only. This license does not include any right to:
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Resell or make commercial use of the Services</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Download or copy content for redistribution</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Use data mining, robots, or similar data gathering tools</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              6. Subscriptions and Payments
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Subscription Plans
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Certain features may require a paid subscription</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Subscription fees are clearly displayed before purchase</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>All fees are in the local currency and include applicable taxes</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Subscriptions automatically renew unless cancelled before the renewal date</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Payment Terms
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You agree to provide current, complete, and accurate payment information</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You authorize us to charge your payment method for all fees incurred</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We reserve the right to change subscription prices with 30 days notice</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Price changes will not affect existing subscriptions until renewal</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Refunds
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Refund requests must be submitted within 7 days of purchase</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Refunds are provided at our sole discretion</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Partial refunds for unused portions of subscriptions are not provided</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Contact support@entrancetricks.com for refund requests</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              7. User Content and Conduct
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              User-Generated Content
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              If you submit, upload, or share any content (profile pictures, comments, etc.):
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You retain ownership of your content</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You grant us a license to use, display, and distribute your content within the Services</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You represent that you have all necessary rights to the content</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Your content must not violate any laws or infringe on third-party rights</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Content Moderation
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We reserve the right to remove any content that violates these Terms</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We are not responsible for user-generated content</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We may, but are not obligated to, monitor or review user content</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              8. Privacy and Data Protection
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Your privacy is important to us. Our Privacy Policy explains:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>What information we collect</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>How we use and protect your data</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Your rights regarding your personal information</Typography></li>
            </Box>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              By using our Services, you agree to our collection and use of information as described in our Privacy Policy.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              9. Disclaimers and Limitations of Liability
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Service Availability
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We provide the Services on an &quot;as is&quot; and &quot;as available&quot; basis</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We do not guarantee uninterrupted, secure, or error-free operation</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We may modify, suspend, or discontinue any part of the Services at any time</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We are not responsible for delays or failures due to circumstances beyond our control</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Educational Content
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We strive to provide accurate and up-to-date educational content</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We do not guarantee specific academic outcomes or exam results</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Content is for practice and preparation purposes only</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We are not affiliated with official examination boards unless explicitly stated</Typography></li>
            </Box>

            <Box
              sx={{
                backgroundColor: '#fef3c7',
                border: '1px solid #fbbf24',
                borderRadius: 2,
                p: 3,
                mb: 5,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Limitation of Liability
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, including but not limited to:
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Loss of data or profits</Typography></li>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Business interruption</Typography></li>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Academic performance or exam results</Typography></li>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Errors or omissions in content</Typography></li>
              </Box>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              10. Indemnification
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              You agree to indemnify, defend, and hold harmless Ethio Entrance, Freshman Tricks, its affiliates, officers,
              directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including
              legal fees) arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              11. Termination
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Termination by You
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You may delete your account at any time through the app settings</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Upon deletion, your access to the Services will immediately cease</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Your data will be deleted within 30 days as described in our Privacy Policy</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Termination by Us
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              We reserve the right to suspend or terminate your account if:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You violate these Terms</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Your account is used for fraudulent or illegal activities</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We suspect unauthorized or improper use</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We discontinue the Services</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Effect of Termination
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Upon termination, your right to use the Services immediately ceases</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We are not obligated to provide refunds for unused subscription periods</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Provisions of these Terms that should survive termination will remain in effect</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              12. Modifications to Terms
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              We reserve the right to modify these Terms at any time. When we do:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We will update the &quot;Last Updated&quot; date at the top of this page</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We will notify you through the app or via email for significant changes</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Continued use of the Services constitutes acceptance of the modified Terms</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>If you disagree with the changes, you should stop using the Services and delete your account</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              13. Governing Law and Dispute Resolution
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Governing Law
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              These Terms are governed by and construed in accordance with the laws of Ethiopia, without regard to
              conflict of law principles.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Dispute Resolution
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Any disputes arising from these Terms or use of the Services shall first be resolved through good faith negotiation</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>If negotiation fails, disputes shall be resolved through arbitration or the courts of Ethiopia</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>You agree to submit to the personal jurisdiction of such courts</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              14. Miscellaneous
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Entire Agreement
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding
              the use of the Services.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Severability
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will
              continue in full force and effect.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Waiver
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Our failure to enforce any provision of these Terms shall not be construed as a waiver of that provision
              or any other provision.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Assignment
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              You may not assign or transfer your rights under these Terms without our prior written consent. We may
              assign our rights and obligations under these Terms without restriction.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              15. Contact Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              If you have any questions about these Terms, please contact us:
            </Typography>

            <Box sx={{ mb: 5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Email:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                <a href="mailto:support@entrancetricks.com" style={{ color: '#667eea' }}>support@entrancetricks.com</a>
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Website:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                <a href="https://entrancetricks.com" style={{ color: '#667eea' }}>https://entrancetricks.com</a>
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Through the App:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Support section in Ethio Entrance, Freshman Tricks app
              </Typography>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Box
              sx={{
                backgroundColor: '#e0f2fe',
                border: '1px solid #38bdf8',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
              }}
            >
              <CheckCircle sx={{ fontSize: 50, color: '#0284c7', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Agreement Acknowledgment
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                By using Ethio Entrance, Freshman Tricks, you acknowledge that you have read, understood, and agree
                to be bound by these Terms of Service.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Thank you for being part of our educational community!
              </Typography>
            </Box>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Ethio Entrance, Freshman Tricks
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Educational Excellence for Grades 9-12
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                These Terms of Service are effective as of November 2025
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Entrance Tricks. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

