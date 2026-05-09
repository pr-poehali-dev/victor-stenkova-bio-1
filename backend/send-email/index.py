import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка сообщения с формы сайта на почту Виктора."""

    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return {
            "statusCode": 400,
            "headers": cors,
            "body": {"error": "Заполните все поля"},
        }

    smtp_password = os.environ["SMTP_PASSWORD"]
    sender = "victiusi111@gmail.com"
    recipient = "victiusi111@gmail.com"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новое сообщение с сайта от {name}"
    msg["From"] = sender
    msg["To"] = recipient

    html = f"""
    <div style="font-family: sans-serif; max-width: 520px; color: #111;">
        <h2 style="margin-bottom: 4px;">Новое сообщение с сайта</h2>
        <hr style="border: none; border-top: 1px solid #eee; margin-bottom: 20px;">
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Сообщение:</strong></p>
        <p style="background:#f9f9f9; padding: 14px; border-radius: 8px;">{message}</p>
    </div>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True}),
    }