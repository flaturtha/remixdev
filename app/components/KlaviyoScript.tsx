export default function KlaviyoScript() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.klaviyo = window.klaviyo || [];
          `
        }}
      />
      <script 
        async 
        type="text/javascript" 
        src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=KChqVc"
      />
    </>
  );
} 