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
      amount,
      buyerEmail,
    } = body;

    const inviteLink =
      `${process.env.NEXT_PUBLIC_URL}/transaction/${transactionId}`;

    const { error } =
      await resend.emails.send({

        from:
          "3rdParty Escrow <onboarding@resend.dev>",

        to: email,

        subject:
          "Secure Escrow Transaction Invitation",

        html: `

          <div style="
            background:#020617;
            padding:50px;
            font-family:Arial;
            color:white;
          ">

            <div style="
              max-width:700px;
              margin:auto;
              background:#0f172a;
              border-radius:30px;
              padding:50px;
            ">

              <h1 style="
                font-size:42px;
                margin-bottom:20px;
              ">
                3rdParty Escrow
              </h1>

              <p style="
                color:#94a3b8;
                font-size:18px;
                line-height:1.8;
              ">
                You have been invited into a secure escrow transaction.
              </p>

              <div style="
                margin-top:35px;
                background:#111827;
                padding:30px;
                border-radius:20px;
              ">

                <p>
                  <strong>Transaction:</strong>
                  ${transactionName}
                </p>

                <p>
                  <strong>Amount:</strong>
                  $${amount}
                </p>

                <p>
                  <strong>Buyer:</strong>
                  ${buyerEmail}
                </p>

              </div>

              <div style="
                margin-top:40px;
              ">

                <a
                  href="${inviteLink}"
                  style="
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    padding:18px 35px;
                    border-radius:16px;
                    font-weight:bold;
                    display:inline-block;
                  "
                >
                  Open Transaction
                </a>

              </div>

              <p style="
                margin-top:40px;
                color:#64748b;
                line-height:1.8;
              ">
                Funds remain protected until both parties
                complete the transaction.
              </p>

            </div>

          </div>

        `,
      });

    if (error) {

      console.log(error);

      return Response.json({
        success: false,
        error,
      });
    }

    return Response.json({
      success: true,
    });

  } catch (err) {

    console.log(err);

    return Response.json({
      success: false,
      error: err,
    });
  }
}