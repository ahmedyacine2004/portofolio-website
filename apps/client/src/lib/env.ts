export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  web3FormsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!,
  adminUsername: process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? '',
  adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '',
};
