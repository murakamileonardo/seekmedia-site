import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { nome, email, telefone, modo, params, conclusao } = body;

    if (!nome || !email) {
      return NextResponse.json({ error: "Nome e email são obrigatórios" }, { status: 400 });
    }

    // Format params for email
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paramsText = Object.entries(params as Record<string, any>)
      .map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          const obj = value as Record<string, boolean>;
          const active = Object.entries(obj)
            .filter(([, v]) => v)
            .map(([k]) => k);
          return `${key}: ${active.join(", ") || "nenhum"}`;
        }
        return `${key}: ${value}`;
      })
      .join("\n");

    const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    const emailHtml = `
      <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #101818; color: #F8F8F8; padding: 32px; border-radius: 16px;">
        <h1 style="color: #00F0D0; font-size: 20px; margin-bottom: 24px;">Novo Lead do Simulador</h1>

        <div style="background: #1A2228; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
          <h2 style="color: #00F0D0; font-size: 14px; margin: 0 0 12px 0;">Dados do Contato</h2>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Nome:</strong> ${nome}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
          ${telefone ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Telefone:</strong> ${telefone}</p>` : ""}
        </div>

        <div style="background: #1A2228; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
          <h2 style="color: #00F0D0; font-size: 14px; margin: 0 0 12px 0;">Modo: ${modo}</h2>
          <pre style="font-size: 12px; color: #8899A0; white-space: pre-wrap; margin: 0;">${paramsText}</pre>
        </div>

        <div style="background: #1A2228; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
          <h2 style="color: #00F0D0; font-size: 14px; margin: 0 0 12px 0;">Conclusão Exibida</h2>
          <p style="font-size: 13px; color: #8899A0; margin: 0;">${conclusao}</p>
        </div>

        <p style="font-size: 11px; color: #8899A0; margin-top: 20px;">Enviado em ${timestamp}</p>
      </div>
    `;

    await resend.emails.send({
      from: "SeekMedia Simulador <onboarding@resend.dev>",
      to: ["comercial@seekmedia.io"],
      subject: `[Simulador] Novo Lead — ${nome} (${modo})`,
      html: emailHtml,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead email error:", error);
    return NextResponse.json({ error: "Erro ao enviar email" }, { status: 500 });
  }
}
