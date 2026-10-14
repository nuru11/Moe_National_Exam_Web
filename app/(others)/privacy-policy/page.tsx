'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
} from '@mui/material';
import { Security, Lock } from '@mui/icons-material';
import Header from '@/components/Header';

export default function PrivacyPolicy() {
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
                <Security sx={{ fontSize: 50 }} />
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
              Privacy Policy
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.95,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Your privacy is important to us. Learn how we protect and handle your data.
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
              Welcome to Ethio Entrance, Freshman Tricks. We respect your privacy and are committed to protecting your personal data.
              This privacy policy explains how we collect, use, and safeguard your information when you use our mobile application.
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              By using Ethio Entrance, Freshman Tricks, you agree to the collection and use of information in accordance with this policy.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              1. Information We Collect
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Personal Information
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Name:</strong> Used for account identification and personalization</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Phone Number:</strong> Used for authentication and account recovery</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Grade/Academic Level:</strong> Used to provide relevant educational content</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Device Information
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Device ID:</strong> Unique identifier for your device</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Device Brand, Model, and Manufacturer:</strong> For compatibility and troubleshooting</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Operating System:</strong> To ensure app compatibility</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Profile Data
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Profile Pictures:</strong> Optional, only if you choose to upload</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Usage Data
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Study Plans:</strong> Your created study schedules</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Exam Progress:</strong> Your test results and performance tracking</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Downloaded Content:</strong> Records of materials you&apos;ve downloaded for offline access</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Payment Information
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Payment Receipts:</strong> If you purchase a subscription</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Transaction Records:</strong> For billing and account verification purposes</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              We use the collected information to:
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Provide Services:</strong> Deliver Ethio Entrance, Freshman Tricks educational content and features</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Authentication:</strong> Verify your identity and secure your account</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Payment Processing:</strong> Handle subscription payments and verify transactions</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Notifications:</strong> Send study plan reminders and important updates</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Personalization:</strong> Customize your learning experience based on your grade</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Offline Access:</strong> Store downloaded study materials locally on your device</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Improvements:</strong> Analyze usage patterns to improve our app and develop new features</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Security:</strong> Detect and prevent fraud and unauthorized access</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              3. Information Sharing and Data Storage
            </Typography>

            <Box
              sx={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: 2,
                p: 3,
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#166534' }}>
                Your Privacy is Our Priority
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#166534' }}>
                We DO NOT:
              </Typography>
              <Box component="ul" sx={{ mb: 2, pl: 3 }}>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Sell your personal information to third parties</Typography></li>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Share your data with advertisers</Typography></li>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Use third-party analytics or tracking services without disclosure</Typography></li>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, lineHeight: 1.8 }}>
              We DO:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Use device information solely for account security and multi-device management</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Transmit data securely to our servers using HTTPS encryption</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Store study materials (PDFs, videos) locally on your device in app-specific directories</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Comply with legal requirements to disclose information when required by law</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Data Location
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Your personal data is stored on our secure servers</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Downloaded study materials are stored locally on your device</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We use industry-standard security measures to protect your data</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              4. Data Security
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Security Measures We Implement
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>HTTPS Encryption:</strong> All data transmission is encrypted</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Password Security:</strong> Passwords are hashed using industry-standard algorithms</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Device Verification:</strong> Multi-device authentication to prevent unauthorized access</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Regular Updates:</strong> Continuous security monitoring and updates</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Access Controls:</strong> Limited employee access to personal data</Typography></li>
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
                Important Note
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                No method of transmission over the internet is 100% secure. While we strive to use commercially acceptable means to
                protect your personal data, we cannot guarantee absolute security. We recommend:
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Using a strong, unique password</Typography></li>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Keeping your device secure</Typography></li>
                <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Logging out from shared devices</Typography></li>
              </Box>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              5. Your Rights and Data Control
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              You have full control over your data:
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Access
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8 }}>View your personal information at any time through your profile</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Update
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Edit your profile, phone number, and grade level</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Change or remove your profile picture</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Delete
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Permanently delete your account and all associated data</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>To delete: Go to <strong>Settings &gt;&gt; Profile &gt;&gt; Delete Account</strong></Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Upon deletion, all your personal data will be removed from our servers within 30 days</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Download
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Access all downloaded study materials offline</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Export your study plan data</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Opt-Out
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Disable notifications in app settings</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Revoke permissions in your device settings</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              6. Local Data Storage
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              App-Specific Storage
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Downloaded Materials:</strong> PDFs and videos are stored locally in app-specific directories</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Study Plans:</strong> Cached locally for offline access</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Authentication:</strong> Login tokens stored securely using encrypted local storage</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>No Cookies:</strong> We don&apos;t use browser cookies or third-party tracking technologies</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Data Clearing:</strong> Uninstalling the app or clearing app data will remove all local content</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              7. Children&apos;s Privacy
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Age Requirements
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Ethio Entrance, Freshman Tricks is designed for students in <strong>Grades 9-12</strong></Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Our services are intended for students <strong>aged 13 and above</strong></Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>We do <strong>not knowingly collect</strong> information from children under 13</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Parents/guardians should supervise usage for younger students</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>If we discover we&apos;ve collected data from a child under 13, we will delete it immediately</Typography></li>
            </Box>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8, fontStyle: 'italic' }}>
              If you believe we have inadvertently collected information from a child under 13, please contact us immediately.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              8. Notifications and Permissions
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              App Permissions Explained
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Our app requests the following permissions:
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Notifications
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Purpose:</strong> Send study plan reminders and important updates</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Control:</strong> Can be disabled in device settings</Typography></li>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Alarms & Reminders (SCHEDULE_EXACT_ALARM)
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Purpose:</strong> Send precise scheduled notifications for your study plans</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Why Needed:</strong> Ensures you receive reminders at exactly the right time</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Android 14+:</strong> This permission must be explicitly granted</Typography></li>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Camera/Photos
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Purpose:</strong> Upload a profile picture (optional)</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>When Requested:</strong> Only when you choose to take or select a photo</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Control:</strong> Can be revoked in device settings</Typography></li>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Storage
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Purpose:</strong> Download and store study materials for offline access</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Scope:</strong> Limited to app-specific directories (scoped storage)</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>No External Access:</strong> We don&apos;t access your personal files or other apps&apos; data</Typography></li>
            </Box>

            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8, fontWeight: 600 }}>
              All permissions are requested only when needed and can be revoked at any time through your device settings.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              9. Third-Party Services
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Services We Use
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Ethio Entrance, Freshman Tricks uses the following third-party services:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Hosting Provider:</strong> For secure cloud storage of educational content</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Payment Gateway:</strong> For processing subscription payments (if applicable)</Typography></li>
            </Box>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              We ensure all third-party services comply with data protection regulations and maintain appropriate security standards.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              No Advertising
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              We do <strong>not</strong> use any third-party advertising networks or analytics services that track your behavior.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              10. International Data Transfers
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
              Your data may be transferred to and processed in countries other than your country of residence. We ensure that
              appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              11. Data Retention
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Active Accounts:</strong> We retain your data as long as your account is active</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Account Deletion:</strong> Data is deleted within 30 days of account deletion request</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}><strong>Backup Data:</strong> Backup copies are permanently deleted within 90 days</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              12. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              We may update our Privacy Policy from time to time to reflect changes in:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Our practices</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Legal requirements</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>App features</Typography></li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              How We Notify You
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Updates will be posted in the app</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Privacy policy will be updated on our website</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Significant changes will be notified via in-app notification</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Last updated date will be changed at the top of this policy</Typography></li>
            </Box>
            <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8, fontWeight: 600 }}>
              Continued use of Ethio Entrance after changes constitutes acceptance of the updated policy.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              13. Contact Us
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
              Questions or Concerns?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Through the App:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                Support section in Ethio Entrance, Freshman Tricks app
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Website:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                <a href="https://entrancetricks.com" style={{ color: '#667eea' }}>https://entrancetricks.com</a>
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Email:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                <a href="mailto:support@entrancetricks.com" style={{ color: '#667eea' }}>support@entrancetricks.com</a>
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Response Time:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                We typically respond within 48 hours
              </Typography>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              14. Legal Compliance
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Ethio Entrance, Freshman Tricks complies with:
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Google Play Store Data Safety Requirements</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>General Data Protection Regulation (GDPR) principles</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Children&apos;s Online Privacy Protection Act (COPPA)</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Applicable local data protection laws</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              15. Your Consent
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              By using Ethio Entrance, Freshman Tricks, you consent to:
            </Typography>
            <Box component="ul" sx={{ mb: 3, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>This Privacy Policy</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Collection and use of information as described</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Storage of data as outlined above</Typography></li>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              You can withdraw consent by:
            </Typography>
            <Box component="ul" sx={{ mb: 5, pl: 3 }}>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Deleting your account</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Uninstalling the app</Typography></li>
              <li><Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>Contacting us to request data deletion</Typography></li>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Box
              sx={{
                backgroundColor: '#f3e8ff',
                border: '1px solid #a78bfa',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
              }}
            >
              <Lock sx={{ fontSize: 50, color: '#8b5cf6', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Summary
              </Typography>
              <Box sx={{ textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
                <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>What We Collect:</strong> Name, phone, grade, device info, study progress
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>Why We Collect:</strong> To provide educational services and personalized learning
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  <strong>How We Protect:</strong> HTTPS encryption, secure storage, no data selling
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  <strong>Your Rights:</strong> Access, update, delete your data at any time
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, fontStyle: 'italic' }}>
                Thank you for trusting Ethio Entrance, Freshman Tricks with your educational journey!
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Ethio Entrance, Freshman Tricks
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Educational Excellence for Grades 9-12
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                This privacy policy is effective as of November 2025
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

