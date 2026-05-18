import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  req: Request
) {
  try {

    const body = await req.json();

    const {
      sellerEmail,
      transactionName,
      amount,
      transactionCode,
    } = body;

    const data =
      await resend.emails.send({

        from:
          "Escrow Platform <onboarding@resend.dev>",

        to: sellerEmail,

        subject:
          "New Escrow Transaction Invitation",

        html: `
          <div style="font-family: Arial; padding: 30px; background: #0f172a; color: white;">

            <h1 style="font-size: 32px;">
              New Escrow Transaction
            </h1>

            <p style="font-size: 18px;">
              You have received a new escrow transaction invitation.
            </p>

            <div style="margin-top: 30px; padding: 25px; background: #111827; border-radius: 16px;">

              <p>
                <strong>Item:</strong>
                ${transactionName}
              </p>

              <p>
                <strong>Amount:</strong>
                $${amount}
              </p>

              <p>
                <strong>Escrow Code:</strong>
                ${transactionCode}
              </p>

            </div>

            <a
              href="http://localhost:3000/login"
              style="
                display:inline-block;
                margin-top:30px;
                background:#2563eb;
                color:white;
                padding:14px 24px;
                border-radius:12px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              Login To Escrow
            </a>

          </div>
        `,
      });

    return Response.json(data);

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Email send failed",
      },
      {
        status: 500,
      }
    );
  }
}