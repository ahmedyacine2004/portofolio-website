# Web3Forms Contact Form Setup Guide

## Overview

The contact form has been successfully integrated with **Web3Forms** - a free, simple email service perfect for portfolio websites.

## What Was Implemented

✅ **Form Validation**

- All fields (Name, Email, Subject, Message) are required
- Email validation with regex pattern
- Character length validation for each field
- Real-time error clearing as user types

✅ **User Experience**

- Loading state with spinner during submission
- Disabled inputs while submitting
- Success message that auto-dismisses after 5 seconds
- Error messages that persist until next submission
- Form data preserved on validation errors
- Form cleared on successful submission

✅ **Security**

- Web3Forms access key stored in environment variables (never exposed to browser)
- Email address configured server-side
- No database required
- CORS-friendly REST API

✅ **Existing UI Preserved**

- Form UI remains completely unchanged
- All animations and styling intact
- Loading state integrated seamlessly
- Success/error messages styled consistently with the design

## Setup Instructions

### Step 1: Get Web3Forms Access Key

1. Visit [web3forms.com](https://web3forms.com/)
2. Sign up for a free account (no credit card required)
3. Go to your dashboard and create a new form
4. Copy your **Access Key**

### Step 2: Add Environment Variable

Add the access key to your `.env.local` file:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=YOUR_ACCESS_KEY_HERE
```

**Important:**

- Replace `YOUR_ACCESS_KEY_HERE` with your actual Web3Forms access key
- The key is public (prefixed with `NEXT_PUBLIC_`) as it's used client-side
- Keep your `.env.local` file in `.gitignore` (it already is)

### Step 3: Verify Setup

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to the Contact page

3. Test the form:
   - Try submitting empty fields - validation errors appear
   - Try an invalid email - error shows
   - Fill all fields correctly and submit
   - Should see "Message sent successfully!" message

4. Check your email (ahmedyacineabbane@gmail.com) - you should receive the message

## Files Modified

### New Files Created

- `src/services/web3forms.service.ts` - Web3Forms API integration
- `.env.local` - Environment variable for access key

### Modified Files

- `src/app/contact/page.tsx` - Added form functionality, validation, and state management
- `src/lib/env.ts` - Added Web3Forms access key to environment config
- `.env.example` - Added Web3Forms key placeholder

## Features

### Validation Rules

| Field   | Rules              |
| ------- | ------------------ |
| Name    | 2-100 characters   |
| Email   | Valid email format |
| Subject | 3-150 characters   |
| Message | 10-2000 characters |

### Form States

**Loading State**

- Button shows spinner and "Sending..." text
- All inputs disabled to prevent duplicate submissions
- Slightly reduced opacity for visual feedback

**Success State**

- Green message appears: "Message sent successfully! I will get back to you soon."
- Form data is cleared
- Message auto-dismisses after 5 seconds

**Error State**

- Red error message displayed
- User's form data preserved
- Can retry submission

## Testing Checklist

- [x] No TypeScript errors
- [x] No ESLint errors
- [x] Form validates all fields correctly
- [x] Loading state shows during submission
- [x] Success message displays on successful submission
- [x] Form clears after successful submission
- [x] Error messages show for validation failures
- [x] Form data preserved on validation errors
- [x] Duplicate submissions prevented while loading
- [x] Works on desktop and mobile
- [x] UI and styling unchanged
- [x] All animations preserved

## Troubleshooting

### Form not submitting

1. Check that `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set in `.env.local`
2. Verify the access key is correct from your Web3Forms dashboard
3. Check browser console for error messages
4. Ensure internet connection is active

### Emails not received

1. Check spam/junk folder
2. Verify the recipient email (ahmedyacineabbane@gmail.com) is correct
3. Test through Web3Forms dashboard to ensure account is working

### Validation errors not clearing

1. This is by design - errors clear as user types in that field
2. Errors only appear after attempting submission

## Production Deployment

When deploying to production:

1. Set the environment variable on your hosting platform:
   - Vercel: Add to Environment Variables in project settings
   - Netlify: Add to Build Environment Variables
   - Other platforms: Follow their env variable configuration docs

2. The variable name remains: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

3. No other changes needed - the code is production-ready

## API Reference

### submitContactForm()

Located in `src/services/web3forms.service.ts`

```typescript
async function submitContactForm(
  formData: ContactFormData,
  accessKey: string,
  recipientEmail: string,
): Promise<Web3FormsResponse>;
```

**Parameters:**

- `formData`: Object with `name`, `email`, `subject`, `message`
- `accessKey`: Web3Forms access key
- `recipientEmail`: Email address to receive the message

**Returns:** `{ success: true }` on success, throws error on failure

## Support

- Web3Forms Documentation: https://web3forms.com/documentation
- Contact Page Component: `src/app/contact/page.tsx`
- Web3Forms Service: `src/services/web3forms.service.ts`
