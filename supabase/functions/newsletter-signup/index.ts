import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface NewsletterRequest {
  email: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { email }: NewsletterRequest = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const confirmationToken = crypto.randomUUID();

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        confirmation_token: confirmationToken,
        confirmed: true,
        confirmed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'This email is already subscribed' }),
          {
            status: 409,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter!' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function sendWelcomeEmail(email: string) {
  const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');

  if (!sendgridApiKey) {
    console.error('SENDGRID_API_KEY is not configured');
    throw new Error('Email service not configured');
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #E5E7EB;
            background-color: #0A0F1A;
            padding: 0;
            margin: 0;
          }
          .email-wrapper {
            background-color: #0A0F1A;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(180deg, #16212C 0%, #0F1922 100%);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          }
          .header {
            text-align: center;
            padding: 48px 40px 32px;
            background: rgba(22, 33, 44, 0.6);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .logo {
            font-size: 48px;
            font-weight: 700;
            color: #FFFFFF;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            text-transform: uppercase;
            margin-bottom: 8px;
          }
          .tagline {
            font-size: 14px;
            color: #9CA3AF;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 300;
          }
          .content {
            padding: 48px 40px;
          }
          .welcome-title {
            font-size: 28px;
            font-weight: 600;
            color: #FFFFFF;
            margin-bottom: 24px;
            text-align: center;
          }
          .welcome-text {
            font-size: 16px;
            color: #D1D5DB;
            margin-bottom: 32px;
            text-align: center;
            line-height: 1.8;
          }
          .features-list {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            padding: 32px;
            margin: 32px 0;
          }
          .features-list ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .features-list li {
            padding: 12px 0;
            color: #E5E7EB;
            font-size: 15px;
            position: relative;
            padding-left: 28px;
          }
          .features-list li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #60A5FA;
            font-weight: bold;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            color: #FFFFFF;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 15px;
            margin: 24px auto;
            display: block;
            width: fit-content;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .footer {
            text-align: center;
            padding: 40px;
            background: rgba(10, 15, 26, 0.6);
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
          .social-links {
            margin: 24px 0;
            padding: 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 12px;
            color: #9CA3AF;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s;
          }
          .social-links a:hover {
            color: #FFFFFF;
          }
          .footer-text {
            color: #6B7280;
            font-size: 13px;
            line-height: 1.8;
            margin: 8px 0;
          }
          .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.08);
            margin: 32px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <div class="logo">STNGR</div>
              <div class="tagline">Personal Protection Reimagined</div>
            </div>
            <div class="content">
              <h1 class="welcome-title">Welcome to STNGR</h1>
              <p class="welcome-text">
                Thank you for joining our community. You're now part of an exclusive group that will be first to receive updates about the future of personal safety.
              </p>

              <div class="features-list">
                <ul>
                  <li>Early access to product launch</li>
                  <li>Exclusive behind-the-scenes updates</li>
                  <li>Special pre-order opportunities</li>
                  <li>Technical insights and development progress</li>
                </ul>
              </div>

              <p class="welcome-text">
                Stay tuned for exciting announcements coming your way.
              </p>
            </div>

            <div class="footer">
              <div class="social-links">
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
              </div>

              <div class="divider"></div>

              <p class="footer-text">
                You're receiving this email because you subscribed to STNGR updates.
              </p>
              <p class="footer-text">
                &copy; 2025 STNGR. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const emailData = {
    personalizations: [
      {
        to: [{ email }],
        subject: 'Welcome to STNGR - Thanks for Subscribing!',
      },
    ],
    from: {
      email: 'hello@mahmad.pro',
      name: 'STNGR',
    },
    content: [
      {
        type: 'text/html',
        value: emailHtml,
      },
    ],
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sendgridApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('SendGrid API error:', response.status, errorText);
    throw new Error(`Failed to send email: ${response.status}`);
  }

  console.log(`Welcome email sent successfully to: ${email}`);
  return true;
}
