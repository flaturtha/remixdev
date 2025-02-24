if (!process.env.KLAVIYO_API_KEY) {
  throw new Error('KLAVIYO_API_KEY is required');
}

if (!process.env.KLAVIYO_LIST_ID) {
  throw new Error('KLAVIYO_LIST_ID is required');
}

export const KLAVIYO_CONFIG = {
  apiKey: process.env.KLAVIYO_API_KEY,
  listId: process.env.KLAVIYO_LIST_ID,
  companyId: 'SJcq4y',
  apiEndpoint: 'https://a.klaviyo.com/api/v2/'
}; 