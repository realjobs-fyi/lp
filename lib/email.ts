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
<u>Here's the deal:</u>
<br />
<br />
I'm opening a small Beta Tester Squad to help shape Real Jobs before launch. You'll get early access, test new features first, and directly influence the roadmap.
<br />
<br />
The extension itself will be 100% free to test, including all filters and job-cleanup features.
<br />
<br />
Only the AI-powered tools (job analysis + tailored resumes) have a small cost: $3.97/month, just enough to cover API usage and development expenses. All costs will be transparent to the beta group.
<br />
<br />
If you want in, reply <b>YES</b> and I'll send your invite (as soon as I see your reply).
<br />
<br />
Let's build something that actually fixes the job hunt.
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
