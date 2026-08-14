/**
 * Web3Forms Email Service
 * Handles email submissions through Web3Forms API
 * Documentation: https://web3forms.com/documentation
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

const WEB3FORMS_API_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Submit contact form to Web3Forms
 * @param formData - Contact form data
 * @param accessKey - Web3Forms access key from environment
 * @param recipientEmail - Email address to receive messages
 * @returns Promise with success status
 */
export async function submitContactForm(
  formData: ContactFormData,
  accessKey: string,
  recipientEmail: string,
): Promise<Web3FormsResponse> {
  if (!accessKey) {
    throw new Error('Web3Forms access key is not configured');
  }

  const payload = {
    access_key: accessKey,
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    from_name: 'Portfolio Contact Form',
    to_email: recipientEmail,
    redirect: false,
  };

  try {
    const response = await fetch(WEB3FORMS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as Web3FormsResponse;

    if (!data.success) {
      throw new Error(data.message || 'Form submission failed');
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new Error(`Failed to submit contact form: ${errorMessage}`);
  }
}
