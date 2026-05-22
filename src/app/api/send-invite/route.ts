import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      email,
      transactionId,
      transactionName,
    } = body;

    const inviteLink =
      `${process.env.NEXT_PUBLIC_URL}/register?transaction=${transactionId}`;

    await resend.emails.send({

      from:
        "onboarding@resend.dev",

      to: email,

      subject:
        "Escrow Transaction Invitation",

      html: `

        <div style="
          font-family: Arial;
          padding: 30px;
        ">

          <h1>
            Escrow Invitation
          </h1>

          <p>

            You were invited to join:

            <strong>
              ${transactionName}
            </strong>

          </p>

          <p>

            Click below to create account
            or login.

          </p>

          <a
            href="${inviteLink}"
            style="
              display:inline-block;
              margin-top:20px;
              background:#2563eb;
              color:white;
              padding:14px 24px;
              border-radius:10px;
              text-decoration:none;
              font-weight:bold;
            "
          >
            Open Transaction
          </a>

        </div>

      `,
    });

    return Response.json({
      success: true,
    });

  } catch (err) {

    console.log(err);

    return Response.json({
      success: false,
    });

  }
}