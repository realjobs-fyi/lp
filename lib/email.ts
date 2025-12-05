import { Resend } from "resend";

export const sendConfirmationEmail = async (email: string) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Marcelo <hello@realjobs.fyi>`,
      to: [email],
      subject: "Early Access Waiting (Need Your Yes)",
      html: `Hey,
      <br />
      <br />
You're officially on the Real Jobs waitlist (and you're early).
<br />
<br />
I'm opening a small Beta Tester Squad. You can join to test all the free features (filters, job-cleanup, etc.) — no payment required.
<br />
<br />
The AI resume generator is optional and costs $3.97/month to cover API usage.
<br />
<br />
If you want in, reply <b>YES</b> and I'll send your invite.
<br />
<br />
— Marcelo`,
    });

    if (error) {
      console.error("ERROR: " + error.message);
    }
  } catch (err) {
    console.error("ERROR: " + err);
  }
};
