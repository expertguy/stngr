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
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 40px 0; }
          .logo { font-size: 32px; font-weight: bold; color: #000; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #000; color: #fff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">STNGR</div>
          </div>
          <div class="content">
            <h1>Welcome to STNGR!</h1>
            <p>Thank you for subscribing to our newsletter. You're now part of an exclusive community that will be first to know about:</p>
            <ul>
              <li>Product launch updates</li>
              <li>Early access opportunities</li>
              <li>Special features and improvements</li>
              <li>Behind-the-scenes content</li>
            </ul>
            <p>Stay tuned for exciting updates coming your way!</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for STNGR updates.</p>
            <p>&copy; 2025 STNGR. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  console.log(`Welcome email would be sent to: ${email}`);
  console.log('Email content prepared successfully');
  
  return true;
}
